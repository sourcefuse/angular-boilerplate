import {TestBed} from '@angular/core/testing';
import {ApiService, IAdapter, PostAPICommand} from '@project-lib/core/api';

import {Tenant} from '../../shared/models';
import {IAnyObject} from '@project-lib/core/i-any-object';
import {of} from 'rxjs';
import {AddTenantFromLeadCommand} from './add-tenant-lead.command';

describe('AddTenantFromLeadCommand', () => {
  let apiServiceMock: jasmine.SpyObj<ApiService>;
  let adapterMock: jasmine.SpyObj<IAdapter<Tenant>>;
  let appConfigMock: IAnyObject;
  let command: AddTenantFromLeadCommand<Tenant>;
  const leadId = 'testLeadId';

  beforeEach(() => {
    apiServiceMock = jasmine.createSpyObj('ApiService', ['post']);
    adapterMock = jasmine.createSpyObj('IAdapter', ['transform']);
    appConfigMock = {
      baseApiUrl: 'https://api.example.com',
      tenantMgmtFacadeUrl: '/tenants',
    };
    command = new AddTenantFromLeadCommand(
      apiServiceMock,
      adapterMock,
      leadId,
      appConfigMock,
    );
  });

  it('should create an instance of AddTenantFromLeadCommand', () => {
    expect(command).toBeTruthy();
  });

  it('should set parameters correctly', () => {
    const tenant: Tenant = {id: '1', name: 'Tenant 1'};
    command.parameters = {data: tenant};
    expect(command.parameters).toEqual({data: tenant});
  });
});
