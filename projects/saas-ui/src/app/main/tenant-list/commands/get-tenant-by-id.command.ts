import {environment} from '@main-project/boiler/env/environment';
import {ApiService, IAdapter} from '@project-lib/core/api';
import {GetAPICommand} from '../../../shared /auth/commands';

export class GetTenantByIdCommand<T> extends GetAPICommand<T> {
  constructor(apiService: ApiService, adapter: IAdapter<T>, tenantId: string) {
    super(
      apiService,
      adapter,
      `${environment.baseApiUrl}/${environment.userServiceUrl}/tenants/${tenantId}}`,
    );
  }
}
