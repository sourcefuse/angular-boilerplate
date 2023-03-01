import {TestBed} from '@angular/core/testing';

import {ApiModule} from '../api.module';
import {AnyAdapter} from './any-adapter.service';

describe('AnyAdapterService', () => {
  const testData = {
    id: '1',
    name: 'test',
  };
  beforeEach(() =>
    TestBed.configureTestingModule({
      imports: [ApiModule],
    }),
  );

  it('should be created', () => {
    const service: AnyAdapter = TestBed.inject(AnyAdapter);
    expect(service).toBeTruthy();
  });

  it('#adaptToModel should return same data as input', () => {
    const service: AnyAdapter = TestBed.inject(AnyAdapter);
    const adaptedModel = service.adaptToModel(testData);
    expect(adaptedModel).toEqual(testData);
  });

  it('#adaptFromModel should return same data as input', () => {
    const service: AnyAdapter = TestBed.inject(AnyAdapter);
    const adaptedModel = service.adaptFromModel(testData);
    expect(adaptedModel).toEqual(testData);
  });
});
