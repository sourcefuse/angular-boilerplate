import {ApiService, IAdapter} from '@project-lib/core/api';
import {GetListAPICommand} from '../../shared /auth/commands';
import {environment} from 'projects/saas-ui/src/environment';
import {Lead} from '../models';
import {Observable} from 'rxjs';

export class GetLeadListCommand<T> extends GetListAPICommand<Lead> {
  execute(): Observable<any> {
    throw new Error('Method not implemented.');
  }
  constructor(apiService: ApiService, adapter: IAdapter<Lead>) {
    super(
      apiService,
      adapter,
      `${environment.baseApiUrl}/${environment.userServiceUrl}/leads`,
    );
  }
}
