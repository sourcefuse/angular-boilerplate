import {PostAPICommand, ApiService, IAdapter} from '@project-lib/core/api';
import {IAnyObject} from '@project-lib/core/i-any-object';
import {Plan} from '../../on-boarding/models';

export class AddPlanCommand<T> extends PostAPICommand<Plan> {
  parameters: any;

  constructor(
    apiService: ApiService,
    adapter: IAdapter<Plan>,
    appConfig: IAnyObject,
  ) {
    super(apiService, adapter, `${appConfig.subscriptionServiceUrl}/plans`);
  }
}
