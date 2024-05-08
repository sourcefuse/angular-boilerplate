import {IApiService, IAdapter, PostAPICommand} from '@project-lib/core/api';
import {IAnyObject} from '@project-lib/core/i-any-object';

export class VerifyEmailCommand<T> extends PostAPICommand<T> {
  parameters: any;

  constructor(
    apiService: IApiService,
    adapter: IAdapter<T>,
    leadId: string,
    appConfig: IAnyObject,
  ) {
    super(
      apiService,
      adapter,
      `${appConfig.baseApiUrl}${appConfig.tenantMgmtFacadeUrl}/leads/${leadId}/verify`,
    );
  }
}
