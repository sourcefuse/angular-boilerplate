import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TranslationService } from '@boiler/core/localization';
import {
  TranslateFakeLoader,
  TranslateLoader,
  TranslateModule,
  TranslateService,
} from '@ngx-translate/core';

import { GanttTooltipComponent } from './gantt-tooltip.component';

describe('GanttTooltipComponent', () => {
  let component: GanttTooltipComponent;
  let fixture: ComponentFixture<GanttTooltipComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [GanttTooltipComponent],
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
    fixture = TestBed.createComponent(GanttTooltipComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
