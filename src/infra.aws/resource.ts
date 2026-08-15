// This file has been @deprecated - you no longer host the website on AWS, and this functionality was moved to nginx et. al.
// This code remains in case you ever want to deploy to AWS again.
//
// This file is responsible for defining common cloud resource functionality.
import AppStage from './stage';
import * as cdk from 'aws-cdk-lib';

export const getRemovalPolicy = (stage?: AppStage): cdk.RemovalPolicy | undefined => {
  return stage && stage.name === stage.main ? cdk.RemovalPolicy.DESTROY : undefined;
}