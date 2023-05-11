import { IAdapter, IApiService, PostAPICommand } from '../../api';

export class RefreshTokenCommand<T> extends PostAPICommand<T> {
  constructor(apiService: IApiService, adapter: IAdapter<T>, appConfig: any) {
    super(
      apiService,
      adapter,
      `${appConfig.baseApiUrl}${appConfig.authServiceUrl}/auth/token-refresh`
    );
  }
}
