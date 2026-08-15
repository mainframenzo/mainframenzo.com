## Legacy Infra 
GoDaddy is your DNS registrar. AWS is your hosting provider. You're viewing this source on Github, which is where the public version of this source is shared. YMMV elsewhere. Hell, your mileage varies with these companies!

You've got a _dev_ publish stage and a _prod_ publish stage: `dev.mainframenzo.com` includes all content, including `draft` posts, but [mainframenzo.com](https://mainframenzo.com) only has finished ones. You use _dev_ to validate the content looks as expected before pushing to _prod_. You restrict access to _dev_ via your public IP (and the security settings can be  updated manually when required).

The infra setup is not fancy: there's just one AWS account for the _publish_ stages _dev_ and _prod_ because this is a silly blog. We'll call your AWS account "main", which is a _deploy_ stage, and when you deploy, you'll run commands that change resources for the respective _publish_ stage in the "main" _deploy_ stage (AWS account); _publish_ stages - _dev_ or _prod_ - are only delineated by AWS CloudFormation stacks (groups of AWS resources) in the same AWS account. 

As for CICD, you set it up so that after an initial deployment of _CICD_ itself, all that is required to push content is to sync this source to an Amazon S3 bucket, and you manually start a CICD build (you prefer this to using the Github connector because you don't have to manage AWS Secrets, which are expensive). You got rid of AWS CodePipeline in favor of a single AWS CodeBuild project because the former just endlessly looped when you gave it permissions for new resources, e.g. self-mutated, and no amount of overriding that seemed to work. You _can_ run CICD locally from your machine, but you favor cloud-based CICD since you can just upload a few files from the offline place you're always in, allowing you to shut your computer off rather than wait for the build to succeed. Set it and forget it. - RP

Your average AWS bill with limited visitors to the _dev_ publish stage was: $10.17 USD. AWS CodeBuild was by far the biggest cost when you were doing serious initial development of this blog and increased the price 6x, but that shouldn't happen too often.

### Legacy Infra / Pre-reqs
1. [Docker](https://www.docker.com/) `27.3.1, build ce12230` (used to build a container for local development, also used in CICD)
1. [AWS CLI V2](https://docs.aws.amazon.com/cli/latest/userguide/getting-started-install.html) `aws-cli/2.4.0 Python/3.8.8 Darwin/22.6.0 exe/x86_64 prompt/off` and an `~/.aws/credentials` file with active credentials

### Legacy Infra / Configure
To configure the "main" AWS account, configure the `<meblog-src>/config/.env` file with your AWS information for the "main" AWS account. Edit this information:

    aws_main_cli_profile=meblog-main
    aws_main_account_id=123456789012
    aws_main_region=us-west-2
    aws_main_deploy_id=v1-sys
    aws_main_cdk_qualifier=meblogcdk1
    aws_main_dev_domain_name=dev.website.com
    aws_main_prod_domain_name=website.com

> The `~/.aws/credentials` file is also required to exist on disk, and the credentials for the AWS CLI profile defined above to be configured in it.

### Legacy Infra / CICD
To deploy CICD resources to your "main" AWS account, from a terminal, run:
```bash
make -f makefile.infra deploy/main
```

Whenever you make changes to the development container image you should re-run this command to make sure CICD has the updated container image. 

If you already built the changes into a local development container, you can just upload them for CICD's use. From a terminal, instead run:
```bash
make -f makefile.infra build_container_image_for_cicd=false deploy/main
```
admin
The `deploy/main` command does a lot! There's additional documentation if you want to dive into the weeds further down, but we're going to skip the details for now. 

Once that's done, CICD will start. Eventually the changes will matriculate to `dev.mainframenzo.com` (and if explictly specified, [mainframenzo.com](https://mainframenzo.com)), but not before some manual intervention on your end:
* You still need to configure some DNS settings in GoDaddy's web portal after the "routing" and "cert" AWS CloudFormation stacks have been created (the latter will _still_ be deploying when you make the configuration change)
* The _prod_ stage won't be deployed to unless explicitly specified

To also deploy to the _prod_ stage, from a terminal, run:
```bash
make -f makefile.infra build_container_image_for_cicd=false publish_stage=prod deploy/main
```

> Note: If you see that CICD fails because the "cert" AWS CloudFormation stack has "an ongoing operation in progress and is not stable (CREATE_IN_PROGRESS)", it's because you failed to complete the DNS configuration step below after the "routing" and "cert" AWS CloudFormation stacks were created. 

### Legacy Infra / DNS
GoDaddy's NS record for [mainframenzo.com](https://mainframenzo.com) needs to be configured to point to AWS after CICD has created the necessary AWS resources ("routing" and "cert" AWS CloudFormation stacks). 

> Note: [GoDaddy fucked everyone by removing API functionality to do this automatically](https://www.reddit.com/r/godaddy/comments/1bl0f5r/am_i_the_only_one_who_cant_use_the_api/), so that is why this is a manual endeavor.

To grab the info you'll need to enter into the GoDaddy web portal, from a terminal, run:
```bash
make -f makefile.infra get-routing-info/main

...
"DelegationSet": {
  "NameServers": [
    "ns-xxx.com",
    "ns-xxxnet",
    "ns-xxxc.o.uk",
    "ns-xxx.org"
  ]
}
```

Manually enter the info into the `Domain > Domain Settings > DNS > Nameservers + Change Nameservers` portion of the GoDaddy web portal (for your domain) until you get some time to migrate away from GoDaddy.

![readme/fuck-godaddy.png](./readme/fuck-godaddy.png)

If CICD failed because the certificate for `dev.mainframenzo.com` could not be validated, restart CICD by running `make -f makefile.infra start/cicd/main` again after the "cert" AWS CloudFormation stack finally completes deploying.

Also, `dev.mainframenzo.com` is restricted to your public IP, which may change. If you find that you can't access `dev.mainframenzo.com` once it's published, from a terminal, run:
```bash
make -f makefile.infra restrict-dev-to-public-ip/main
```

> Note: This currently starts CICD. Ideally you do not want to deploy AWS resources, but you are having trouble updating the AWS WAF configuration without deploying.

### Legacy Infra / Publish
When you want to publish content, that means:
* Sync this source to an Amazon S3 bucket (CICD publishes changes to `dev.mainframenzo.com` and eventually [mainframenzo.com](https://mainframenzo.com))
* Upload some of this source to the public Github repository you're viewing

You do not need to do these both at the same time!

To publish content to AWS + Github at the same time, from a terminal, run:
```bash
make -f makefile.infra publish
```

#### Legacy Infra / Publish / Github
You are working with a private version of this source which contains unpublished posts (drafts) and sensitive information. That information needs to get scrubbed and reset when this source is made public. To do that (and push to the public repository), first make sure your CWD is the directory with the private version of this source. 

To upload some of this source to the public Github repository you're viewing, from a terminal, run:
```bash
make -f makefile.infra push-to-public-repo
```

#### Legacy Infra / Publish / AWS
To sync this source to an Amazon S3 bucket that was created earlier and start the CICD process, from a terminal, run:
```bash
make -f makefile.infra start/cicd/main
```

If you already generated parts libraries images locally, there's no need to do so during CICD. To skip rendering parts libraries in CICD, from a terminal, run:
```bash
make -f makefile.infra generate_images_of_parts_libraries=false start/cicd/main
```

If you're interested, let's get into the weeds now.

## Legacy Infra / Deep Dive
If you followed the above documentation, there's no need to run thee commands below manually - they're documented here for your understanding.

### Legacy Infra / Deep Dive / AWS CDK Bootstrap
AWS resources needed for CICD and the website are defined using the AWS CDK. That means cloud infrastructure is defined in code. This requires a bit of setup, though you mostly just reuse the boilerplate code you wrote once, sans a few changes here and there, for common things like CICD/website deploys. You can find plenty of sample code for the AWS CDK if you forgot it all.

To deploy the AWS resources necessary for the website to work with the AWS CDK, from a terminal, run:
```bash
make -f makefile.infra deploy/cdk/main # AWS CDK bootstrap with custom AWS CloudFormation template in your configured region.
```

> This creates a specific AWS CloudFormation stack for the AWS CDK so you don't run into collisions with other AWS CDK-based deployments in our "main" AWS account, which might use different versions. These resources are required to define infra-as-code using the AWS CDK.

### Legacy Infra / Deep Dive / AWS CloudFormation Synth
You can "synth" any CDK-generated AWS CloudFormation stack to test infra-as-code compilation by passing in `cdk_action=synth` to the make commands, which (sort of) helps test if the infra code will work _before_ you deploy:

To synth the CICD AWS CloudFormation stack before deploying, from a terminal, run:
```bash
make -f makefile.infra cdk_action=synth deploy/cicd/main
```

To synth the AWS CloudFormation stacks that CICD deploys (everything needed to host website), from a terminal, run:
```bash
make -f makefile.infra cdk_action=synth app_location=local stage=main publish_stage=dev aws_cli_profile_arg="--profile meblog-main" deploy/from-cicd
```

> Make sure to change `meblog-main` to your configured AWS CLI profile. 

Let's finally deploy rather than synth. 

### Legacy Infra / Deep Dive / CICD
To deploy the AWS resources necessary to get CICD up and running, from a terminal, run:
```bash
make -f makefile.infra deploy/cicd/main
```

### Legacy Infra / Destroy
It is useful to blow all the AWS infra up from time-to-time, especially if you broke something "upgrading" packages, and extra specially useful when starting out with AWS initially. To remove all the AWS infrastructure for the _main_ stage (start over!), from a terminal, run:
```bash
make -f makefile.infra destroy/main
``` 
