import {ComponentFixture, TestBed} from '@angular/core/testing';
import {ThemeModule} from '@boiler/theme/theme.module';
import {GanttModule} from '../../gantt.module';

import {GanttHeaderComponent} from './gantt-header.component';

describe('GanttHeaderComponent', () => {
  let component: GanttHeaderComponent;
  let fixture: ComponentFixture<GanttHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GanttModule, ThemeModule.forRoot('boiler')],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GanttHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
