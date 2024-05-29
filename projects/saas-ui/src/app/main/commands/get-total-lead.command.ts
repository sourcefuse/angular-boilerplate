import {
  ApiService,
  Count,
  GetAPICommand,
  GetListAPICommand,
  IAdapter,
} from '@project-lib/core/api';
import {Lead} from '../../shared/models';

import {IAnyObject} from '@project-lib/core/i-any-object';

export class GetTotalLeadCommand<T> extends GetAPICommand<Count> {
  constructor(
    apiService: ApiService,
    adapter: IAdapter<Count>,
    appConfig: IAnyObject,
  ) {
    super(
      apiService,
      adapter,
      `${appConfig.baseApiUrl}${appConfig.tenantmgmtServiceUrl}/leads/count`,
    );
  }
}
