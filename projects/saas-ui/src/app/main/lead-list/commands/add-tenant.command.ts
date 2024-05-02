import {ApiService, IAdapter, PostAPICommand} from '@project-lib/core/api';
import {environment} from 'projects/saas-ui/src/environment';
import {Inject} from '@angular/core';
import {APP_CONFIG} from '@project-lib/app-config';
import {IAnyObject} from '@project-lib/core/i-any-object';
import {Tenant} from '../model/lead-tenant.model';
import {Observable} from 'rxjs';

export class AddTenantCommand<T> extends PostAPICommand<T> {
  parameters: {
    data: Tenant;
  };
  execute(): Observable<T> {
    throw new Error('Method not implemented.');
  }
  constructor(
    apiService: ApiService,
    adapter: IAdapter<T>,
    @Inject(APP_CONFIG) private readonly appConfig?: IAnyObject,
  ) {
    super(apiService, adapter, `${appConfig.tenantmgmtServiceUrl}/tenants`);
  }
}
