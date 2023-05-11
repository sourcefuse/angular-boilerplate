import { TestBed } from '@angular/core/testing';
import { AnyObject } from '@boiler/core/api/backend-filter';
import { GanttProviders } from '../const';
import { GanttModule } from '../gantt.module';
import { GanttService } from './gantt.service';

describe('GanttService', () => {
  let service: GanttService<AnyObject, AnyObject>;

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
