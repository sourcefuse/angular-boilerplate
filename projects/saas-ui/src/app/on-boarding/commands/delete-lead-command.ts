import {IAdapter} from '@project-lib/core/api';
import {DelAPICommand} from '../../shared /auth/commands';

import {ApiService} from '../../shared /api/api.service';
import {Inject} from '@angular/core';
import {APP_CONFIG} from '@project-lib/app-config';
import {IAnyObject} from '@project-lib/core/i-any-object';

export class DeleteLeadCommand<T> extends DelAPICommand<T> {
  constructor(
    apiService: ApiService,
    adapter: IAdapter<T>,
    tenantId: string,
    @Inject(APP_CONFIG) private readonly appConfig?: IAnyObject,
  ) {
    super(
      apiService,
      adapter,
      `${appConfig.baseApiUrl}/${appConfig.userServiceUrl}/tenants/${tenantId}`,
    );
  }
}
