import {ApiService, IAdapter, PatchAPICommand} from '@project-lib/core/api';
import {APP_CONFIG} from '@project-lib/app-config';
import {IAnyObject} from '@project-lib/core/i-any-object';
import {Inject} from '@angular/core';
import {Tenant} from '../model/lead-tenant.model';
import {Observable} from 'rxjs';

export class EditTenantCommand<T> extends PatchAPICommand<T> {
  data: Tenant;
  execute(): Observable<T> {
    throw new Error('Method not implemented.');
  }
  constructor(
    apiService: ApiService,
    adapter: IAdapter<T>,
    tenantId: string,
    @Inject(APP_CONFIG) private readonly appConfig?: IAnyObject,
  ) {
    super(
      apiService,
      adapter,
      `${appConfig.tenantmgmtServiceUrl}/tenants/${tenantId}`,
    );
  }
}
