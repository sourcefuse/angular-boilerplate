import {
  ApiService,
  Count,
  GetAPICommand,
  IAdapter,
} from '@project-lib/core/api';

import {IAnyObject} from '@project-lib/core/i-any-object';

export class GetTotalBillingPlanCommand<T> extends GetAPICommand<Count> {
  constructor(
    apiService: ApiService,
    adapter: IAdapter<Count>,
    appConfig: IAnyObject,
  ) {
    super(
      apiService,
      adapter,
      `${appConfig.baseApiUrl}${appConfig.subscriptionServiceUrl}/subscriptions/count`,
    );
  }
}
