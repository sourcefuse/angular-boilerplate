import {PostAPICommand, ApiService, IAdapter} from '@project-lib/core/api';
import {IAnyObject} from '@project-lib/core/i-any-object';
import {Plan} from '../../shared/models';
import {Feature} from '../../shared/interfaces/features';
export class AddFeaturesCommand<T> extends PostAPICommand<Feature[]> {
  parameters: any;

  constructor(
    apiService: ApiService,
    adapter: IAdapter<Feature[]>,
    planId: string,
    appConfig: IAnyObject,
  ) {
    super(
      apiService,
      adapter,
      `https://arc-saas.net/subscription-service/plans/${planId}/features`,
    );
  }
}
