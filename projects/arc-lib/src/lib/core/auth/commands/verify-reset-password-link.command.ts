import { IAdapter, IApiService, PostAPICommand } from '../../api';

export class VerifyResetPasswordLinkCommand<T> extends PostAPICommand<T> {
  constructor(apiService: IApiService, adapter: IAdapter<T>, appConfig: any) {
    super(
      apiService,
      adapter,
      `${appConfig.baseApiUrl}${appConfig.authServiceUrl}/auth/verify-reset-password-link`
    );
  }
}
