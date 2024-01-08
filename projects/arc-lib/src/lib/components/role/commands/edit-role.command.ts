import {environment} from '@main-project/boiler/env/environment';
import {PatchAPICommand, ApiService, IAdapter} from '@project-lib/core/api';

export class EditRoleCommand<T> extends PatchAPICommand<T> {
  constructor(
    apiService: ApiService,
    adapter: IAdapter<T>,
    tenantId: string,
    id: string,
    endpoint?: string,
  ) {
    super(
      apiService,
      adapter,
      endpoint ??
        `${environment.authServiceUrl}/tenant/${tenantId}/roles/${id}`,
    );
  }
}
