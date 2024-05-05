import {IApiService, IAdapter, GetAPICommand} from '@project-lib/core/api';
import {Plan} from '../models';

import {IAnyObject} from '@project-lib/core/i-any-object';

export class GetPlanCommand<T> extends GetAPICommand<Plan[]> {
  constructor(
    apiService: IApiService,
    adapter: IAdapter<Plan[]>,
    appConfig: IAnyObject,
  ) {
    super(
      apiService,
      adapter,
      `${appConfig.baseApiUrl}${appConfig.subscriptionServiceUrl}/plans`,
    );
  }
}