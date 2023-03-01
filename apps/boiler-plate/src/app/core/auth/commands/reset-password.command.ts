import {IAdapter, IApiService, PatchAPICommand} from '@boiler/core/api';
import {environment} from '@boiler/env/environment';

export class ResetPasswordCommand<T> extends PatchAPICommand<T> {
  constructor(apiService: IApiService, adapter: IAdapter<T>) {
    super(
      apiService,
      adapter,
      `${environment.baseApiUrl}${environment.authServiceUrl}/auth/reset-password`,
    );
  }
}
