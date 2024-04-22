import {ApiService, IAdapter} from '@project-lib/core/api';
import {GetListAPICommand} from '../../../shared /auth/commands';
import {environment} from 'projects/saas-ui/src/environment';

export class GetTenantLeadListCommand<T> extends GetListAPICommand<T> {
  constructor(apiService: ApiService, adapter: IAdapter<T>) {
    super(
      apiService,
      adapter,
      `${environment.baseApiUrl}${environment.tenantMgmtFacadeUrl}/leads/tenants`,
    );
  }
}
