import {IAdapter, IApiService, PostAPICommand} from '@boiler/core/api';
import {environment} from '@boiler/env/environment';

export class VerifyResetPasswordLinkCommand<T> extends PostAPICommand<T> {
  constructor(apiService: IApiService, adapter: IAdapter<T>) {
    super(
      apiService,
      adapter,
      `${environment.baseApiUrl}${environment.authServiceUrl}/auth/verify-reset-password-link`,
    );
  }
}
