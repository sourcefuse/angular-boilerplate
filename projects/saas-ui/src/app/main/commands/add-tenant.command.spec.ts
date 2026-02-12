import {ApiService, IAdapter, PostAPICommand} from '@project-lib/core/api';
import {Tenant} from '../../shared/models';
import {IAnyObject} from '@project-lib/core/i-any-object';
import {AddTenantCommand} from './add-tenant.command';

describe('AddTenantCommand', () => {
  let addTenantCommand: AddTenantCommand<Tenant>;
  let apiService: jasmine.SpyObj<ApiService>;
  let adapter: jasmine.SpyObj<IAdapter<Tenant>>;
  let appConfig: jasmine.SpyObj<IAnyObject>;

  beforeEach(() => {
    apiService = jasmine.createSpyObj<ApiService>('ApiService', ['post']);
    adapter = jasmine.createSpyObj('IAdapter', ['adapt']);
    appConfig = jasmine.createSpyObj<IAnyObject>('IAnyObject', [
      'baseApiUrl',
      'tenantmgmtServiceUrl',
    ]);
    appConfig.baseApiUrl = 'https://api.example.com';
    appConfig.tenantmgmtServiceUrl = '/tenant-management';

    addTenantCommand = new AddTenantCommand(apiService, adapter, appConfig);
  });

  it('should create an instance of AddTenantCommand', () => {
    expect(addTenantCommand).toBeTruthy();
  });
});
