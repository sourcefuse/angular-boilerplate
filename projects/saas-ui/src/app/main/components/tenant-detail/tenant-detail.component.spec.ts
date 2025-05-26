import {ComponentFixture, TestBed} from '@angular/core/testing';
import {FormBuilder, ReactiveFormsModule} from '@angular/forms';
import {Router, ActivatedRoute} from '@angular/router';
import {throwError} from 'rxjs';
import {TenantFacadeService} from '../../../shared/services';
import {TenantDetailComponent} from './tenant-detail.component';
import {ThemeModule} from '@project-lib/theme/theme.module';
import {NbThemeModule} from '@nebular/theme';

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

  it('should navigate back to tenant list on backToPreviousPage', () => {
    component.backToPriviousPage();
    expect(routerSpy.navigate).toHaveBeenCalledWith([
      'main/onboard-tenant-list',
    ]);
  });
});
