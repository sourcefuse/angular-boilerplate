import {IAdapter} from '@project-lib/core/api';
import {PatchAPICommand} from '../../../shared /auth/commands';
import {APP_CONFIG} from '@project-lib/app-config';
import {IAnyObject} from '@project-lib/core/i-any-object';
import {Inject} from '@angular/core';
import {ApiService} from '../../../shared /api/api.service';

export class EditTenantCommand<T> extends PatchAPICommand<T> {
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
