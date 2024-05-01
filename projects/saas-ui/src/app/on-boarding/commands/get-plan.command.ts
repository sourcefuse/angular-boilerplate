import {IApiService, IAdapter} from '@project-lib/core/api';
import {GetAPICommand} from '../../shared /auth/commands';

import {Observable} from 'rxjs';
import {Plan} from '../models';
import {environment} from 'projects/saas-ui/src/environment';
import {Inject} from '@angular/core';
import {APP_CONFIG} from '@project-lib/app-config';
import {IAnyObject} from '@project-lib/core/i-any-object';

export class GetPlanCommand<T> extends GetAPICommand<Plan[]> {
  parameters: {};
  execute(): Observable<Plan[]> {
    throw new Error('Method not implemented.');
  }
  constructor(
    apiService: IApiService,
    adapter: IAdapter<Plan[]>,
    @Inject(APP_CONFIG) private readonly appConfig?: IAnyObject,
  ) {
    super(
      apiService,
      adapter,
      `${appConfig.baseApiUrl}${appConfig.subscriptionServiceUrl}/plans`,
    );
  }
}
