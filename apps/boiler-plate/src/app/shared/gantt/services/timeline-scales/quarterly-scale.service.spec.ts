import {TestBed} from '@angular/core/testing';
import {QuarterlyScaleService} from './quarterly-scale.service';

describe('QuarterlyScaleService', () => {
  let service: QuarterlyScaleService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [QuarterlyScaleService],
    });
    service = TestBed.inject(QuarterlyScaleService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return config with formatters that format according to quarterly scale', () => {
    const config = service.config();
    const testYear = 2020;
    const mockDate = new Date(testYear, 0, 1);
    expect(config[0].format(mockDate)).toEqual('Q1 2020');
    expect(config[1].format(mockDate)).toEqual('Jan');
  });
});
