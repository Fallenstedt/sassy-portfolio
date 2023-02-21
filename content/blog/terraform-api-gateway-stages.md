---
title: "Managing API Gateway Deployments with Terraform: Achieving Full Stage Isolation"
date: 2023-02-20T12:36:41-08:00
draft: false
author: Alex Fallenstedt
annotations: false
---

## The Problem

API Gateway allows you to assocate deployments with stages, each stage representing a logical reference of your api. For example, my gardentour API project needs a `dev` and a `prod` stage to represent my environments. 

I manage infrastructure with terraform, and I needed to achieve full isolation of my stages. It would be impracticable to manage deploys of many API Gateway stages with a single Terraform environment like so: 

```
terraform/
├─ main.tf
├─ modules/
│  ├─ api-gateway/
│  │  ├─ main.tf
│  │  ├─ variables.tf
│  │  ├─ outputs.tf
│  ├─ api-gateway-stage/
│  │  ├─ main.tf
│  │  ├─ variables.tf
│  │  ├─ outputs.tf
```

Assuming the `main.tf` for terraform used a single `api-gateway` and multiple `api-gateway-stages`, I would be locked to single deployment for all of my stages. My `dev` stage would not be independent of my `prod` stage. 


## The Solution

By creating separate Terraform environments for each stage, you can more easily manage and isolate changes to your API Gateway deployments. You `dev` environment be worked on independently of your `test` environment, or your `prod` environmnet. Terraform environments can be isolated by using a simple file layout.

* I placed terraform configuration files for each environment into its own directory. 

* Each environment had its state managed in its own S3 bucket too

This approach had a major benefit of knowing which environment was being worked on, and limited myself from messing up my entire project with an accidental deploy.


```
terraform/
├─ global/
│  ├─ api-gateway/
│  │  ├─ main.tf
├─ dev/
│  ├─ main.tf
├─ prod/
│  ├─ main.tf
├─ modules/
│  ├─ api-gateway/
│  │  ├─ main.tf
│  │  ├─ variables.tf
│  │  ├─ outputs.tf
│  ├─ api-gateway-stage/
│  │  ├─ main.tf
│  │  ├─ variables.tf
```

There are three environments and one modules directory:

* `global` refers to infrastructure that is available across all environments. These can include my IAM roles, Route53 domains and hosted zones, or a single API Gateway instance. 

* `dev` would reference the single API Gateway instance as a `data` source. This environment would add a `dev` stage to the API Gateway. 

* `prod` would also reference the single API Gateway instance as a `data` source, and add a `prod` stage to it.

* `modules` are reusable pieces of infrastructure that I can use across environments

This directory structure keeps the lifecycle of my API Gateway stages independent while using a single API Gateway instance.
