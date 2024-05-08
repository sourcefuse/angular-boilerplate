import {ApiService, DelAPICommand, IAdapter} from '@project-lib/core/api';

import {Inject} from '@angular/core';
import {APP_CONFIG} from '@project-lib/app-config';
import {IAnyObject} from '@project-lib/core/i-any-object';
export class DeletePlanCommand<T> extends DelAPICommand<T> {
  constructor(
    apiService: ApiService,
    adapter: IAdapter<T>,
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
