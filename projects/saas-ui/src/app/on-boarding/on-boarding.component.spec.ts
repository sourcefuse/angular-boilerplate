import {ComponentFixture, TestBed} from '@angular/core/testing';

import {OnBoardingComponent} from './on-boarding.component';
import {NbLayoutModule} from '@nebular/theme';
import {ThemeModule} from '@project-lib/theme/theme.module';

describe('OnBoardingComponent', () => {
  let component: OnBoardingComponent;
  let fixture: ComponentFixture<OnBoardingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [OnBoardingComponent],
      imports: [NbLayoutModule, ThemeModule],
    }).compileComponents();

    fixture = TestBed.createComponent(OnBoardingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
