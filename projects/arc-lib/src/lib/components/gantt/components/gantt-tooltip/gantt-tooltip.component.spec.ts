import {ComponentFixture, TestBed} from '@angular/core/testing';

import {GanttTooltipComponent} from './gantt-tooltip.component';

describe('GanttTooltipComponent', () => {
  let component: GanttTooltipComponent;
  let fixture: ComponentFixture<GanttTooltipComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [GanttTooltipComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(GanttTooltipComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
