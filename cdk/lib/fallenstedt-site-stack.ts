const path = require("path");
import * as acm from "@aws-cdk/aws-certificatemanager";
import * as cloudfront from "@aws-cdk/aws-cloudfront";
import * as cloudwatch from "@aws-cdk/aws-cloudwatch";
import * as iam from "@aws-cdk/aws-iam";
import * as route53 from "@aws-cdk/aws-route53";
import * as targets from "@aws-cdk/aws-route53-targets";
import * as patterns from "@aws-cdk/aws-route53-patterns";
import * as s3 from "@aws-cdk/aws-s3";
import * as s3deploy from "@aws-cdk/aws-s3-deployment";
import * as lambda from "@aws-cdk/aws-lambda";
import * as cdk from "@aws-cdk/core";
import { Construct, Stack } from "@aws-cdk/core";

// import * as sqs from 'aws-cdk-lib/aws-sqs';

export class FallenstedtSiteStack extends Stack {
	public readonly zone: route53.IHostedZone;
	public readonly certificate: acm.ICertificate;

	constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
		super(scope, id, props);

		const staticsite = new StaticSite(this, "StaticSite", {
			domainName: "fallenstedt.com",
			siteSubDomain: "www",
		});

		this.zone = staticsite.zone;
		this.certificate = staticsite.certificate;
	}
}

export interface StaticSiteProps {
	domainName: string;
	siteSubDomain: string;
}

/**
 * Static site infrastructure, which deploys site content to an S3 bucket.
 *
 * The site redirects from HTTP to HTTPS, using a CloudFront distribution,
 * Route53 alias record, and ACM certificate.
 */
export class StaticSite extends Construct {
	public readonly zone: route53.IHostedZone;
	public readonly certificate: acm.ICertificate;

	constructor(parent: Stack, name: string, props: StaticSiteProps) {
		super(parent, name);

		const zone = route53.HostedZone.fromLookup(this, "Zone", {
			domainName: props.domainName,
		});
		const siteDomain = props.siteSubDomain + "." + props.domainName;
		const cloudfrontOAI = new cloudfront.OriginAccessIdentity(
			this,
			"cloudfront-OAI",
			{
				comment: `OAI for ${name}`,
			}
		);

		const siteWwwBucket = this.createContentBucket(siteDomain, cloudfrontOAI);

		// TLS certificate
		const certificate = new acm.DnsValidatedCertificate(
			this,
			"SiteCertificate",
			{
				domainName: siteDomain,
				// subjectAlternativeNames: [["api", props.domainName].join(".")],
				hostedZone: zone,
				region: "us-east-1", // Cloudfront only checks this region for certificates.
			}
		);

		// Specifies you want viewers to use HTTPS & TLS v1.1 to request your objects
		const viewerCertificate = cloudfront.ViewerCertificate.fromAcmCertificate(
			{
				certificateArn: certificate.certificateArn,
				applyRemovalPolicy: certificate.applyRemovalPolicy,
				env: {
					region: "us-east-1",
					account: cdk.Aws.ACCOUNT_ID,
				},
				node: this.node,
				stack: parent,
				metricDaysToExpiry: () =>
					new cloudwatch.Metric({
						namespace: "TLS Viewer Certificate Validity",
						metricName: "TLS Viewer Certificate Expired",
					}),
			},
			{
				sslMethod: cloudfront.SSLMethod.SNI,
				securityPolicy: cloudfront.SecurityPolicyProtocol.TLS_V1_1_2016,
				aliases: [siteDomain],
			}
		);

		// CloudFront distribution
		const distribution = new cloudfront.CloudFrontWebDistribution(
			this,
			"SiteDistribution",
			{
				viewerCertificate,
				originConfigs: [
					{
						s3OriginSource: {
							s3BucketSource: siteWwwBucket,
							originAccessIdentity: cloudfrontOAI,
						},
						behaviors: [
							{
								isDefaultBehavior: true,
								compress: true,
								lambdaFunctionAssociations: [
									{
										eventType: cloudfront.LambdaEdgeEventType.ORIGIN_REQUEST,
										lambdaFunction: new lambda.Version(this, "LambdaVersion", {
											lambda: new lambda.Function(this, "Lambda", {
												code: lambda.Code.fromInline(`function handler(event) {
													var request = event.request;
													var uri = request.uri;
													
													// Check whether the URI is missing a file name.
													if (uri.endsWith('/')) {
														request.uri += 'index.html';
													} 
													// Check whether the URI is missing a file extension.
													else if (!uri.includes('.')) {
														request.uri += '/index.html';
													}
												
													return request;
												}`),
												handler: "index.handler",
												runtime: lambda.Runtime.NODEJS_14_X,
											}),
										}),
									},
								],
								allowedMethods:
									cloudfront.CloudFrontAllowedMethods.GET_HEAD_OPTIONS,
							},
						],
					},
				],
			}
		);

		// Route53 alias record www.fallenstedt.com for the CloudFront distribution
		new route53.ARecord(this, "SiteAliasRecord", {
			recordName: siteDomain,
			target: route53.RecordTarget.fromAlias(
				new targets.CloudFrontTarget(distribution)
			),
			zone,
		});

		// Redirect domainName to siteDomain
		new patterns.HttpsRedirect(this, "Redirect", {
			zone: zone,
			recordNames: [props.domainName],
			targetDomain: siteDomain,
		});

		this.deployContentToBucket(siteWwwBucket, distribution);

		new cdk.CfnOutput(this, "Site", { value: "https://" + siteDomain });
		new cdk.CfnOutput(this, "Certificate", {
			value: certificate.certificateArn,
		});

		new cdk.CfnOutput(this, "DistributionId", {
			value: distribution.distributionId,
		});

		new cdk.CfnOutput(this, "WWWRootBucket", {
			value: siteWwwBucket.bucketName,
		});

		this.zone = zone;
		this.certificate = certificate;
	}

