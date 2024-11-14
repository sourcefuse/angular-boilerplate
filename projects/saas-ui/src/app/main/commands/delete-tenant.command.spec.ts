import {ApiService, IAdapter} from '@project-lib/core/api';
import {IAnyObject} from '@project-lib/core/i-any-object';
import {of, throwError} from 'rxjs';
import {DeleteTenantCommand} from './delete-tenant.command';

describe('DeleteTenantCommand', () => {
  let deleteTenantCommand: DeleteTenantCommand<any>;
  let apiService: jasmine.SpyObj<ApiService>;
  let adapter: jasmine.SpyObj<IAdapter<any>>;
  let appConfig: jasmine.SpyObj<IAnyObject>;
  const tenantId = 'tenant123';

  beforeEach(() => {
    apiService = jasmine.createSpyObj<ApiService>('ApiService', ['delete']);
    adapter = jasmine.createSpyObj('IAdapter', ['adapt']);
    appConfig = jasmine.createSpyObj<IAnyObject>('IAnyObject', [
      'baseApiUrl',
      'tenantmgmtServiceUrl',
    ]);
    appConfig.baseApiUrl = 'https://api.example.com';
    appConfig.tenantmgmtServiceUrl = '/tenantmgmt';

    deleteTenantCommand = new DeleteTenantCommand(
      apiService,
      adapter,
      tenantId,
      appConfig,
    );
  });

  it('should create an instance of DeleteTenantCommand', () => {
    expect(deleteTenantCommand).toBeTruthy();
  });

  it('should handle errors from the ApiService', done => {
    const errorResponse = new Error('API error');
    apiService.delete.and.returnValue(throwError(() => errorResponse));

    deleteTenantCommand.execute().subscribe({
      next: () => done.fail('Expected an error, but got success'),
      error: error => {
        expect(error).toBe(errorResponse);
        done();
      },
    });
  });
});
