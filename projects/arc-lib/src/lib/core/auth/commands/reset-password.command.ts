import { IAdapter, IApiService, PatchAPICommand } from '../../api';

export class ResetPasswordCommand<T> extends PatchAPICommand<T> {
  constructor(apiService: IApiService, adapter: IAdapter<T>, appConfig: any) {
    super(
      apiService,
      adapter,
      `${appConfig.baseApiUrl}${appConfig.authServiceUrl}/auth/reset-password`
    );
  }
}
