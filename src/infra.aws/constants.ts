// This file has been @deprecated - you no longer host the website on AWS, and this functionality was moved to nginx et. al.
// This code remains in case you ever want to deploy to AWS again.
//
// This file is responsible for defining infra constants.
import AppStage from './stage';

export interface CommonProps {
  readonly stage: AppStage;
}