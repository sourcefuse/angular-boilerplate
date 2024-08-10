import {TestBed} from '@angular/core/testing';
import {RouterTestingModule} from '@angular/router/testing';
import {ButtonRendererComponent} from './button-renderer.component';
import {ToasterService} from '@project-lib/theme/toaster';
import {BillingPlanService} from '../../../shared/services/billing-plan-service';
import {FormBuilder, Validators} from '@angular/forms';
import {Location} from '@angular/common';
import {GridApi} from 'ag-grid-community';
import {MainModule} from '../../main.module';
import {NbThemeModule, NbOverlayModule, NbOverlayService} from '@nebular/theme';
import {ThemeModule} from '@project-lib/theme/theme.module';

describe('ButtonRendererComponent', () => {
  let component: ButtonRendererComponent;
  let toastrService: ToasterService;
  let billingPlanService: BillingPlanService;
  let fb: FormBuilder;
  let location: Location;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule, MainModule, ThemeModule, NbOverlayModule],
      providers: [
        BillingPlanService,
        FormBuilder,
        Location,
        {
          provide: NbOverlayService,
          useValue: {snapshot: {params: {id: '1'}}},
        },
        {
          provide: ToasterService,
          useValue: {snapshot: {params: {id: '1'}}},
        },
      ],
      declarations: [ButtonRendererComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    const fixture = TestBed.createComponent(ButtonRendererComponent);
    component = fixture.componentInstance;
    toastrService = TestBed.inject(ToasterService);
    billingPlanService = TestBed.inject(BillingPlanService);
    fb = TestBed.inject(FormBuilder);
    location = TestBed.inject(Location);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize addPlanForm with default values', () => {
    expect(component.addPlanForm.value).toEqual({
      name: '',
      description: '',
      price: '',
      currencyId: '',
      billingCycleId: null,
      tier: null,
    });
  });

  it('should return true on refresh method', () => {
    const params = {} as any;
    const result = component.refresh(params);
    expect(result).toBeTrue();
  });

  it('should set gridApi on onGridReady method', () => {
    const params = {api: {}} as any;
    component.onGridReady(params);
    expect(component.gridApi).toEqual(params.api);
  });
});
