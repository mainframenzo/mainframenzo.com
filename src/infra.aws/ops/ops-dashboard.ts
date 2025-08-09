// This file is responsible for defining our ops dashboard.
import * as Constructs from 'constructs';
import * as CloudWatch from 'aws-cdk-lib/aws-cloudwatch';
import * as Lambda from 'aws-cdk-lib/aws-lambda';
import * as CloudFront from 'aws-cdk-lib/aws-cloudfront';
import * as constants from '../constants';
import { TAppPublishStage } from '../../../build-utils/scripts/iface';

export default class MEBLOGOpsDashboard extends Constructs.Construct {
  readonly dashboard: CloudWatch.Dashboard;

  constructor(scope: Constructs.Construct, id: string, props: Props) {
    super(scope, id);

    this.dashboard = new CloudWatch.Dashboard(this, 'ops-dashboard', {
      dashboardName: props.stage.getResourceName({ resourceName: 'ops-dashboard', publishStage: props.publishStage })
    });

    /* FIXME Can't get this metrics from the interface. Stoopid.
    this.dashboard.addWidgets(
      new CloudWatch.GraphWidget({
        title: `CloudFront/Requests`,
        liveData: true,
        right: [props.cloudfrontDistribution.metricRequests()]
      }),
      new CloudWatch.GraphWidget({
        title: `CloudFront/403s`,
        liveData: true,
        right: [props.cloudfrontDistribution.metric403ErrorRate()]
      }),
      new CloudWatch.GraphWidget({
        title: `CloudFront/404s`,
        liveData: true,
        right: [props.cloudfrontDistribution.metric404ErrorRate()]
      }),
      new CloudWatch.GraphWidget({
        title: `CloudFront/5xxs`,
        liveData: true,
        right: [props.cloudfrontDistribution.metric5xxErrorRate()]
      })
    );

    this.dashboard.addWidgets(
      new CloudWatch.GraphWidget({
        title: `CloudFront/CacheHitRate`,
        liveData: true,
        right: [props.cloudfrontDistribution.metricCacheHitRate()]
      }),
      new CloudWatch.GraphWidget({
        title: `CloudFront/Downloaded`,
        liveData: true,
        right: [props.cloudfrontDistribution.metricBytesDownloaded()]
      }),
      new CloudWatch.GraphWidget({
        title: `CloudFront/Latency`,
        liveData: true,
        right: [props.cloudfrontDistribution.metricOriginLatency()]
      })
    );
    */

    for (const [functionName, fn] of props.functions) {
      if (!fn) { console.warn(`${functionName} function export is undefined`); }

      this.toLambdaMetrics(functionName, fn);
    }
  }

  private toLambdaMetrics(functionName: string, fn?: Lambda.IFunction) {
    console.debug('toLambdaMetrics', functionName);

    if (!fn) { return; }

    this.dashboard.addWidgets(
      new CloudWatch.GraphWidget({
        title: `Lambda/${fn.functionName}/Errors`,
        liveData: true,
        right: [fn.metricErrors()]
      }),
      new CloudWatch.GraphWidget({
        title: `Lambda/${fn.functionName}/Throttles`,
        liveData: true,
        right: [fn.metricThrottles()]
      }),
      new CloudWatch.GraphWidget({
        title: `Lambda/${fn.functionName}/Invocations`,
        liveData: true,
        right: [fn.metricInvocations()]
      }),
      new CloudWatch.GraphWidget({
        title: `Lambda/${fn.functionName}/Duration`,
        liveData: true,
        right: [fn.metricDuration()]
      })
    );

    this.dashboard.addWidgets(new CloudWatch.Spacer({}));
  }
}

interface Props extends constants.CommonProps {
  readonly publishStage: TAppPublishStage;
  readonly cloudfrontDistribution: CloudFront.IDistribution;
  readonly functions: Map<string, (Lambda.IFunction | undefined)>;
}