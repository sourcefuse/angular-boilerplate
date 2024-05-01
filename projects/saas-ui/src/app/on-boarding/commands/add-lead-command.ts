import {IAdapter} from '@project-lib/core/api';
import {PostAPICommand} from '../../shared /auth/commands';

import {Observable} from 'rxjs';
import {Lead} from '../models';

import {ApiService} from '../../shared /api/api.service';
import {Inject} from '@angular/core';
import {APP_CONFIG} from '@project-lib/app-config';
import {IAnyObject} from '@project-lib/core/i-any-object';

export class AddLeadCommand<T> extends PostAPICommand<Lead> {
  parameters: any;

  constructor(
    apiService: ApiService,
    adapter: IAdapter<Lead>,
    @Inject(APP_CONFIG) private readonly appConfig?: IAnyObject,
  ) {
    super(
      apiService,
      adapter,
      `${appConfig.baseApiUrl}${appConfig.tenantMgmtFacadeUrl}/leads`,
    );
  }
}
