import { TestBed } from '@angular/core/testing';

import { ApiModule } from '../api.module';
import { Count } from '../models';
import { CountAdapter } from './count-adapter.service';

describe('CountAdapterService', () => {
  const testData = {
    count: 2000,
  };
  beforeEach(() =>
    TestBed.configureTestingModule({
      imports: [ApiModule],
    })
  );

  it('should be created', () => {
    const service: CountAdapter = TestBed.inject(CountAdapter);
    expect(service).toBeTruthy();
  });

  it('#adaptToModel should return Count model instance', () => {
    const service: CountAdapter = TestBed.inject(CountAdapter);
    const adaptedModel = service.adaptToModel(testData);
    expect(adaptedModel).toBeInstanceOf(Count);
  });

  it('#adaptToModel should return Count model instance with count data', () => {
    const service: CountAdapter = TestBed.inject(CountAdapter);
    const adaptedModel: Count = service.adaptToModel(testData);
    expect(adaptedModel).toBeInstanceOf(Count);
    expect(adaptedModel.count).toEqual(testData.count);
  });

  it('#adaptFromModel should return same count as input', () => {
    const service: CountAdapter = TestBed.inject(CountAdapter);
    const adaptedModel = service.adaptFromModel(new Count(testData));
    expect(adaptedModel.count).toEqual(testData.count);
  });
});
