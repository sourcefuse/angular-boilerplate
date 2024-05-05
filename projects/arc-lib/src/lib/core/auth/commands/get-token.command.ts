import {Inject} from '@angular/core';
import {APP_CONFIG} from '@project-lib/app-config';
import {
  AnyObject,
  IAdapter,
  IApiService,
  PostAPICommand,
} from '@project-lib/core/api';
import {IAnyObject} from '@project-lib/core/i-any-object';

export class GetTokenCommand<T> extends PostAPICommand<T> {
  constructor(
    apiService: IApiService,
    adapter: IAdapter<T>,
    appConfig: IAnyObject,
  ) {
    super(
      apiService,
      adapter,
      `${appConfig.baseApiUrl}${appConfig.authServiceUrl}/auth/token`,
    );
  }
}
