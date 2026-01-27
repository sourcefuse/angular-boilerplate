import {TestBed} from '@angular/core/testing';
import {Plan} from '../../shared/models';
import {GetPlanAdapter} from './get-plan-adapter.service';

describe('GetPlanAdapter', () => {
  let adapter: GetPlanAdapter;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [GetPlanAdapter],
    });
    adapter = TestBed.inject(GetPlanAdapter);
  });

  describe('adaptToModel', () => {
    it('should handle empty response', () => {
      const rawResponse: any[] = [];
      const expectedPlans: Plan[] = [];
      const result = adapter.adaptToModel(rawResponse);
      expect(result).toEqual(expectedPlans);
    });
  });

  describe('adaptFromModel', () => {
    it('should return data as-is', () => {
      const data = {key: 'value'};
      const result = adapter.adaptFromModel(data);
      expect(result).toEqual(data);
    });
  });
});
