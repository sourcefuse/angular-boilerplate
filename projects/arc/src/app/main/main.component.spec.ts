import {ComponentFixture, TestBed} from '@angular/core/testing';
import {RouterTestingModule} from '@angular/router/testing';
import {CoreModule} from '@project-lib/core/core.module';
import {ThemeModule} from '@project-lib/theme/theme.module';

import {MainComponent} from './main.component';
import {MainModule} from './main.module';
import {ActivatedRoute} from '@angular/router';
import {of} from 'rxjs';

describe('MainComponent', () => {
  let component: MainComponent;
  let fixture: ComponentFixture<MainComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MainComponent],
      imports: [
        MainModule,
        RouterTestingModule,
        CoreModule,
        ThemeModule.forRoot('boiler'),
      ],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {paramMap: of(new Map())}, // Mock ActivatedRoute
        },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
