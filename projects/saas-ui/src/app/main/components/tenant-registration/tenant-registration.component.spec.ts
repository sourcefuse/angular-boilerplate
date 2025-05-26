import {ComponentFixture, TestBed} from '@angular/core/testing';

import {TenantRegistrationComponent} from './tenant-registration.component';

describe('TenantRegistrationComponent', () => {
  let component: TenantRegistrationComponent;
  let fixture: ComponentFixture<TenantRegistrationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TenantRegistrationComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TenantRegistrationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
