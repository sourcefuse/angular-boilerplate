import {GetAPICommand, IAdapter, IApiService} from '@project-lib/core/api';
import {Observable} from 'rxjs';
import {Lead} from '../models';
import {environment} from 'projects/saas-ui/src/environment';
import {Inject} from '@angular/core';
import {APP_CONFIG} from '@project-lib/app-config';
import {IAnyObject} from '@project-lib/core/i-any-object';

export class GetLeadByIdCommand<T> extends GetAPICommand<Lead> {
  execute(): Observable<Lead> {
    throw new Error('Method not implemented.');
  }
  constructor(
    apiService: IApiService,
    adapter: IAdapter<Lead>,
    leadId: string,
    @Inject(APP_CONFIG) private readonly appConfig?: IAnyObject,
  ) {
    super(
      apiService,
      adapter,
      `${appConfig.tenantmgmtServiceUrl}/leads/${leadId}`,
    );
  }
}
