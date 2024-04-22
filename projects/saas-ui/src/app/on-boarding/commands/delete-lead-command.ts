import {ApiService, IAdapter} from '@project-lib/core/api';
import {DelAPICommand} from '../../shared /auth/commands';
import {environment} from 'projects/saas-ui/src/environment';

export class DeleteLeadCommand<T> extends DelAPICommand<T> {
  constructor(apiService: ApiService, adapter: IAdapter<T>, tenantId: string) {
    super(
      apiService,
      adapter,
      `${environment.baseApiUrl}/${environment.userServiceUrl}/tenants/${tenantId}`,
    );
  }
}
