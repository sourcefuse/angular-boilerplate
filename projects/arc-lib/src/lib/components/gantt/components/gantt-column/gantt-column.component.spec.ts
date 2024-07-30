import {ComponentFixture, TestBed} from '@angular/core/testing';

import {GanttColumnComponent} from './gantt-column.component';

describe('GColumnComponent', () => {
  let component: GanttColumnComponent;
  let fixture: ComponentFixture<GanttColumnComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [GanttColumnComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(GanttColumnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
