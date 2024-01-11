import {IAdapter, IApiService, PostAPICommand} from '../../api';

export class LoginCommand<T> extends PostAPICommand<T> {
  constructor(apiService: IApiService, adapter: IAdapter<T>, appConfig: any) {
    super(
      apiService,
      adapter,
      `${appConfig.baseApiUrl}${appConfig.authServiceUrl}/auth/login`,
    );
  }
}
