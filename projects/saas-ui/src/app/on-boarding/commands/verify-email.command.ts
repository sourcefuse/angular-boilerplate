import {IApiService, IAdapter} from '@project-lib/core/api';
import {PostAPICommand} from '../../shared /auth/commands';
import {environment} from 'projects/saas-ui/src/environment';
import {Observable} from 'rxjs';

export class VerifyEmailCommand<T> extends PostAPICommand<T> {
  parameters: any;
  execute(): Observable<T> {
    throw new Error('Method not implemented.');
  }
  constructor(apiService: IApiService, adapter: IAdapter<T>, leadId: string) {
    super(
      apiService,
      adapter,
      `${environment.baseApiUrl}${environment.tenantMgmtFacadeUrl}/leads/${leadId}/verify`,
    );
  }
}
