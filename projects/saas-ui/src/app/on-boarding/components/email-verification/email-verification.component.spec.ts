import {ComponentFixture, TestBed} from '@angular/core/testing';

import {EmailVerificationComponent} from './email-verification.component';
import {ThemeModule} from '@project-lib/theme/theme.module';
import {NbStatusService} from '@nebular/theme';

describe('EmailVerificationComponent', () => {
  let component: EmailVerificationComponent;
  let fixture: ComponentFixture<EmailVerificationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EmailVerificationComponent],
      imports: [ThemeModule],
      providers: [NbStatusService],
    }).compileComponents();

    fixture = TestBed.createComponent(EmailVerificationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
