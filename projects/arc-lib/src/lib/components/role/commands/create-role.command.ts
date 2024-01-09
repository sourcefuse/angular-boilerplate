import {environment} from '@main-project/boiler/env/environment';
import {ApiService, IAdapter, PostAPICommand} from '@project-lib/core/api';

export class CreateRoleCommand<T> extends PostAPICommand<T> {
  constructor(
    apiService: ApiService,
    adapter: IAdapter<T>,
    tenantId?: string,
    endpoint?: string,
  ) {
    super(
      apiService,
      adapter,
      endpoint ?? `${environment.authServiceUrl}/tenant/${tenantId}/roles`,
    );
  }
}
