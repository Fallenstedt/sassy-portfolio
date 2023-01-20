---
title: Terraform Cognito With Lambda Triggers
date: 2022-07-18T12:36:41-08:00
draft: false
author: Alex Fallenstedt
---

## The Problem

I have been building a side project with AWS Cognito and Terraform. I wanted a custom message lambda trigger to be invoked anytime the user signed up for my app, however I kept getting permission errors. This blog shows you the terraform configuration you need to to let cognito invoke lambda triggers with Terrafrom.

## Terraform config

### AWC Cognito

For AWS Cognito, I have a simple user pool that allows users to sign up with their email and a passowrd, and a single user pool client to hold users for my development environment.

```hcl
resource "aws_cognito_user_pool" "garden_tour_user_pool" {
  name = "garden_tour_user_pool"

  username_attributes = ["email"]
  auto_verified_attributes = ["email"]
  password_policy {
    minimum_length = 6
    temporary_password_validity_days = 2
  }

  schema {
    attribute_data_type      = "String"
    developer_only_attribute = false
    mutable                  = true
    name                     = "email"
    required                 = true

    string_attribute_constraints {
      min_length = 1
      max_length = 256
    }
  }

  lambda_config {
    custom_message = module.lambda.lambda_arn
  }
}

resource "aws_cognito_user_pool_client" "garden_tour_client_development" {
  name = "garden_tour_client_development"

  user_pool_id = aws_cognito_user_pool.garden_tour_user_pool.id
  generate_secret = false
  refresh_token_validity = 90
  prevent_user_existence_errors = "ENABLED"
  explicit_auth_flows = [
    "ALLOW_REFRESH_TOKEN_AUTH",
    "ALLOW_USER_PASSWORD_AUTH",
  ]
}


resource "aws_lambda_permission" "allow_cognito_invoke_trigger" {
  statement_id  = "AllowExecutionFromCognito"
  action        = "lambda:InvokeFunction"
  function_name = module.lambda.lambda_function_name
  principal     = "cognito-idp.amazonaws.com"
  source_arn    = aws_cognito_user_pool.garden_tour_user_pool.arn
}

```

The **essential** resource needed is the `aws_lambda_permission`. Without this resource, your user pool's lambda's (found in `lambda_config`) will not be invoked. Instead, AWS Cognito will return a cryptic error message.

I have configured my Cognito user pool resource with a [lambda_config](https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/cognito_user_pool#lambda_config). This configuration object allows you to invoke lambda when a specific cognito event occurs. You can find more information about these [lambda triggers at the AWS docs](https://docs.aws.amazon.com/cognito/latest/developerguide/cognito-user-identity-pools-working-with-aws-lambda-triggers.html).

### Lambda

The lambda trigger can also be managed by Terraform. You need to create a variety of AWS resources to deploy your AWS Lambda though. I recommend follwoing along Terraform's guide [Deploy Serverless Applications with AWS Lambda and API Gateway](https://learn.hashicorp.com/tutorials/terraform/lambda-api-gateway) to fully understand what resources you are creating.

In a nutshell, you are creating the following:

- An S3 bucket with `aws_s3_bucket`
- An archive file with your lambda code with `archive_file`
- An S3 object with `aws_s3_object` which references your `archive_file`
- An AWS lambda function with `aws_lambda_function` which uses the file `aws_s3_object` inside your `aws_s3_bucket`.
- An cloudwatch group with `aws_cloudwatch_log_group` so you can store log messages from your Lambda function for 30 days.
- An `aws_iam_role` which allows Lambda to access resources in your AWS account.
- And finally an `aws_iam_role_policy_attachment` so your Lambda function can write to CloudWatch logs.

```hcl
resource "random_pet" "s3_bucket" {
  prefix = var.s3_bucket_name
  length = 4
}

resource "aws_s3_bucket" "s3_bucket" {
  bucket = random_pet.s3_bucket.id

  force_destroy = true
}


data "archive_file" "lambda" {
  type = "zip"

  source_dir  = var.lambda_source_dir
  output_path = var.lambda_output_dir
}


resource "aws_s3_object" "s3_object" {
  bucket = aws_s3_bucket.s3_bucket.id

  key    = var.s3_object_key
  source = data.archive_file.lambda.output_path

  etag = filemd5(data.archive_file.lambda.output_path)
}

resource "aws_lambda_function" "lambda" {
  function_name = var.lambda_function_name

  s3_bucket = aws_s3_bucket.s3_bucket.id
  s3_key    = aws_s3_object.s3_object.key

  runtime = var.lambda_function_handler_runtime
  handler = var.lambda_function_handler_name

  source_code_hash = data.archive_file.lambda.output_base64sha256

  role = aws_iam_role.lambda.arn

  timeout = var.lambda_function_timeout

  environment {
    variables = {
      COGNITO_USER_POOL_ID = var.lambda_environment_variables.cognito_user_pool_id
      COGNITO_CLIENT_ID = var.lambda_environment_variables.cognito_client_id
      TABLE_NAME = var.lambda_environment_variables.table_name
      DYNAMO_REGION = var.lambda_environment_variables.dynamo_region
    }
  }

}


resource "aws_cloudwatch_log_group" "lambda" {
  name = "/aws/lambda/${aws_lambda_function.lambda.function_name}"

  retention_in_days = 30
}


resource "aws_iam_role" "lambda" {
  name = "serverless_lambda"

  assume_role_policy = jsonencode({
    Version = "2012-10-17"
    Statement = [{
      Action = "sts:AssumeRole"
      Effect = "Allow"
      Sid    = ""
      Principal = {
        Service = "lambda.amazonaws.com"
      }
      }
    ]
  })
}

resource "aws_iam_role_policy_attachment" "lambda_policy" {
  role       = aws_iam_role.lambda.name
  policy_arn = "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole"
}
```

Hope this helps those trying to manage their AWS Cognito lambda triggers with terraform. If you encounter issues, feel free to ping me on [mastodon](https://indieweb.social/@Fallenstedt) with questions.
