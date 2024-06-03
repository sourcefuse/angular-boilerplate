import {PostAPICommand, IApiService, IAdapter} from '@project-lib/core/api';

export class CognitoLogoutCommand<T> extends PostAPICommand<T> {
  constructor(apiService: IApiService, adapter: IAdapter<T>, appConfig: any) {
    super(
      apiService,
      adapter,
      `${appConfig.baseApiUrl}${appConfig.authServiceUrl}/cognito/logout`,
    );
  }
}
