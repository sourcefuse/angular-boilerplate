import {ApiService, IAdapter, PatchAPICommand} from '@project-lib/core/api';

import {IAnyObject} from '@project-lib/core/i-any-object';
import {Tenant} from '../../shared/models/tenant.model';

export class EditTenantCommand<T> extends PatchAPICommand<T> {
  data: Tenant;

  constructor(
    apiService: ApiService,
    adapter: IAdapter<T>,
    tenantId: string,
    appConfig: IAnyObject,
  ) {
    super(
      apiService,
      adapter,
      `${appConfig.baseApiUrl}${appConfig.tenantmgmtServiceUrl}/tenants/${tenantId}`,
    );
  }
}
