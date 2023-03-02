import {TestBed} from '@angular/core/testing';
import {MonthlyScaleService} from './monthly-scale.service';

describe('MonthlyScaleService', () => {
  let service: MonthlyScaleService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MonthlyScaleService],
    });
    service = TestBed.inject(MonthlyScaleService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return config with formatters that format according to monthly scale', () => {
    const config = service.config();
    const testYear = 2020;
    const mockDate = new Date(testYear, 0, 1);
    expect(config[0].format(mockDate)).toEqual('January 2020');
    expect(config[1].format(mockDate)).toEqual('01');
  });
});
