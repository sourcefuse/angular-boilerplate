import {ComponentFixture, TestBed} from '@angular/core/testing';

import {GanttBarsComponent} from './gantt-bars.component';

describe('GanttBarsComponent', () => {
  let component: GanttBarsComponent;
  let fixture: ComponentFixture<GanttBarsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [GanttBarsComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(GanttBarsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
