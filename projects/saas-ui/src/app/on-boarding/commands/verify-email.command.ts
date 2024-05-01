import {IApiService, IAdapter} from '@project-lib/core/api';
import {PostAPICommand} from '../../shared /auth/commands';

import {Observable} from 'rxjs';

import {Inject} from '@angular/core';
import {APP_CONFIG} from '@project-lib/app-config';
import {IAnyObject} from '@project-lib/core/i-any-object';

export class VerifyEmailCommand<T> extends PostAPICommand<T> {
  parameters: any;
  execute(): Observable<T> {
    throw new Error('Method not implemented.');
  }
  constructor(
    apiService: IApiService,
    adapter: IAdapter<T>,
    leadId: string,
    @Inject(APP_CONFIG) private readonly appConfig?: IAnyObject,
  ) {
    super(
      apiService,
      adapter,
      `${appConfig.baseApiUrl}${appConfig.tenantMgmtFacadeUrl}/leads/${leadId}/verify`,
    );
  }
}
