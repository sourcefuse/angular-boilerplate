import {ComponentFixture, TestBed} from '@angular/core/testing';

import {OnboardingTenantListComponent} from './onboarding-tenant-list.component';
import {ActivatedRoute} from '@angular/router';
import {NbToastrService} from '@nebular/theme';
import {of} from 'rxjs';
import {TenantFacadeService} from '../../../shared/services';
import {ApiService} from '@project-lib/core/api';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {APP_CONFIG} from '@project-lib/app-config';

const mockAppConfig = {};
describe('OnboardingTenantListComponent', () => {
  let component: OnboardingTenantListComponent;
  let fixture: ComponentFixture<OnboardingTenantListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [OnboardingTenantListComponent],
      imports: [HttpClientTestingModule],
      providers: [
        NbToastrService,
        ApiService,
        {provide: APP_CONFIG, useValue: mockAppConfig},

        {
          provide: ActivatedRoute,
          useValue: {paramMap: of(new Map())}, // Mock ActivatedRoute
        },
        {
          provide: TenantFacadeService,
          useValue: {paramMap: of(new Map())},
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(OnboardingTenantListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
