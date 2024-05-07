import {IAnyObject} from '@project-lib/core/i-any-object';
import {Inject} from '@angular/core';
import {APP_CONFIG} from '@project-lib/app-config';
import {
  AnyObject,
  GetAPICommand,
  IAdapter,
  IApiService,
} from '@project-lib/core/api';

export class GetCurrentUserCommand<T> extends GetAPICommand<T> {
  constructor(
    apiService: IApiService,
    adapter: IAdapter<T>,
    appConfig: IAnyObject,
  ) {
    super(
      apiService,
      adapter,
      `${appConfig.baseApiUrl}${appConfig.authServiceUrl}/auth/me`,
    );
  }
}
