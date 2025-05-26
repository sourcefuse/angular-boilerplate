import {IApiService, IAdapter, GetAPICommand} from '@project-lib/core/api';

import {Inject} from '@angular/core';
import {APP_CONFIG} from '@project-lib/app-config';
import {IAnyObject} from '@project-lib/core/i-any-object';
import {Plan} from '../../shared/models';
import {FeatureValues} from '../../shared/models/feature-values.model';
import {PlanWithFeatures} from '../../shared/models/plans-features.model';
export class GetFeatureByPlanIdCommand<
  T,
> extends GetAPICommand<PlanWithFeatures> {
  parameters: {};
  constructor(
    apiService: IApiService,
    adapter: IAdapter<PlanWithFeatures>,
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
