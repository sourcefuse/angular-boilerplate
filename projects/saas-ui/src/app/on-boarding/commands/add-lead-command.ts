import {ApiService, IAdapter} from '@project-lib/core/api';
import {PostAPICommand} from '../../shared /auth/commands';
import {environment} from 'projects/saas-ui/src/environment';
import {Observable} from 'rxjs';
import {Lead} from '../models';

export class AddLeadCommand<T> extends PostAPICommand<Lead> {
  parameters: any;
  execute(): Observable<Lead> {
    throw new Error('Method not implemented.');
  }
  constructor(apiService: ApiService, adapter: IAdapter<Lead>) {
    super(
      apiService,
      adapter,
      `${environment.baseApiUrl}${environment.tenantMgmtFacadeUrl}/leads`,
    );
  }
}
