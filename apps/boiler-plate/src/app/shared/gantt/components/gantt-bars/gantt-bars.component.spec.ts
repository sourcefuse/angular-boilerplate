import {ComponentFixture, TestBed} from '@angular/core/testing';
import {By} from '@angular/platform-browser';
import {AnyObject} from '@boiler/core/api/backend-filter';
import {TranslationService} from '@boiler/core/localization';
import {
  TranslateFakeLoader,
  TranslateLoader,
  TranslateModule,
  TranslateService,
} from '@ngx-translate/core';
import {GanttBarsComponent} from './gantt-bars.component';

describe('GanttBarsComponent', () => {
  let component: GanttBarsComponent<AnyObject>;
  let fixture: ComponentFixture<GanttBarsComponent<AnyObject>>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [GanttBarsComponent],
      providers: [TranslateService, TranslationService],
      imports: [
        TranslateModule.forRoot({
          loader: {
            provide: TranslateLoader,
            useClass: TranslateFakeLoader,
          },
        }),
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GanttBarsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
