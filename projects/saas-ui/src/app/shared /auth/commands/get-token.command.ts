import {Inject} from '@angular/core';
import {APP_CONFIG} from '@project-lib/app-config';
import {IAdapter, IApiService} from '@project-lib/core/api';
import {IAnyObject} from '@project-lib/core/i-any-object';
import {PostAPICommand} from './post-api.command';

export class GetTokenCommand<T> extends PostAPICommand<T> {
  constructor(
    apiService: IApiService,
    adapter: IAdapter<T>,
    @Inject(APP_CONFIG) private readonly appConfig?: IAnyObject,
  ) {
    super(
      apiService,
      adapter,
      `${appConfig.baseApiUrl}${appConfig.authServiceUrl}/auth/token`,
    );
  }
}
