import {ApiService, GetListAPICommand, IAdapter} from '@project-lib/core/api';
import {Lead} from '../../shared/models';

import {IAnyObject} from '@project-lib/core/i-any-object';

export class GetLeadListCommand<T> extends GetListAPICommand<Lead> {
  constructor(
    apiService: ApiService,
    adapter: IAdapter<Lead>,
    appConfig: IAnyObject,
  ) {
    super(
      apiService,
      adapter,
      `${appConfig.baseApiUrl}${appConfig.tenantmgmtServiceUrl}/leads`,
    );
  }
}