	private createContentBucket(
		siteDomain: string,
		cloudfrontOAI: cloudfront.OriginAccessIdentity
	) {
		// Content bucket
		const siteWwwBucket = new s3.Bucket(this, "SiteBucket", {
			bucketName: siteDomain,
			websiteIndexDocument: "index.html",
			websiteErrorDocument: "error.html",
			publicReadAccess: false,
			blockPublicAccess: s3.BlockPublicAccess.BLOCK_ALL,

			/**
			 * The default removal policy is RETAIN, which means that cdk destroy will not attempt to delete
			 * the new bucket, and it will remain in your account until manually deleted. By setting the policy to
			 * DESTROY, cdk destroy will attempt to delete the bucket, but will error if the bucket is not empty.
			 */
			removalPolicy: cdk.RemovalPolicy.DESTROY, // NOT recommended for production code

			/**
			 * For sample purposes only, if you create an S3 bucket then populate it, stack destruction fails.  This
			 * setting will enable full cleanup of the demo.
			 */
			autoDeleteObjects: true, // NOT recommended for production code
		});

		// Grant access to cloudfront
		siteWwwBucket.addToResourcePolicy(
			new iam.PolicyStatement({
				actions: ["s3:GetObject"],
				resources: [siteWwwBucket.arnForObjects("*")],
				principals: [
					new iam.CanonicalUserPrincipal(
						cloudfrontOAI.cloudFrontOriginAccessIdentityS3CanonicalUserId
					),
				],
			})
		);
		return siteWwwBucket;
	}

	private deployContentToBucket(
		destinationBucket: s3.Bucket,
		distribution: cloudfront.CloudFrontWebDistribution
	) {
		// Deploy site contents to S3 bucket
		new s3deploy.BucketDeployment(this, "DeployWithInvalidation", {
			sources: [s3deploy.Source.asset(path.resolve("..", "public"))],
			destinationBucket: destinationBucket,
			distribution,
			distributionPaths: ["/*"],
		});
	}
}
