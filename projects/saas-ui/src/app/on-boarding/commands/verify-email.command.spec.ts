import {IApiService, IAdapter, PostAPICommand} from '@project-lib/core/api';
import {IAnyObject} from '@project-lib/core/i-any-object';
import {Observable} from 'rxjs';
import {VerifyEmailCommand} from './verify-email.command';

class MockApiService implements IApiService {
  get(url: string, options?: object): Observable<any> {
    throw new Error('Method not implemented.');
  }
  post(url: string, payload: any, options?: object): Observable<any> {
    throw new Error('Method not implemented.');
  }
  patch(url: string, payload: any, options?: object): Observable<any> {
    throw new Error('Method not implemented.');
  }
  put(url: string, payload: any, options?: object): Observable<any> {
    throw new Error('Method not implemented.');
  }
  delete(url: string, options?: object): Observable<any> {
    throw new Error('Method not implemented.');
  }
}
class MockAdapter<T> implements IAdapter<T> {
  adaptToModel(resp: any): T {
    throw new Error('Method not implemented.');
  }
  adaptFromModel(data: Partial<T>) {
    throw new Error('Method not implemented.');
  }
}

describe('VerifyEmailCommand', () => {
  let apiService: IApiService;
  let adapter: IAdapter<any>;
  let appConfig: IAnyObject;
  let leadId: string;

  beforeEach(() => {
    apiService = new MockApiService();
    adapter = new MockAdapter();
    leadId = '12345';
    appConfig = {
      baseApiUrl: 'https://api.example.com',
      tenantMgmtFacadeUrl: '/tenant-management',
    };
  });

  it('should create an instance of VerifyEmailCommand', () => {
    const command = new VerifyEmailCommand(
      apiService,
      adapter,
      leadId,
      appConfig,
    );
    expect(command).toBeTruthy();
    expect(command).toBeInstanceOf(PostAPICommand);
  });

  it('should set parameters correctly', () => {
    const command = new VerifyEmailCommand(
      apiService,
      adapter,
      leadId,
      appConfig,
    );
    command.parameters = {key: 'value'}; // Example parameters
    expect(command.parameters).toEqual({key: 'value'});
  });
});
