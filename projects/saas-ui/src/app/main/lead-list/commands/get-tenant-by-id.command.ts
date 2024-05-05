import {ApiService, GetAPICommand, IAdapter} from '@project-lib/core/api';

import {IAnyObject} from '@project-lib/core/i-any-object';

export class GetTenantByIdCommand<T> extends GetAPICommand<T> {
  constructor(
    apiService: ApiService,
    adapter: IAdapter<T>,
    tenantId: string,
    appConfig: IAnyObject,
  ) {
    super(
      apiService,
      adapter,
      `${appConfig.baseApiUrl}${appConfig.tenantmgmtServiceUrl}/tenants/${tenantId}}`,
    );
  }
}
