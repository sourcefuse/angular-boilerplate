import {IAdapter} from '@project-lib/core/api';
import {GetListAPICommand} from '../../../shared /auth/commands';
import {environment} from 'projects/saas-ui/src/environment';
import {APP_CONFIG} from '@project-lib/app-config';
import {IAnyObject} from '@project-lib/core/i-any-object';
import {Inject} from '@angular/core';
import {ApiService} from '../../../shared /api/api.service';
export class GetTenantLeadListCommand<T> extends GetListAPICommand<T> {
  constructor(
    apiService: ApiService,
    adapter: IAdapter<T>,
    @Inject(APP_CONFIG) private readonly appConfig?: IAnyObject,
  ) {
    super(
      apiService,
      adapter,
      `${appConfig.baseApiUrl}${appConfig.tenantMgmtFacadeUrl}/tenants`, // if error remove ${appConfig.baseApiUrl}
    );
  }
}
