import {ApiService, GetAPICommand, IAdapter} from '@project-lib/core/api';

import {APP_CONFIG} from '@project-lib/app-config';
import {IAnyObject} from '@project-lib/core/i-any-object';
import {Inject} from '@angular/core';
import {Observable} from 'rxjs';

export class GetTenantByIdCommand<T> extends GetAPICommand<T> {
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
      `${appConfig.tenantmgmtServiceUrl}/tenants/${tenantId}}`,
    );
  }
}
