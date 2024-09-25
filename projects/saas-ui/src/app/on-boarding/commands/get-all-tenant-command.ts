import {
  IApiService,
  IAdapter,
  PostAPICommand,
  GetAPICommand,
} from '@project-lib/core/api';
import {IAnyObject} from '@project-lib/core/i-any-object';

export class GetAllTenantKeysCommand<T> extends GetAPICommand<T> {
  constructor(
    apiService: IApiService,
    adapter: IAdapter<T>,
    appConfig: IAnyObject,
  ) {
    super(
      apiService,
      adapter,
      `${appConfig.baseApiUrl}${appConfig.tenantmgmtServiceUrl}/tenant-keys`,
    );
  }
}
