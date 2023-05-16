import { GetAPICommand, IAdapter, IApiService } from '../../api';

export class GoogleLoginCommand<T> extends GetAPICommand<T> {
  constructor(apiService: IApiService, adapter: IAdapter<T>, appConfig: any) {
    super(
      apiService,
      adapter,
      `${appConfig.baseApiUrl}${appConfig.authServiceUrl}/auth/google`
    );
  }
}
