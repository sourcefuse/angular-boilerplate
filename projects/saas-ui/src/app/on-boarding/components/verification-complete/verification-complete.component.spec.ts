import {ComponentFixture, TestBed} from '@angular/core/testing';

import {VerificationCompleteComponent} from './verification-complete.component';
import {ThemeModule} from '@project-lib/theme/theme.module';
import {NbStatusService} from '@nebular/theme';

describe('VerificationCompleteComponent', () => {
  let component: VerificationCompleteComponent;
  let fixture: ComponentFixture<VerificationCompleteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [VerificationCompleteComponent],
      imports: [ThemeModule],
      providers: [NbStatusService],
    }).compileComponents();

    fixture = TestBed.createComponent(VerificationCompleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
