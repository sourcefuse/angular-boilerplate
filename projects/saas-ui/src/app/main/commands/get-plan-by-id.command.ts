import {IApiService, IAdapter, GetAPICommand} from '@project-lib/core/api';

import {Inject} from '@angular/core';
import {APP_CONFIG} from '@project-lib/app-config';
import {IAnyObject} from '@project-lib/core/i-any-object';
import {Plan} from '../../on-boarding/models';
export class GetPlanByIdCommand<T> extends GetAPICommand<Plan[]> {
  parameters: {};
  constructor(
    apiService: IApiService,
    adapter: IAdapter<Plan[]>,
    planId: string,
    appConfig: IAnyObject,
  ) {
    super(
      apiService,
      adapter,
      `${appConfig.baseApiUrl}${appConfig.subscriptionServiceUrl}/plans/${planId}`,
    );
  }
}
