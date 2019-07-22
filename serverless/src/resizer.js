module.exports.handler = async event => {
  //https://docs.aws.amazon.com/lambda/latest/dg/with-s3.html
  //https://dev.to/adnanrahic/a-crash-course-on-serverless-with-aws---image-resize-on-the-fly-with-lambda-and-s3-4foo
  //When a *directory* is added, get all files
  //pipe them into sharp
  //put each image into processed s3 in their respective directory.
  console.log(event.Records[0].s3);
  console.log("I can get files from this bucket", process.env.ORIGINALS_S3);
};
