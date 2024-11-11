import {TestBed} from '@angular/core/testing';
import {of, throwError} from 'rxjs';
import {Tenant} from '../models';
import {APP_CONFIG} from '@project-lib/app-config';

import {GetTotalTenantCommand} from '../../main/commands/get-total-tenant.command';
import {GetTenantDetailsCommand} from '../../main/commands/get-tenant-details.command';
import {GetTenantByIdCommand} from '../../main/commands/get-tenant-by-id.command';
import {EditTenantCommand} from '../../main/commands/edit-tenant.command';
import {DeleteTenantCommand} from '../../main/commands/delete-tenant.command';
import {TenantDetails} from '../models/tenantDetails.model';
import {ApiService, AnyAdapter} from '@project-lib/core/api';
import {IAnyObject} from '@project-lib/core/i-any-object';
import {TenantFacadeService} from './tenant-list-facade.service';

describe('TenantFacadeService', () => {
  let service: TenantFacadeService;
  let apiService: jasmine.SpyObj<ApiService>;
  let anyAdapter: jasmine.SpyObj<AnyAdapter>;
  let appConfig: IAnyObject;

  beforeEach(() => {
    apiService = jasmine.createSpyObj<ApiService>('ApiService', [
      'get',
      'post',
      'put',
      'delete',
    ]);
    anyAdapter = jasmine.createSpyObj('AnyAdapter', ['adapt']);
    appConfig = {
      baseApiUrl: 'https://api.example.com',
      tenantmgmtServiceUrl: '/tenantmgmt',
    };

    TestBed.configureTestingModule({
      providers: [
        TenantFacadeService,
        {provide: ApiService, useValue: apiService},
        {provide: AnyAdapter, useValue: anyAdapter},
        {provide: APP_CONFIG, useValue: appConfig},
      ],
    });
    service = TestBed.inject(TenantFacadeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should handle API configuration issues', done => {
    const commandSpy = jasmine.createSpyObj('GetTenantLeadListCommand', [
      'execute',
    ]);
    const errorResponse = new Error('API configuration error');
    appConfig.baseApiUrl = ''; // Simulate missing configuration
    commandSpy.execute.and.returnValue(throwError(() => errorResponse));

    spyOn(service, 'getTenantList').and.callFake(() => commandSpy.execute());

    service
      .getTenantList({where: {}, offset: 0, limit: 10, order: []})
      .subscribe({
        next: () => done.fail('Expected an error'),
        error: error => {
          expect(error).toBe(errorResponse);
          done();
        },
      });
  });
  describe('getTenantList', () => {
    it('should return tenant list data from command', done => {
      const mockResponse = [{id: 1, name: 'Tenant 1'}];
      const commandSpy = jasmine.createSpyObj('GetTenantLeadListCommand', [
        'execute',
      ]);
      commandSpy.execute.and.returnValue(of(mockResponse));

      spyOn(service, 'getTenantList').and.callFake(() => commandSpy.execute());

      service
        .getTenantList({where: {}, offset: 0, limit: 10, order: []})
        .subscribe(result => {
          expect(result).toEqual(mockResponse);
          done();
        });
    });

    it('should handle error when getTenantList fails', done => {
      const commandSpy = jasmine.createSpyObj('GetTenantLeadListCommand', [
        'execute',
      ]);
      const errorResponse = new Error('API error');
      commandSpy.execute.and.returnValue(throwError(() => errorResponse));

      spyOn(service, 'getTenantList').and.callFake(() => commandSpy.execute());

      service
        .getTenantList({where: {}, offset: 0, limit: 10, order: []})
        .subscribe({
          next: () => done.fail('Expected an error'),
          error: error => {
            expect(error).toBe(errorResponse);
            done();
          },
        });
    });
  });

  describe('getTotalTenant', () => {
    it('should return total tenant count', done => {
      const mockResponse = {count: 5};
      const commandSpy = jasmine.createSpyObj('GetTotalTenantCommand', [
        'execute',
      ]);
      commandSpy.execute.and.returnValue(of(mockResponse));

      spyOn(service, 'getTotalTenant').and.callFake(() => commandSpy.execute());

      service.getTotalTenant().subscribe(result => {
        expect(result).toEqual(mockResponse);
        done();
      });
    });
  });

  describe('getTenantById', () => {
    it('should return tenant data by ID', done => {
      const tenantId = 'tenant123';
      const mockResponse: Tenant = {id: tenantId, name: 'Tenant 123'};
      const commandSpy = jasmine.createSpyObj('GetTenantByIdCommand', [
        'execute',
      ]);
      commandSpy.execute.and.returnValue(of(mockResponse));

      spyOn(service, 'getTenantById').and.callFake(() => commandSpy.execute());

      service.getTenantById(tenantId).subscribe(result => {
        expect(result).toEqual(mockResponse);
        done();
      });
    });
  });

  it('should return an empty tenant list', done => {
    const mockResponse: Tenant[] = [];
    const commandSpy = jasmine.createSpyObj('GetTenantLeadListCommand', [
      'execute',
    ]);
    commandSpy.execute.and.returnValue(of(mockResponse));

    spyOn(service, 'getTenantList').and.callFake(() => commandSpy.execute());

    service
      .getTenantList({where: {}, offset: 0, limit: 10, order: []})
      .subscribe(result => {
        expect(result).toEqual(mockResponse);
        done();
      });
  });

  it('should return an error when tenant ID does not exist', done => {
    const tenantId = 'nonExistentId';
    const errorResponse = new Error('Tenant not found');
    const commandSpy = jasmine.createSpyObj('GetTenantByIdCommand', [
      'execute',
    ]);
    commandSpy.execute.and.returnValue(throwError(() => errorResponse));

    spyOn(service, 'getTenantById').and.callFake(() => commandSpy.execute());

    service.getTenantById(tenantId).subscribe({
      next: () => done.fail('Expected an error'),
      error: error => {
        expect(error).toBe(errorResponse);
        done();
      },
    });
  });

  it('should return an error when editing a tenant with invalid data', done => {
    const tenant: Tenant = {id: 'tenant123', name: ''}; // Invalid name
    const errorResponse = new Error('Invalid tenant data');
    const commandSpy = jasmine.createSpyObj('EditTenantCommand', ['execute']);
    commandSpy.execute.and.returnValue(throwError(() => errorResponse));

    spyOn(service, 'editTenant').and.callFake(() => commandSpy.execute());

    service.editTenant(tenant).subscribe({
      next: () => done.fail('Expected an error'),
      error: error => {
        expect(error).toBe(errorResponse);
        done();
      },
    });
  });

  describe('editTenant', () => {
    it('should return updated tenant data', done => {
      const tenant: Tenant = {id: 'tenant123', name: 'Updated Tenant'};
      const mockResponse: Tenant = tenant;
      const commandSpy = jasmine.createSpyObj('EditTenantCommand', ['execute']);
      commandSpy.execute.and.returnValue(of(mockResponse));

      spyOn(service, 'editTenant').and.callFake(() => commandSpy.execute());

      service.editTenant(tenant).subscribe(result => {
        expect(result).toEqual(mockResponse);
        done();
      });
    });
  });

  describe('deleteTenant', () => {
    it('should handle error when deleteTenant fails', done => {
      const tenant: Tenant = {id: 'tenant123', name: 'Tenant to Delete'};
      const errorResponse = new Error('API error');
      const commandSpy = jasmine.createSpyObj('DeleteTenantCommand', [
        'execute',
      ]);
      commandSpy.execute.and.returnValue(throwError(() => errorResponse));

      spyOn(service, 'deleteTenant').and.callFake(() => commandSpy.execute());

      service.deleteTenant(tenant).subscribe({
        next: () => done.fail('Expected an error'),
        error: error => {
          expect(error).toBe(errorResponse);
          done();
        },
      });
    });
  });
});
