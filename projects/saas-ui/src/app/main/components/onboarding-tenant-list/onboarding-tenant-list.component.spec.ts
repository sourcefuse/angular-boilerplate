import {ComponentFixture, TestBed} from '@angular/core/testing';

import {OnboardingTenantListComponent} from './onboarding-tenant-list.component';
import {ActivatedRoute, Router} from '@angular/router';
import {NbCardModule, NbStatusService, NbToastrService} from '@nebular/theme';
import {of} from 'rxjs';
import {TenantFacadeService} from '../../../shared/services/tenant-list-facade.service';
import {OnboardingTenantListComponent} from './onboarding-tenant-list.component';
import {APP_CONFIG} from '@project-lib/app-config';
import {ThemeModule} from '@project-lib/theme/theme.module';
import {AgGridModule} from 'ag-grid-angular';
import {TenantStatus} from '../../../shared/enum/tenant-status.enum';
import {GridApi} from 'ag-grid-community';
import {RouterTestingModule} from '@angular/router/testing';
import {TenantRegistrationComponent} from '../tenant-registration/tenant-registration.component';

const mockAppConfig = {baseApiUrl: 'https://api.example.com/'};
describe('OnboardingTenantListComponent', () => {
  let component: OnboardingTenantListComponent;
  let fixture: ComponentFixture<OnboardingTenantListComponent>;
  let tenantFacadeService: jasmine.SpyObj<TenantFacadeService>;
  let router: Router;
  let routerSpy: jasmine.SpyObj<Router>;
  let tenantFacadeSpy: jasmine.SpyObj<TenantFacadeService>;
  let gridApiMock: jasmine.SpyObj<GridApi>;

  beforeEach(async () => {
    tenantFacadeSpy = jasmine.createSpyObj('TenantFacadeService', [
      'getTenantList',
      'getTotalTenant',
    ]);
    routerSpy = jasmine.createSpyObj('Router', ['navigate']);
    // Define what the spy should return when the methods are called
    tenantFacadeSpy.getTenantList.and.returnValue(
      of([
        {
          name: 'Company A',
          key: 'company-a',
          domains: ['domain1.com'],
          address: {zip: '12345', country: 'USA'},
          status: TenantStatus.ACTIVE,
        },
        {
          name: 'Company B',
          key: 'company-b',
          domains: ['domain2.com'],
          address: {zip: '67890', country: 'Canada'},
          status: TenantStatus.INACTIVE,
        },
      ]),
    );
    tenantFacadeSpy.getTotalTenant.and.returnValue(of({count: 2}));

    await TestBed.configureTestingModule({
      declarations: [OnboardingTenantListComponent],
      imports: [
        HttpClientTestingModule,
        ThemeModule,
        NbCardModule,
        AgGridModule,
        RouterTestingModule.withRoutes([
          {
            path: 'main/create-tenant',
            component: TenantRegistrationComponent,
          },
        ]),
      ],
      providers: [
        NbToastrService,
        NbStatusService,
        ApiService,
        {provide: APP_CONFIG, useValue: mockAppConfig},
        {
          provide: ActivatedRoute,
          useValue: {paramMap: of(new Map())},
        },
        {provide: TenantFacadeService, useValue: tenantFacadeSpy},
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(OnboardingTenantListComponent);
    tenantFacadeService = TestBed.inject(
      TenantFacadeService,
    ) as jasmine.SpyObj<TenantFacadeService>;
    gridApiMock = jasmine.createSpyObj('GridApi', ['updateGridOptions']);
    router = TestBed.inject(Router);
    component = fixture.componentInstance;
    tenantFacadeService = TestBed.inject(
      TenantFacadeService,
    ) as jasmine.SpyObj<TenantFacadeService>;
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize grid options correctly', () => {
    expect(component.gridOptions.pagination).toBe(true);
    expect(component.gridOptions.rowModelType).toBe('infinite');
    expect(component.gridOptions.paginationPageSize).toBe(component.limit);
    expect(component.gridOptions.paginationPageSizeSelector).toEqual([
      component.limit,
      10,
      20,
      50,
      100,
    ]);
  });

  it('should transform and paginate data correctly', () => {
    component.getPaginatedTenants(1, component.limit).subscribe(data => {
      expect(data).toEqual([
        {
          name: 'Company A',
          key: 'company-a',
          domains: 'domain1.com',
          address: ' 12345, USA',
          status: 'ACTIVE',
        },
        {
          name: 'Company B',
          key: 'company-b',
          domains: 'domain2.com',
          address: ' 67890, Canada',
          status: 'INACTIVE',
        },
      ]);
    });
  });

  it('should return the total count from the tenant facade', () => {
    component.getTotal().subscribe(count => {
      expect(count).toEqual({count: 2});
    });
  });

  describe('onGridReady', () => {
    it('should set the grid API and configure the datasource', () => {
      const params = {api: gridApiMock};
      component.onGridReady(params);
      expect(component.gridApi).toBe(gridApiMock);
      expect(gridApiMock.updateGridOptions).toHaveBeenCalled();
    });
  });

  describe('getPaginatedTenants', () => {
    it('should fetch and map tenant data correctly', () => {
      const mockTenants = [
        {
          name: 'Tenant1',
          key: 'tenant1',
          domains: ['example.com'],
          address: {
            zip: '12345',
            country: 'Country',
          },
          status: 'ACTIVE',
        },
      ];

      tenantFacadeService.getTenantList.and.returnValue(of(mockTenants));

      component.getPaginatedTenants(1, 5).subscribe(data => {
        expect(data.length).toBe(1);
        expect(data[0].name).toBe('Tenant1');
        expect(data[0].address).toBe(' 12345, Country');
      });
    });
  });

  describe('createCompanyLink', () => {
    it('should create a company link correctly', () => {
      const params = {data: {key: 'tenant1'}, value: 'Company1'};
      const link = component.createCompanyLink(params);
      console.log(link);
      expect(link).toBe(
        '<a href="https://tenant1.api.example.com/" target="_blank" class="company-link">Company1</a>',
      );
    });
  });

  describe('registerTenantPage', () => {
    it('should navigate to create-tenant page', () => {
      spyOn(router, 'navigate');
      component.registerTenantPage();
      expect(router.navigate).toHaveBeenCalledWith(['main/create-tenant']);
    });
  });
});
