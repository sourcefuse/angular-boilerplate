import {environment} from '@main-project/boiler/env/environment';
import {GetListAPICommand, ApiService, IAdapter} from '@project-lib/core/api';

export class GetRolesCommand<T> extends GetListAPICommand<T> {
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
