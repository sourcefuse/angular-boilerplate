import {ApiService, IAdapter} from '@project-lib/core/api';
import {IAnyObject} from '@project-lib/core/i-any-object';
import {of, throwError} from 'rxjs';
import {GetTenantByIdCommand} from './get-tenant-by-id.command';

describe('GetTenantByIdCommand', () => {
  let getTenantByIdCommand: GetTenantByIdCommand<any>;
  let apiService: jasmine.SpyObj<ApiService>;
  let adapter: jasmine.SpyObj<IAdapter<any>>;
  let appConfig: IAnyObject;
  const tenantId = 'tenant123';
  const mockTenantData = {
    id: tenantId,
    name: 'Tenant Name',
    address: '123 Main St',
  };

  beforeEach(() => {
    apiService = jasmine.createSpyObj<ApiService>('ApiService', ['get']);
    adapter = jasmine.createSpyObj('IAdapter', ['adapt']);
    appConfig = {
      baseApiUrl: 'https://api.example.com',
      tenantmgmtServiceUrl: '/tenantmgmt',
    };

    getTenantByIdCommand = new GetTenantByIdCommand(
      apiService,
      adapter,
      tenantId,
      appConfig,
    );
  });

  it('should create an instance of GetTenantByIdCommand', () => {
    expect(getTenantByIdCommand).toBeTruthy();
  });

  it('should handle errors from the ApiService', done => {
    const errorResponse = new Error('API error');
    apiService.get.and.returnValue(throwError(() => errorResponse));

    getTenantByIdCommand.execute().subscribe({
      next: () => done.fail('Expected an error, but got success'),
      error: error => {
        expect(error).toBe(errorResponse);
        done();
      },
    });
  });
});
