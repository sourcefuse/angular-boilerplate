import {
  IApiService,
  IAdapter,
  GetAPICommand,
  Count,
} from '@project-lib/core/api';
import {Observable} from 'rxjs';
import {Inject} from '@angular/core';
import {APP_CONFIG} from '@project-lib/app-config';
import {IAnyObject} from '@project-lib/core/i-any-object';
import {Plan} from '../../shared/models';

export class GetTotalPlanCommand<T> extends GetAPICommand<Count> {
  constructor(
    apiService: IApiService,
    adapter: IAdapter<Count>,
    appConfig: IAnyObject,
  ) {
    super(
      apiService,
      adapter,
      `${appConfig.baseApiUrl}${appConfig.subscriptionServiceUrl}/plans/count`,
    );
  }
}
