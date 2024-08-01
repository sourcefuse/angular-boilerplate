import {IApiService, IAdapter, GetAPICommand} from '@project-lib/core/api';
import {Observable} from 'rxjs';
import {Inject} from '@angular/core';
import {APP_CONFIG} from '@project-lib/app-config';
import {IAnyObject} from '@project-lib/core/i-any-object';
import {Plan} from '../../shared/models';
import {Features} from '../../shared/models/feature.model';

export class GetFeaturesCommand<T> extends GetAPICommand<Features[]> {
  constructor(
    apiService: IApiService,
    adapter: IAdapter<Features[]>,
    appConfig: IAnyObject,
  ) {
    super(
      apiService,
      adapter,
      `${appConfig.baseApiUrl}${appConfig.subscriptionServiceUrl}/features`,
    );
  }
}
