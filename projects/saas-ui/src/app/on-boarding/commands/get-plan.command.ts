import {
  IApiService,
  IAdapter,
  GetAPICommand,
  AnyObject,
} from '@project-lib/core/api';
import {Plan} from '../../shared/models';

import {IAnyObject} from '@project-lib/core/i-any-object';

export class GetPlanCommand<T> extends GetAPICommand<AnyObject> {
  constructor(
    apiService: IApiService,
    adapter: IAdapter<AnyObject>,
    appConfig: IAnyObject,
  ) {
    super(
      apiService,
      adapter,
      `${appConfig.baseApiUrl}${appConfig.subscriptionServiceUrl}/plans`,
    );
  }
}
