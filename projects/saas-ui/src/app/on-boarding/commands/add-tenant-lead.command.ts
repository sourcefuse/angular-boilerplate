import {IAdapter} from '@project-lib/core/api';
import {PostAPICommand} from '../../shared /auth/commands';

import {Tenant} from '../models';
import {Observable} from 'rxjs';

import {ApiService} from '../../shared /api/api.service';
import {Inject} from '@angular/core';
import {APP_CONFIG} from '@project-lib/app-config';
import {IAnyObject} from '@project-lib/core/i-any-object';

export class AddTenantFromLeadCommand<T> extends PostAPICommand<Tenant> {
  parameters: {
    data: Tenant;
  };
  execute(): Observable<Tenant> {
    throw new Error('Method not implemented.');
  }
  constructor(
    apiService: ApiService,
    adapter: IAdapter<T>,
    leadId: string,
    @Inject(APP_CONFIG) private readonly appConfig?: IAnyObject,
  ) {
    super(
      apiService,
      adapter,
      `${appConfig.baseApiUrl}${appConfig.tenantMgmtFacadeUrl}/leads/${leadId}/tenants`,
    );
  }
}
