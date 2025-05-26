import {IAnyObject} from '@project-lib/core/i-any-object';
import {GetAPICommand, IAdapter, IApiService} from '@project-lib/core/api';

export class GetCurrentUserCommand<T> extends GetAPICommand<T> {
  constructor(
    apiService: IApiService,
    adapter: IAdapter<T>,
    appConfig: IAnyObject,
  ) {
    super(
      apiService,
      adapter,
      `${appConfig.baseApiUrl}${appConfig.authServiceUrl}/auth/me`,
    );
  }
}
