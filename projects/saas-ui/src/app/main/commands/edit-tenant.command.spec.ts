import {ApiService, IAdapter} from '@project-lib/core/api';
import {IAnyObject} from '@project-lib/core/i-any-object';
import {Tenant} from '../../shared/models/tenant.model';
import {of, throwError} from 'rxjs';
import {EditTenantCommand} from './edit-tenant.command';

describe('EditTenantCommand', () => {
  let editTenantCommand: EditTenantCommand<any>;
  let apiService: jasmine.SpyObj<ApiService>;
  let adapter: jasmine.SpyObj<IAdapter<any>>;
  let appConfig: IAnyObject;
  const tenantId = 'tenant123';
  const tenantData: Tenant = {
    id: tenantId,
    name: 'Tenant Test Name',
    description: 'A sample description for the tenant',
    // Include other necessary tenant fields here
  };

  beforeEach(() => {
    apiService = jasmine.createSpyObj<ApiService>('ApiService', ['patch']);
    adapter = jasmine.createSpyObj('IAdapter', ['adapt']);
    appConfig = jasmine.createSpyObj<IAnyObject>('IAnyObject', [
      'baseApiUrl',
      'tenantmgmtServiceUrl',
    ]);
    appConfig.baseApiUrl = 'https://api.example.com';
    appConfig.tenantmgmtServiceUrl = '/tenantmgmt';

    editTenantCommand = new EditTenantCommand(
      apiService,
      adapter,
      tenantId,
      appConfig,
    );
    editTenantCommand.data = tenantData;
  });

  it('should create an instance of EditTenantCommand', () => {
    expect(editTenantCommand).toBeTruthy();
  });
});
