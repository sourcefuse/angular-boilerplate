import {TestBed} from '@angular/core/testing';
import {WeeklyScaleService} from './weekly-scale.service';

describe('WeeklyScaleService', () => {
  let service: WeeklyScaleService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [WeeklyScaleService],
    });
    service = TestBed.inject(WeeklyScaleService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return config with formatters that format according to weekly scale', () => {
    const config = service.config();
    const testYear = 2020;
    const mockDate = new Date(testYear, 0, 1);
    expect(config[0].format(mockDate)).toEqual('Jan 01, 2020');
    expect(config[1].format(mockDate)).toEqual('W');
  });
});
