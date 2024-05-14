import {ComponentFixture, TestBed} from '@angular/core/testing';

import {OnboardingTenantListComponent} from './onboarding-tenant-list.component';

describe('OnboardingTenantListComponent', () => {
  let component: OnboardingTenantListComponent;
  let fixture: ComponentFixture<OnboardingTenantListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [OnboardingTenantListComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(OnboardingTenantListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
