import {IApiService, IAdapter, GetAPICommand} from '@project-lib/core/api';
import {IAnyObject} from '@project-lib/core/i-any-object';
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
