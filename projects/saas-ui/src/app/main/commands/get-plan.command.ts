import {IApiService, IAdapter, GetAPICommand} from '@project-lib/core/api';
import {Observable} from 'rxjs';
import {Inject} from '@angular/core';
import {APP_CONFIG} from '@project-lib/app-config';
import {IAnyObject} from '@project-lib/core/i-any-object';
import {Plan} from '../../on-boarding/models';

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
