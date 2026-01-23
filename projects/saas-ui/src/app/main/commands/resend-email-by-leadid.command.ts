import {
  ApiService,
  IAdapter,
  PatchAPICommand,
  PostAPICommand,
} from '@project-lib/core/api';

import {Inject} from '@angular/core';
import {APP_CONFIG} from '@project-lib/app-config';
import {IAnyObject} from '@project-lib/core/i-any-object';
export class ResendEmailByLeadIdCommand<T> extends PostAPICommand<T> {
  constructor(
    apiService: ApiService,
    adapter: IAdapter<T>,
    leadId: string,
    appConfig: IAnyObject,
  ) {
    super(
      apiService,
      adapter,
      `${appConfig.baseApiUrl}${appConfig.tenantMgmtFacadeUrl}/leads/${leadId}/reminder`,
    );
  }
}
