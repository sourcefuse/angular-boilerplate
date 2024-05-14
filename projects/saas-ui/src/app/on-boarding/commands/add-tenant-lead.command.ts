import {ApiService, IAdapter, PostAPICommand} from '@project-lib/core/api';
import {Tenant} from '../../shared/models';

import {IAnyObject} from '@project-lib/core/i-any-object';

export class AddTenantFromLeadCommand<T> extends PostAPICommand<Tenant> {
  parameters: {
    data: Tenant;
  };

  constructor(
    apiService: ApiService,
    adapter: IAdapter<T>,
    leadId: string,
    appConfig: IAnyObject,
  ) {
    super(
      apiService,
      adapter,
      `${appConfig.baseApiUrl}${appConfig.tenantMgmtFacadeUrl}/leads/${leadId}/tenants`,
    );
  }
}
