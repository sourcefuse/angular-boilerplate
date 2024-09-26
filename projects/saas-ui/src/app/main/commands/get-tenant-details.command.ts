import {
  ApiService,
  GetAPICommand,
  GetListAPICommand,
  IAdapter,
} from '@project-lib/core/api';

import {IAnyObject} from '@project-lib/core/i-any-object';
import {TenantDetails} from '../../shared/models/tenantDetails.model';

export class GetTenantDetailsCommand<T> extends GetAPICommand<TenantDetails[]> {
  constructor(
    apiService: ApiService,
    adapter: IAdapter<TenantDetails[]>,
    appConfig: IAnyObject,
  ) {
    super(
      apiService,
      adapter,
      `${appConfig.baseApiUrl}${appConfig.tenantMgmtFacadeUrl}/tenants`,
    );
  }
}
