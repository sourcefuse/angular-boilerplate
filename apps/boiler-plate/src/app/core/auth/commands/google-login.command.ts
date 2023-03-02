import {GetAPICommand, IAdapter, IApiService} from '@boiler/core/api';
import {environment} from '@boiler/env/environment';

export class GoogleLoginCommand<T> extends GetAPICommand<T> {
  constructor(apiService: IApiService, adapter: IAdapter<T>) {
    super(
      apiService,
      adapter,
      `${environment.baseApiUrl}${environment.authServiceUrl}/auth/google`,
    );
  }
}
