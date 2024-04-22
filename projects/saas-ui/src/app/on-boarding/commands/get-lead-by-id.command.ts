import {IApiService, IAdapter} from '@project-lib/core/api';
import {GetAPICommand} from '../../shared /auth/commands';
import {environment} from 'projects/saas-ui/src/environment';
import {Observable} from 'rxjs';
import {Lead} from '../models';

export class GetLeadByIdCommand<T> extends GetAPICommand<Lead> {
  execute(): Observable<Lead> {
    throw new Error('Method not implemented.');
  }
  constructor(
    apiService: IApiService,
    adapter: IAdapter<Lead>,
    leadId: string,
  ) {
    super(
      apiService,
      adapter,
      `${environment.baseApiUrl}${environment.tenantmgmtServiceUrl}/leads/${leadId}`,
    );
  }
}
