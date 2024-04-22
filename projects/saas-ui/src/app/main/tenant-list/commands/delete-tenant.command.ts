import {environment} from '@main-project/boiler/env/environment';
import {ApiService, IAdapter} from '@project-lib/core/api';
import {DelAPICommand} from '../../../shared /auth/commands';

export class DeleteTenantCommand<T> extends DelAPICommand<T> {
  constructor(apiService: ApiService, adapter: IAdapter<T>, tenantId: string) {
    super(
      apiService,
      adapter,
      `${environment.baseApiUrl}/${environment.userServiceUrl}/tenants/${tenantId}`,
    );
  }
}
