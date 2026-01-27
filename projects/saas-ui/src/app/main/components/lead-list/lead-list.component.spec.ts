import {ComponentFixture, TestBed} from '@angular/core/testing';

import {LeadListComponent} from './lead-list.component';
import {ActivatedRoute} from '@angular/router';
import {NbCardModule, NbStatusService, NbToastrService} from '@nebular/theme';
import {of} from 'rxjs';
import {ApiService} from '@project-lib/core/api/api.service';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {OnBoardingService} from '../../../shared/services';
import {RouterTestingModule} from '@angular/router/testing';
import {BrowserModule} from '@angular/platform-browser';
import {ThemeModule} from '@project-lib/theme/theme.module';
import {AgGridModule} from 'ag-grid-angular';
import {GridApi, IGetRowsParams} from 'ag-grid-community';

describe('TenantComponent', () => {
  let component: LeadListComponent;
  let fixture: ComponentFixture<LeadListComponent>;
  let onboardingService: jasmine.SpyObj<OnBoardingService>;
  let mockGridApi: jasmine.SpyObj<GridApi>;

  beforeEach(async () => {
    // const onboardingServiceSpy = jasmine.createSpyObj('OnBoardingService', ['getLeadList', 'getTotalLead']);
    onboardingService = jasmine.createSpyObj('OnBoardingService', [
      'getLeadList',
      'getTotalLead',
    ]);
    mockGridApi = jasmine.createSpyObj('GridApi', ['setDatasource']);
    onboardingService.getTotalLead.and.returnValue(of({count: 2}));
    onboardingService.getLeadList.and.returnValue(
      of([
        {
          firstName: 'John',
          lastName: 'Doe',
          companyName: 'Company A',
          email: 'john.doe@example.com',
          isValidated: false,
          address: {country: 'USA'},
        },
        {
          firstName: 'Jane',
          lastName: 'Doe',
          companyName: 'Company B',
          email: 'jane.doe@example.com',
          isValidated: true,
          address: {country: 'Canada'},
        },
      ]),
    );

    await TestBed.configureTestingModule({
      declarations: [LeadListComponent],
      imports: [
        RouterTestingModule,
        HttpClientTestingModule,
        NbCardModule,
        ThemeModule,
        AgGridModule,
      ],
      providers: [
        NbStatusService,
        NbToastrService,
        ApiService,
        {
          provide: ActivatedRoute,
          useValue: {paramMap: of(new Map())},
        },
        {provide: OnBoardingService, useValue: onboardingService},
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(LeadListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set up grid options correctly on initialization', () => {
    expect(component.gridOptions).toBeDefined();
    expect(component.gridOptions.paginationPageSize).toBe(component.limit);
    expect(component.gridOptions.paginationPageSizeSelector).toEqual([
      component.limit,
      10,
      20,
      50,
      100,
    ]);
  });

  it('should set the datasource on grid ready', () => {
    const params = {api: mockGridApi} as any;
    component.onGridReady(params);
    expect(component.gridApi.setDatasource).toHaveBeenCalled();
  });

  it('should call getPaginatedLeads and getTotal on getRows', () => {
    const params: IGetRowsParams = {
      startRow: 0,
      endRow: component.limit,
      successCallback: jasmine.createSpy(),
      failCallback: jasmine.createSpy(),
    } as any;

    onboardingService.getLeadList.and.returnValue(of([]));
    onboardingService.getTotalLead.and.returnValue(of({count: 0}));

    component.onGridReady({api: mockGridApi});
    const dataSource = mockGridApi.setDatasource.calls.mostRecent().args[0];
    dataSource.getRows(params);

    expect(onboardingService.getLeadList).toHaveBeenCalled();
    expect(onboardingService.getTotalLead).toHaveBeenCalled();
  });

  it('should return paginated leads on getPaginatedLeads', () => {
    const mockLeads = [
      {
        firstName: 'John',
        lastName: 'Doe',
        companyName: 'ABC Corp',
        email: 'john.doe@example.com',
        isValidated: false,
        address: {country: 'USA'},
      },
    ];

    onboardingService.getLeadList.and.returnValue(of(mockLeads));

    component.getPaginatedLeads(1, 5).subscribe(leads => {
      expect(leads.length).toBe(1);
      expect(leads[0].firstName).toBe('John');
      expect(leads[0].country).toBe('USA');
    });
  });

  it('should correctly transform and paginate data', () => {
    component.getPaginatedLeads(1, component.limit).subscribe(data => {
      expect(data).toEqual([
        {
          firstName: 'John',
          lastName: 'Doe',
          companyName: 'Company A',
          email: 'john.doe@example.com',
          country: 'USA',
        },
        {
          firstName: 'Jane',
          lastName: 'Doe',
          companyName: 'Company B',
          email: 'jane.doe@example.com',
          country: 'Canada',
        },
      ]);
    });
  });

  it('should get total count from OnBoardingService', () => {
    component.getTotal().subscribe(count => {
      expect(count.count).toBeGreaterThan(0);
    });
  });
});
