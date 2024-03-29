import {
  ApiService,
  IAdapter,
  IApiService,
  PostAPICommand,
} from '@project-lib/core/api';

export class CreateTokenCommand<T> extends PostAPICommand<T> {
  constructor(apiService: IApiService, adapter: IAdapter<T>, appConfig: any) {
    super(
      apiService,
      adapter,
      `${appConfig.baseApiUrl}${appConfig.authServiceUrl}/auth/sign-up/create-token`,
    );
  }
}
