import {IApiService, IAdapter, GetAPICommand} from '@project-lib/core/api';
import {Plan} from '../models';
import {Inject} from '@angular/core';
import {APP_CONFIG} from '@project-lib/app-config';
import {IAnyObject} from '@project-lib/core/i-any-object';

export class GetPlanCommand<T> extends GetAPICommand<Plan[]> {
  constructor(
    apiService: IApiService,
    adapter: IAdapter<Plan[]>,
    @Inject(APP_CONFIG) private readonly appConfig?: IAnyObject,
  ) {
    super(apiService, adapter, `${appConfig.subscriptionServiceUrl}/plans`);
  }
}
