import {ComponentFixture, TestBed} from '@angular/core/testing';

import {GanttScrollComponent} from './gantt-scroll.component';

describe('GanttScrollComponent', () => {
  let component: GanttScrollComponent;
  let fixture: ComponentFixture<GanttScrollComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [GanttScrollComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(GanttScrollComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
