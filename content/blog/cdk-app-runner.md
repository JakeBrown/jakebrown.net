---
title: "CDK Patterns - App Runner"
date: "2021-07-03"
tags: ["AWS"]
status: "published"
---

AWS App runner is fairly new and currently has no high level CDK support.
But it does have CloudFormation support, which means we can still use L1 Constructs in CDK. 
Let's look at how to do that.

---

First, the imports:

```typescript
import * as apprunner from "@aws-cdk/aws-apprunner";
import { DockerImageAsset } from "@aws-cdk/aws-ecr-assets";
```

AppRunner has two deployment methods - **source code** or **container image**.
We are deploying a container image because this gives us full control over the build and deploy process.

```typescript
const asset = new DockerImageAsset(this, "app", {
  directory: path.join(__dirname, "../app"),
});
```

Next we need to set up two IAM roles.
The first role is used by AppRunner in order to fetch the Docker Image.
I imagine this will be abstracted away when a L2 construct for App Runner is released.


```typescript
const appRunnerEcrRole = new iam.Role(this, "appRunnerEcrRole", {
  assumedBy: new iam.ServicePrincipal("build.apprunner.amazonaws.com"),
});
asset.repository.grantPull(appRunnerEcrRole);
```

The second IAM role is used/assumed by the service when it runs.
We need to grant it permission to (for example) access DynamoDB.

```typescript
const appRunnerRole = new iam.Role(this, "appRunnerInstanceRole", {
  assumedBy: new iam.ServicePrincipal("tasks.apprunner.amazonaws.com"),
});

// table.grantFullAccess(appRunnerRole);
```

Now we define the service using the L1 construct.

```typescript
let svc = new apprunner.CfnService(this, "appRunner", {
  instanceConfiguration: {
    instanceRoleArn: appRunnerRole.roleArn,
  },
  sourceConfiguration: {
    authenticationConfiguration: {
      accessRoleArn: appRunnerEcrRole.roleArn,
    },
    imageRepository: {
      imageIdentifier: asset.imageUri,
      imageRepositoryType: "ECR",
      imageConfiguration: {
        port: "3000",
      },
    },
    autoDeploymentsEnabled: false,
  },
});

```

The full AWS documentation for the App Runner L1 construct can be found <a rel="external" href="https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-apprunner-service.html">here</a>.

Our service automatically get assigned a Load Balancer and a public URL secured with SSL/HTTPS.
We want to see what that URL is after deployment:

```typescript
new cdk.CfnOutput(this, "AppRunnerUrl", {
  value: svc.getAtt("ServiceUrl").toString(),
});
```

And that's it! 
App Runner provides an affordable and simple way to deploy a container image to AWS.
It is automatically assigned a domain with SSL, so you get a unique HTTPS URL without any extra work.

This makes it much more suitable for web applications than ECS which would need to be connected to a Load Balancer or API Gateway in order to get a HTTPS URL.

One good use-case to explore will be automatic deploy previews.
Using GitHub Actions, we can deploy our entire CDK stack which now includes the front-end, every time a PR is made.

But App Runner does **not** scale to zero, so we need to figure out how to make these self-destruct to avoid the ongoing costs associated with App Runner.

