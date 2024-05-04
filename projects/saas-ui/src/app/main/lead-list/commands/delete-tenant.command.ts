import {ApiService, DelAPICommand, IAdapter} from '@project-lib/core/api';

import {APP_CONFIG} from '@project-lib/app-config';
import {IAnyObject} from '@project-lib/core/i-any-object';
import {Inject} from '@angular/core';
import {Observable} from 'rxjs';

export class DeleteTenantCommand<T> extends DelAPICommand<T> {
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
