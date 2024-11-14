import {FeatureValues} from './feature-values.model';

describe('FeatureValues', () => {
  let featureValues: FeatureValues;

  beforeEach(() => {
    featureValues = new FeatureValues();
  });

  it('should create an instance', () => {
    expect(featureValues).toBeTruthy();
  });

  it('should have featureKey property', () => {
    expect(featureValues.featureKey).toBeUndefined();
    featureValues.featureKey = 'testFeatureKey';
    expect(featureValues.featureKey).toEqual('testFeatureKey');
  });

  it('should have strategyKey property', () => {
    expect(featureValues.strategyKey).toBeUndefined();
    featureValues.strategyKey = 'testStrategyKey';
    expect(featureValues.strategyKey).toEqual('testStrategyKey');
  });

  it('should have strategyEntityId property', () => {
    expect(featureValues.strategyEntityId).toBeUndefined();
    featureValues.strategyEntityId = 'testStrategyEntityId';
    expect(featureValues.strategyEntityId).toEqual('testStrategyEntityId');
  });

  it('should have status property', () => {
    expect(featureValues.status).toBeUndefined();
    featureValues.status = true;
    expect(featureValues.status).toEqual(true);
  });

  it('should have value property', () => {
    expect(featureValues.value).toBeUndefined();
    featureValues.value = 'testValue';
    expect(featureValues.value).toEqual('testValue');
  });
});
