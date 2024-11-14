import {ComponentFixture, TestBed} from '@angular/core/testing';
import {FormBuilder, ReactiveFormsModule} from '@angular/forms';
import {Router, ActivatedRoute} from '@angular/router';
import {of, throwError} from 'rxjs';
import {TenantFacadeService} from '../../../shared/services';
import {TenantDetailComponent} from './tenant-detail.component';
import {ThemeModule} from '@project-lib/theme/theme.module';
import {NbThemeModule} from '@nebular/theme';
import {TenantDetails} from '../../../shared/models/tenantDetails.model';

describe('TenantDetailComponent', () => {
  let component: TenantDetailComponent;
  let fixture: ComponentFixture<TenantDetailComponent>;
  let tenantFacadeService: jasmine.SpyObj<TenantFacadeService>;
  let routerSpy: jasmine.SpyObj<Router>;
  let route: ActivatedRoute;

  beforeEach(async () => {
    const tenantFacadeSpy = jasmine.createSpyObj('TenantFacadeService', [
      'getTenantDetails',
    ]);
    const routerMock = jasmine.createSpyObj('Router', ['navigate']);

    await TestBed.configureTestingModule({
      declarations: [TenantDetailComponent],
      imports: [ReactiveFormsModule, ThemeModule, NbThemeModule.forRoot()],
      providers: [
        FormBuilder,
        {provide: TenantFacadeService, useValue: tenantFacadeSpy},
        {provide: Router, useValue: routerMock},
        {
          provide: ActivatedRoute,
          useValue: {snapshot: {paramMap: {get: () => '1'}}},
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(TenantDetailComponent);
    component = fixture.componentInstance;
    tenantFacadeService = TestBed.inject(
      TenantFacadeService,
    ) as jasmine.SpyObj<TenantFacadeService>;
    routerSpy = TestBed.inject(Router) as jasmine.SpyObj<Router>;
    route = TestBed.inject(ActivatedRoute);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should handle errors when fetching tenant data', () => {
    const error = new Error('Failed to load data');
    tenantFacadeService.getTenantDetails.and.returnValue(throwError(error));
    spyOn(console, 'error');
    fixture.detectChanges();
    expect(tenantFacadeService.getTenantDetails).toHaveBeenCalled();
    expect(console.error).toHaveBeenCalledWith(
      'Error fetching tenant data:',
      error,
    );
  });

  it('should load tenant data successfully', () => {
    const tenantData: TenantDetails = {
      id: '1',
      firstName: 'John',
      lastName: 'Doe',
      name: 'John Doe',
      email: 'john.doe@example.com',
      address: {
        country: 'USA',
        city: '',
        state: '',
        zip: '',
      },
      subscription: {
        plan: {
          name: 'Premium',
          price: 99.99,
          description: '',
          tier: '1',
        },
        startDate: new Date('2023-01-01'),
        endDate: new Date('2023-12-31'),
      },
      status: 0,
      key: 'er45',
    };
    tenantFacadeService.getTenantDetails.and.returnValue(of([tenantData]));
    fixture.detectChanges();
    expect(tenantFacadeService.getTenantDetails).toHaveBeenCalledWith({
      where: {id: '1'},
    });
    expect(component.tenantDetailForm.value).toEqual({
      tenantName: 'John Doe',
      name: 'John Doe',
      email: 'john.doe@example.com',
      country: 'USA',
      planName: 'Premium',
      startDate: '01/01/2023',
      endDate: '31/12/2023',
      price: 99.99,
      tier: '',
    });
  });

  it('should navigate back to tenant list on backToPreviousPage', () => {
    component.backToPriviousPage();
    expect(routerSpy.navigate).toHaveBeenCalledWith([
      'main/onboard-tenant-list',
    ]);
  });
});
