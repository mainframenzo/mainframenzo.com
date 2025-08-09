// This file is responsible for defining common cloud resource functionality.
import AppStage from './stage';
import * as cdk from 'aws-cdk-lib';

export const getRemovalPolicy = (stage?: AppStage): cdk.RemovalPolicy | undefined => {
  return stage && stage.name === stage.main ? cdk.RemovalPolicy.DESTROY : undefined;
}