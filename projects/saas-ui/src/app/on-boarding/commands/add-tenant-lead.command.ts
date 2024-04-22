import {ApiService, IAdapter} from '@project-lib/core/api';
import {PostAPICommand} from '../../shared /auth/commands';
import {environment} from 'projects/saas-ui/src/environment';
import {Tenant} from '../models';
import {Observable} from 'rxjs';

export class AddTenantFromLeadCommand<T> extends PostAPICommand<Tenant> {
  parameters: {
    data: Tenant;
  };
  execute(): Observable<Tenant> {
    throw new Error('Method not implemented.');
  }
  constructor(apiService: ApiService, adapter: IAdapter<T>, leadId: string) {
    super(
      apiService,
      adapter,
      `${environment.baseApiUrl}${environment.tenantMgmtFacadeUrl}/leads/${leadId}/tenants`,
    );
  }
}
