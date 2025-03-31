import {ComponentFixture, TestBed} from '@angular/core/testing';

import {GanttHeaderComponent} from './gantt-header.component';

describe('GanttHeaderComponent', () => {
  let component: GanttHeaderComponent;
  let fixture: ComponentFixture<GanttHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [GanttHeaderComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(GanttHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
