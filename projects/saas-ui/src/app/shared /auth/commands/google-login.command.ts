import {Inject} from '@angular/core';
import {APP_CONFIG} from '@project-lib/app-config';
import {IApiService, IAdapter} from '@project-lib/core/api';
import {IAnyObject} from '@project-lib/core/i-any-object';
import {GetAPICommand} from './get-api.command';

export class GoogleLoginCommand<T> extends GetAPICommand<T> {
  constructor(
    apiService: IApiService,
    adapter: IAdapter<T>,
    @Inject(APP_CONFIG) private readonly appConfig?: IAnyObject,
  ) {
    super(
      apiService,
      adapter,
      `${appConfig.baseApiUrl}${appConfig.authServiceUrl}/auth/google`,
    );
  }
}
