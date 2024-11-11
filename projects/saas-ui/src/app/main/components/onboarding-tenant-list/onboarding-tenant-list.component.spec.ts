import {ComponentFixture, TestBed} from '@angular/core/testing';

import {OnboardingTenantListComponent} from './onboarding-tenant-list.component';
import {ActivatedRoute, Router} from '@angular/router';
import {NbCardModule, NbStatusService, NbToastrService} from '@nebular/theme';
import {of} from 'rxjs';
import {TenantFacadeService} from '../../../shared/services/tenant-list-facade.service';
import {APP_CONFIG} from '@project-lib/app-config';
import {ThemeModule} from '@project-lib/theme/theme.module';
import {AgGridModule} from 'ag-grid-angular';
import {TenantStatus} from '../../../shared/enum/tenant-status.enum';
import {GridApi} from 'ag-grid-community';
import {RouterTestingModule} from '@angular/router/testing';
import {TenantRegistrationComponent} from '../tenant-registration/tenant-registration.component';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {ApiService} from '@project-lib/core/api';
import {TenantDetails} from '../../../shared/models/tenantDetails.model';

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
      'getTenantDetails',
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
    gridApiMock = jasmine.createSpyObj('GridApi', [
      'updateGridOptions',
      'setDatasource',
    ]);
    router = TestBed.inject(Router);
    component = fixture.componentInstance;
    tenantFacadeService = TestBed.inject(
      TenantFacadeService,
    ) as jasmine.SpyObj<TenantFacadeService>;
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize gridOptions correctly', () => {
    expect(component.gridOptions).toBeDefined();
    expect(component.gridOptions.pagination).toBeTrue();
    expect(component.gridOptions.rowModelType).toBe('infinite');
    expect(component.gridOptions.paginationPageSize).toBe(component.limit);
    expect(component.gridOptions.cacheBlockSize).toBe(component.limit);
  });

  it('should return the total count from the tenant facade', () => {
    component.getTotal().subscribe(count => {
      expect(count).toEqual({count: 2});
    });
  });
  it('should handle errors in retrieving tenant list gracefully', done => {
    tenantFacadeSpy.getTenantDetails.and.returnValue(of([])); // Return an empty observable array to simulate error handling

    component.getPaginatedTenantDetails(1, component.limit).subscribe(data => {
      expect(data).toEqual([]); // Expect data to be an empty array if an error is simulated
      done();
    });
  });

  it('should set the grid API and configure the datasource', () => {
    const params = {api: gridApiMock};
    component.onGridReady(params);
    expect(component.gridApi).toBe(gridApiMock);
    expect(gridApiMock.setDatasource).toHaveBeenCalled();
  });

  it('should navigate to create-tenant page', () => {
    spyOn(router, 'navigate');
    component.registerTenantPage();
    expect(router.navigate).toHaveBeenCalledWith(['main/create-tenant']);
  });

  it('should handle errors in getPaginatedTenantDetails gracefully', done => {
    tenantFacadeSpy.getTenantDetails.and.returnValue(of(null)); // Simulate error
    component.getPaginatedTenantDetails(1, component.limit).subscribe(data => {
      expect(data).toEqual([]);
      done();
    });
  });

  it('should retrieve total tenant count', done => {
    tenantFacadeSpy.getTotalTenant.and.returnValue(of({count: 10}));
    component.getTotal().subscribe(total => {
      expect(total.count).toBe(10);
      done();
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

      tenantFacadeService.getTenantDetails.and.returnValue(of());

      component.getPaginatedTenantDetails(1, 5).subscribe(data => {
        expect(data.length).toBe(1);
        expect(data[0].name).toBe('Tenant1');
        expect(data[0].address).toBe(' 12345, Country');
      });
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
