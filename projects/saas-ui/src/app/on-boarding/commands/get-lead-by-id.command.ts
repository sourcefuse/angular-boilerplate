import {GetAPICommand, IAdapter, IApiService} from '@project-lib/core/api';

import {Lead} from '../../shared/models';

import {IAnyObject} from '@project-lib/core/i-any-object';

export class GetLeadByIdCommand<T> extends GetAPICommand<Lead> {
  constructor(
    apiService: IApiService,
    adapter: IAdapter<Lead>,
    leadId: string,
    appConfig: IAnyObject,
  ) {
    super(
      apiService,
      adapter,
      `${appConfig.baseApiUrl}${appConfig.tenantmgmtServiceUrl}/leads/${leadId}`,
    );
  }
}
