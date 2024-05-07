import {ApiService, GetAPICommand, IAdapter} from '@project-lib/core/api';

import {IAnyObject} from '@project-lib/core/i-any-object';

export class GetBillingDetails<T> extends GetAPICommand<T> {
  constructor(
    apiService: ApiService,
    adapter: IAdapter<T>,
    appConfig: IAnyObject,
  ) {
    super(
      apiService,
      adapter,
      `${appConfig.baseApiUrl}${appConfig.subscriptionServiceUrl}/subscriptions`,
    );
  }
}
