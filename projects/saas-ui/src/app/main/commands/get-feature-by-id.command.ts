import {IApiService, IAdapter, GetAPICommand} from '@project-lib/core/api';

import {Inject} from '@angular/core';
import {APP_CONFIG} from '@project-lib/app-config';
import {IAnyObject} from '@project-lib/core/i-any-object';
import {Plan} from '../../shared/models';
import {FeatureValues} from '../../shared/models/feature-values.model';
export class GetFeatureByIdCommand<T> extends GetAPICommand<FeatureValues[]> {
  parameters: {};
  constructor(
    apiService: IApiService,
    adapter: IAdapter<FeatureValues[]>,
    planId: string,
    appConfig: IAnyObject,
  ) {
    super(
      apiService,
      adapter,
      `${appConfig.baseApiUrl}${appConfig.subscriptionServiceUrl}/plans/${planId}/features`,
    );
  }
}
