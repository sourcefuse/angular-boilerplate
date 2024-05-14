import {ApiService, IAdapter, PostAPICommand} from '@project-lib/core/api';

import {IAnyObject} from '@project-lib/core/i-any-object';
import {Tenant} from '../../shared/models';

export class AddTenantCommand<T> extends PostAPICommand<T> {
  parameters: {
    data: Tenant;
  };
  constructor(
    apiService: ApiService,
    adapter: IAdapter<T>,
    appConfig: IAnyObject,
  ) {
    super(
      apiService,
      adapter,
      `${appConfig.baseApiUrl}${appConfig.tenantmgmtServiceUrl}/tenants`,
    );
  }
}
