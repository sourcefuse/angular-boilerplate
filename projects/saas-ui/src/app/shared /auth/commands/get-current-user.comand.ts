import {IAnyObject} from '@project-lib/core/i-any-object';

import {Inject} from '@angular/core';
import {APP_CONFIG} from '@project-lib/app-config';
import {IAdapter, IApiService} from '@project-lib/core/api';
import {GetAPICommand} from './get-api.command';

export class GetCurrentUserCommand<T> extends GetAPICommand<T> {
  constructor(
    apiService: IApiService,
    adapter: IAdapter<T>,
    @Inject(APP_CONFIG) private readonly appConfig: IAnyObject,
  ) {
    super(
      apiService,
      adapter,
      `${appConfig.baseApiUrl}${appConfig.authServiceUrl}/me`,
    );
  }
}
