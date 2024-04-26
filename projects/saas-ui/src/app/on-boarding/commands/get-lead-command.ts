import {IAdapter} from '@project-lib/core/api';
import {GetListAPICommand} from '../../shared /auth/commands';

import {Lead} from '../models';
import {Observable} from 'rxjs';
import {environment} from 'projects/saas-ui/src/environment';
import {ApiService} from '../../shared /api/api.service';
import {Inject} from '@angular/core';
import {APP_CONFIG} from '@project-lib/app-config';
import {IAnyObject} from '@project-lib/core/i-any-object';

export class GetLeadListCommand<T> extends GetListAPICommand<Lead> {
  constructor(
    apiService: ApiService,
    adapter: IAdapter<Lead>,
    @Inject(APP_CONFIG) private readonly appConfig?: IAnyObject,
  ) {
    super(apiService, adapter, `http://localhost:3002/leads`);
  }
}
