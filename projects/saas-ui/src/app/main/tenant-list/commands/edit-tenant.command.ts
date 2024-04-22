import {environment} from '@main-project/boiler/env/environment';
import {ApiService, IAdapter} from '@project-lib/core/api';
import {PatchAPICommand} from '../../../shared /auth/commands';

export class EditTenantCommand<T> extends PatchAPICommand<T> {
  constructor(apiService: ApiService, adapter: IAdapter<T>, tenantId: string) {
    super(
      apiService,
      adapter,
      `${environment.baseApiUrl}/${environment.userServiceUrl}/tenants/${tenantId}`,
    );
  }
}
