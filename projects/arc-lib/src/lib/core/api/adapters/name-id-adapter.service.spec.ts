import { TestBed } from '@angular/core/testing';

import { ApiModule } from '../api.module';
import { NameId } from '../models';
import { NameIdAdapter } from './name-id-adapter.service';

describe('NameIdAdapterService', () => {
  const testData = {
    id: '2000',
    name: 'Testing',
  };
  const testNameId: NameId = new NameId(testData);

  beforeEach(() =>
    TestBed.configureTestingModule({
      imports: [ApiModule],
    })
  );

  it('should be created', () => {
    const service: NameIdAdapter = TestBed.inject(NameIdAdapter);
    expect(service).toBeTruthy();
  });

  it('#adaptToModel should return NameId model instance', () => {
    const service: NameIdAdapter = TestBed.inject(NameIdAdapter);
    const adaptedModel = service.adaptToModel(testData);
    expect(adaptedModel).toBeInstanceOf(NameId);
  });

  it('#adaptToModel should return NameId model instance with data', () => {
    const service: NameIdAdapter = TestBed.inject(NameIdAdapter);
    const adaptedModel: NameId = service.adaptToModel(testData);
    expect(adaptedModel).toBeInstanceOf(NameId);
    expect(adaptedModel.id).toEqual(testData.id);
    expect(adaptedModel.name).toEqual(testData.name);
  });

  it('#adaptFromModel should return same count as input', () => {
    const service: NameIdAdapter = TestBed.inject(NameIdAdapter);
    const adaptedModel = service.adaptFromModel(testNameId);
    expect(adaptedModel.id).toEqual(testNameId.id);
    expect(adaptedModel.name).toEqual(testNameId.name);
  });
});
