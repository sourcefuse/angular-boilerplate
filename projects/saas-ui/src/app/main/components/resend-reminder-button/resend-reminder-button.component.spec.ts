import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResendReminderButtonComponent } from './resend-reminder-button.component';

describe('ResendReminderButtonComponent', () => {
  let component: ResendReminderButtonComponent;
  let fixture: ComponentFixture<ResendReminderButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ResendReminderButtonComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ResendReminderButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
