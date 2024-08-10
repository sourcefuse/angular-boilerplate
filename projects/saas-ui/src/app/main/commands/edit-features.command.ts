import {ApiService, IAdapter, PatchAPICommand} from '@project-lib/core/api';

import {Inject} from '@angular/core';
import {APP_CONFIG} from '@project-lib/app-config';
import {IAnyObject} from '@project-lib/core/i-any-object';
export class EditFeaturesCommand<T> extends PatchAPICommand<T> {
  constructor(
    apiService: ApiService,
    adapter: IAdapter<T>,
    appConfig: IAnyObject,
  ) {
    super(
      apiService,
      adapter,
      `https://arc-saas.net/subscription-service/feature-values`,
    );
  }
}
// ${appConfig.baseApiUrl}${appConfig.subscriptionServiceUrl}/plans/${planId}`
