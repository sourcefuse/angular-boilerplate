import {ApiService, IAdapter, PostAPICommand} from '@project-lib/core/api';
import {Lead} from '../../shared/models';

import {IAnyObject} from '@project-lib/core/i-any-object';

export class AddLeadCommand<T> extends PostAPICommand<Lead> {
  constructor(
    apiService: ApiService,
    adapter: IAdapter<Lead>,
    appConfig: IAnyObject,
  ) {
    super(
      apiService,
      adapter,
      `${appConfig.baseApiUrl}${appConfig.tenantMgmtFacadeUrl}/leads`,
    );
  }
}
