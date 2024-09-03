import {ComponentFixture, TestBed} from '@angular/core/testing';

import {OnBoardingComponent} from './on-boarding.component';
import {NbLayoutModule, NbThemeModule} from '@nebular/theme';
import {ThemeModule} from '@project-lib/theme/theme.module';
import {RouterTestingModule} from '@angular/router/testing';

describe('OnBoardingComponent', () => {
  let component: OnBoardingComponent;
  let fixture: ComponentFixture<OnBoardingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [OnBoardingComponent],
      imports: [
        NbLayoutModule,
        ThemeModule,
        NbThemeModule.forRoot(),
        RouterTestingModule,
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(OnBoardingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
