import {environment} from '@main-project/boiler/env/environment';
import {ApiService, IAdapter} from '@project-lib/core/api';
import {PostAPICommand} from '../../../shared /auth/commands';

export class AddTenantCommand<T> extends PostAPICommand<T> {
  constructor(apiService: ApiService, adapter: IAdapter<T>) {
    super(
      apiService,
      adapter,
      `${environment.baseApiUrl}/${environment.userServiceUrl}/tenants`,
    );
  }
}
