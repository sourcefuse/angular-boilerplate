import {IApiService, IAdapter} from '@project-lib/core/api';
import {GetAPICommand} from '../../shared /auth/commands';
import {environment} from 'projects/saas-ui/src/environment';
import {Observable} from 'rxjs';
import {Plan} from '../models';

export class GetPlanCommand<T> extends GetAPICommand<Plan[]> {
  parameters: {};
  execute(): Observable<Plan[]> {
    throw new Error('Method not implemented.');
  }
  constructor(apiService: IApiService, adapter: IAdapter<Plan[]>) {
    super(
      apiService,
      adapter,
      `${environment.baseApiUrl}${environment.subscriptionServiceUrl}/plans`,
    );
  }
}
