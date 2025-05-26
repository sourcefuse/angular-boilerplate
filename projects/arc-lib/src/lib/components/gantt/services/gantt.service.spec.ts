import {TestBed} from '@angular/core/testing';
import {GanttProviders} from '../const';
import {GanttModule} from '../gantt.module';
import {GanttService} from './gantt.service';

describe('GanttService', () => {
  let service: GanttService<any>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [GanttModule],
      providers: [GanttProviders],
    });
    service = TestBed.inject(GanttService);
  });

  xit('should be created', () => {
    expect(service).toBeTruthy();
  });
});
