import {
  ApiService,
  GetAPICommand,
  GetListAPICommand,
  IAdapter,
} from '@project-lib/core/api';

import {IAnyObject} from '@project-lib/core/i-any-object';
import {tenantDetails} from '../../shared/models/tenantDetails.model';

export class GetTenantDetailsCommand<T> extends GetAPICommand<tenantDetails[]> {
  constructor(
    apiService: ApiService,
    adapter: IAdapter<tenantDetails[]>,
    appConfig: IAnyObject,
  ) {
    super(
      apiService,
      adapter,
      `${appConfig.baseApiUrl}${appConfig.tenantMgmtFacadeUrl}/tenants`,
    );
  }
}
