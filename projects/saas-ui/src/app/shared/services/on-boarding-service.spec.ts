import {HttpHeaders, HttpParams} from '@angular/common/http';
import {TestBed} from '@angular/core/testing';
import {ApiService, BackendFilter} from '@project-lib/core/api';
import {AnyAdapter} from '@project-lib/core/api';
import {GetPlanAdapter} from '../../on-boarding/adapters';
import {VerifyEmailCommand} from '../../on-boarding/commands';
import {GetLeadByIdCommand} from '../../on-boarding/commands';
import {AddTenantFromLeadCommand} from '../../on-boarding/commands';
import {AddLeadCommand} from '../../on-boarding/commands';
import {GetLeadListCommand} from '../../on-boarding/commands';
import {GetTotalLeadCommand} from '../../main/commands/get-total-lead.command';
import {Address, Lead, Tenant} from '../models';
import {APP_CONFIG} from '@project-lib/app-config';
import {IAnyObject} from '@project-lib/core/i-any-object';
import {TenantLead} from '../models/tenantLead.model';
import {RegisterTenantCommand} from '../../main/commands/register-tenant.command';
import {OnBoardingService} from './on-boarding-service';
import {of} from 'rxjs';

describe('OnBoardingService', () => {
  let service: OnBoardingService;
  let apiService: ApiService;
  let anyAdapter: AnyAdapter;
  let getPlanAdapter: GetPlanAdapter;
  let appConfig: IAnyObject;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        OnBoardingService,
        {provide: ApiService, useValue: {}},
        {provide: AnyAdapter, useValue: {}},
        {provide: GetPlanAdapter, useValue: {}},
        {provide: APP_CONFIG, useValue: {}},
      ],
    });
    service = TestBed.inject(OnBoardingService);
    apiService = TestBed.inject(ApiService);
    anyAdapter = TestBed.inject(AnyAdapter);
    getPlanAdapter = TestBed.inject(GetPlanAdapter);
    appConfig = TestBed.inject(APP_CONFIG);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should call validateEmail command and return a response', () => {
    const code = 'validCode';
    const leadId = '123';
    const expectedResponse = {leadId, token: 'validToken'};

    spyOn(VerifyEmailCommand.prototype, 'execute').and.returnValue(
      of(expectedResponse),
    );

    service.validateEmail(code, leadId).subscribe(response => {
      expect(response).toEqual(expectedResponse);
    });
  });

  it('should call GetLeadByIdCommand and return lead details', () => {
    const leadId = '123';
    const expectedLead: Lead = {
      id: '123',
      firstName: 'John',
      lastName: 'Deo',
      companyName: 'SF',
      email: 'john.doe@example.com',
      isValidated: false,
      address: {country: 'USA'},
    };

    spyOn(GetLeadByIdCommand.prototype, 'execute').and.returnValue(
      of(expectedLead),
    );

    service.getLeadDetails(leadId).subscribe(lead => {
      expect(lead).toEqual(expectedLead);
    });
  });

  describe('addTenant', () => {
    it('should call AddTenantFromLeadCommand execute method and return a Tenant', () => {
      const tenant: Tenant = {id: '1', name: 'Test Tenant'};
      const leadId = 'testLeadId';
      const expectedTenant: Tenant = {id: '1', name: 'Test Tenant'};
      const commandSpy = spyOn(
        AddTenantFromLeadCommand.prototype,
        'execute',
      ).and.returnValue(of(expectedTenant));
      const result = service.addTenant(tenant, leadId);
      result.subscribe(response => {
        expect(commandSpy).toHaveBeenCalled();
        expect(response).toEqual(expectedTenant);
      });
    });
  });

  describe('registerTenant', () => {
    it('should call RegisterTenantCommand execute method and return a TenantLead', () => {
      const tenantLead: TenantLead = {
        name: 'Test Tenant',
        contact: {
          firstName: 'John',
          lastName: 'Doe',
          email: 'john.doe@example.com',
          isPrimary: true,
        },
        address: '123 Main St',
        city: 'Metropolis',
        state: 'NY',
        zip: 12345,
        country: 'USA',
        domains: ['example.com'],
        planId: 'plan123',
      };

      const expectedTenantLead: TenantLead = {
        name: 'Test Tenant',
        contact: {
          firstName: 'John',
          lastName: 'Doe',
          email: 'john.doe@example.com',
          isPrimary: true,
        },
        address: '123 Main St',
        city: 'Metropolis',
        state: 'NY',
        zip: 12345,
        country: 'USA',
        domains: ['example.com'],
        planId: 'plan123',
      };
      const commandSpy = spyOn(
        RegisterTenantCommand.prototype,
        'execute',
      ).and.returnValue(of(expectedTenantLead));
      const result = service.registerTenant(tenantLead);
      result.subscribe(response => {
        expect(commandSpy).toHaveBeenCalled();
        expect(response).toEqual(expectedTenantLead);
      });
    });
  });

  describe('addLead', () => {
    it('should call AddLeadCommand execute method and return a Lead', () => {
      const address: Address = {
        country: 'USA',
        city: 'Testville',
        state: 'TS',
        zip: '12345',
      };

      const lead: Lead = {
        firstName: 'John',
        lastName: 'Doe',
        companyName: 'Test Company',
        email: 'john.doe@example.com',
        isValidated: true,
        address: address,
        country: 'USA',
      };

      const expectedLead: Lead = {
        id: 'lead123',
        firstName: 'John',
        lastName: 'Doe',
        companyName: 'Test Company',
        email: 'john.doe@example.com',
        isValidated: true,
        address: address,
        country: 'USA',
      };
      const commandSpy = spyOn(
        AddLeadCommand.prototype,
        'execute',
      ).and.returnValue(of(expectedLead));
      const result = service.addLead(lead);
      result.subscribe(response => {
        expect(commandSpy).toHaveBeenCalled();
        expect(response).toEqual(expectedLead);
      });
    });
  });

  describe('getLeadList', () => {
    it('should call GetLeadListCommand execute method and return a list of leads', () => {
      const filter: BackendFilter<Lead> = {
        where: {country: 'USA'},
        offset: 0,
        limit: 10,
      };

      const backendFilter: BackendFilter<Lead> = {
        where: filter.where,
        offset: filter.offset,
        limit: filter.limit,
      };

      const expectedLeads: Lead[] = [
        {
          id: 'lead1',
          firstName: 'John',
          lastName: 'Doe',
          companyName: 'Test Company',
          email: 'john.doe@example.com',
          isValidated: true,
          address: {
            country: 'USA',
            city: 'Testville',
            state: 'TS',
            zip: '12345',
          },
          country: 'USA',
        },
        {
          id: 'lead2',
          firstName: 'Jane',
          lastName: 'Smith',
          companyName: 'Another Company',
          email: 'jane.smith@example.com',
          isValidated: true,
          address: {
            country: 'USA',
            city: 'Example City',
            state: 'EX',
            zip: '67890',
          },
          country: 'USA',
        },
      ];
      const commandSpy = spyOn(
        GetLeadListCommand.prototype,
        'execute',
      ).and.returnValue(of(expectedLeads));
      const result = service.getLeadList(filter);
      result.subscribe(response => {
        expect(commandSpy).toHaveBeenCalled();
        expect(commandSpy).toHaveBeenCalledWith();
        expect(response).toEqual(expectedLeads);
      });
      const params = new HttpParams().set(
        'filter',
        JSON.stringify(backendFilter),
      );
    });
  });
});
