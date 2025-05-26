import {ComponentFixture, TestBed} from '@angular/core/testing';
import {Router, ActivatedRoute} from '@angular/router';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {Location} from '@angular/common';
import {of} from 'rxjs';
import {TenantFacadeService} from '../../../shared/services/tenant-list-facade.service';
import {OnboardingTenantListComponent} from './onboarding-tenant-list.component';
import {APP_CONFIG} from '@project-lib/app-config';
import {GridApi} from 'ag-grid-community';
import {ThemeModule} from '@project-lib/theme/theme.module';
import {NbThemeModule} from '@nebular/theme';
import {AgGridModule} from 'ag-grid-angular';

describe('OnboardingTenantListComponent', () => {
  let component: OnboardingTenantListComponent;
  let fixture: ComponentFixture<OnboardingTenantListComponent>;
  let tenantFacadeService: jasmine.SpyObj<TenantFacadeService>;
  let router: jasmine.SpyObj<Router>;
  let mockGridApi: jasmine.SpyObj<GridApi>;

  const mockAppConfig = {
    baseApiUrl: 'https://api.example.com',
  };

  const mockTenantData = [
    {
      id: 1,
      name: 'Company A',
      firstName: 'John',
      lastName: 'Doe',
      email: 'john.doe@companyA.com',
      address: {
        zip: '12345',
        country: 'USA',
      },
      subscription: {
        plan: {
          name: 'Premium',
        },
        status: 'Active',
        startDate: '2022-01-01T00:00:00Z',
        endDate: '2023-01-01T00:00:00Z',
      },
    },
  ];

  beforeEach(async () => {
    const tenantFacadeServiceSpy = jasmine.createSpyObj('TenantFacadeService', [
      'getTenantDetails',
    ]);
    const routerSpy = jasmine.createSpyObj('Router', ['navigate']);
    const gridApiSpy = jasmine.createSpyObj('GridApi', [
      'setDatasource',
      'refreshCells',
    ]);

    await TestBed.configureTestingModule({
      declarations: [OnboardingTenantListComponent],
      imports: [
        HttpClientTestingModule,
        ThemeModule,
        NbThemeModule.forRoot(),
        AgGridModule,
      ],
      providers: [
        {provide: APP_CONFIG, useValue: mockAppConfig},
        {
          provide: TenantFacadeService,
          useValue: {
            getTenantDetails: jasmine
              .createSpy('getTenantDetails')
              .and.returnValue(of(mockTenantData)),
            getTotalTenant: jasmine
              .createSpy('getTotalTenant')
              .and.returnValue(of()),
          },
        },
        {provide: Router, useValue: routerSpy},
        {provide: GridApi, useValue: gridApiSpy},
        {
          provide: ActivatedRoute,
          useValue: {snapshot: {paramMap: {get: () => '1'}}},
        },
        Location,
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(OnboardingTenantListComponent);
    router = TestBed.inject(Router) as jasmine.SpyObj<Router>;
    mockGridApi = TestBed.inject(GridApi) as jasmine.SpyObj<GridApi>;
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
    expect(component.gridOptions.paginationPageSize).toBe(10);
    expect(component.gridOptions.rowHeight).toBe(60);
  });

  it('should navigate to tenant registration page', () => {
    component.registerTenantPage();
    expect(router.navigate).toHaveBeenCalledWith(['main/create-tenant']);
  });

  it('should handle error in `getPaginatedTenantDetails` method', () => {
    spyOn(console, 'error');
    (tenantFacadeService.getTenantDetails as jasmine.Spy).and.returnValue(
      of(undefined),
    );
    component.getPaginatedTenantDetails(1, 10).subscribe(data => {
      expect(console.error).toHaveBeenCalledWith(
        'Error processing response:',
        jasmine.anything(),
      );
      expect(data).toEqual([]);
    });
  });
});
