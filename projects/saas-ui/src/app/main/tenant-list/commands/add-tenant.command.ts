import {IAdapter} from '@project-lib/core/api';
import {PostAPICommand} from '../../../shared /auth/commands';
import {environment} from 'projects/saas-ui/src/environment';
import {Inject} from '@angular/core';
import {APP_CONFIG} from '@project-lib/app-config';
import {IAnyObject} from '@project-lib/core/i-any-object';
import {ApiService} from '../../../shared /api/api.service';

export class AddTenantCommand<T> extends PostAPICommand<T> {
  constructor(
    apiService: ApiService,
    adapter: IAdapter<T>,
    @Inject(APP_CONFIG) private readonly appConfig?: IAnyObject,
  ) {
    super(apiService, adapter, `${appConfig.tenantmgmtServiceUrl}/tenants`);
  }
}
