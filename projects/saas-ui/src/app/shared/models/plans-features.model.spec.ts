import {Features} from './feature.model';
import {PlanWithFeatures} from './plans-features.model';

describe('PlanWithFeatures', () => {
  let planWithFeatures: PlanWithFeatures;

  beforeEach(() => {
    planWithFeatures = new PlanWithFeatures();
    planWithFeatures.name = 'Enterprise Plan';
    planWithFeatures.tier = 'SILVER';
    planWithFeatures.size = 'Large';
    planWithFeatures.features = [
      new Features({
        id: '1',
        name: 'Feature A',
        description: 'Description for Feature A',
        key: 'featureA',
        type: 'boolean',
        defaultValue: false,
      }),
      new Features({
        id: '2',
        name: 'Feature B',
        description: 'Description for Feature B',
        key: 'featureB',
        type: 'number',
        defaultValue: 10,
      }),
    ];
  });

  it('should create an instance of PlanWithFeatures', () => {
    expect(planWithFeatures).toBeTruthy();
    expect(planWithFeatures).toBeInstanceOf(PlanWithFeatures);
  });

  it('should have name property', () => {
    expect(planWithFeatures.name).toBe('Enterprise Plan');
    expect(typeof planWithFeatures.name).toBe('string');
  });

  it('should have tier property', () => {
    expect(planWithFeatures.tier).toBe('SILVER');
    expect(typeof planWithFeatures.tier).toBe('string');
  });

  it('should have size property', () => {
    expect(planWithFeatures.size).toBe('Large');
    expect(typeof planWithFeatures.size).toBe('string');
  });

  it('should have features property', () => {
    expect(planWithFeatures.features).toBeDefined();
    expect(Array.isArray(planWithFeatures.features)).toBe(true);
    expect(planWithFeatures.features.length).toBeGreaterThan(0);
    expect(planWithFeatures.features[0]).toBeInstanceOf(Features);
  });

  it('should handle empty features array', () => {
    const emptyPlanWithFeatures = new PlanWithFeatures();
    emptyPlanWithFeatures.name = 'Basic Plan';
    emptyPlanWithFeatures.tier = 'BRONZE';
    emptyPlanWithFeatures.size = 'Small';
    emptyPlanWithFeatures.features = [];

    expect(emptyPlanWithFeatures.features).toEqual([]);
  });

  it('should handle undefined values', () => {
    const undefinedPlanWithFeatures = new PlanWithFeatures();

    expect(undefinedPlanWithFeatures.name).toBeUndefined();
    expect(undefinedPlanWithFeatures.tier).toBeUndefined();
    expect(undefinedPlanWithFeatures.size).toBeUndefined();
    expect(undefinedPlanWithFeatures.features).toBeUndefined();
  });
});
