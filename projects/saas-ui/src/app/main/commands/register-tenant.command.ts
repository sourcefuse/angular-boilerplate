import {
  ApiService,
  GetListAPICommand,
  IAdapter,
  PostAPICommand,
} from '@project-lib/core/api';
import {Lead} from '../../shared/models';

import {IAnyObject} from '@project-lib/core/i-any-object';
import {TenantLead} from '../../shared/models/tenantLead.model';

export class RegisterTenantCommand<T> extends PostAPICommand<TenantLead> {
  constructor(
    apiService: ApiService,
    adapter: IAdapter<TenantLead>,
    appConfig: IAnyObject,
  ) {
    super(
      apiService,
      adapter,
      `${appConfig.baseApiUrl}${appConfig.tenantmgmtServiceUrl}/tenants`,
    );
  }
}
