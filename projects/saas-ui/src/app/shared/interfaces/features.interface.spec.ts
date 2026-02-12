import {Feature} from './features';

describe('Feature', () => {
  let feature: Feature;

  beforeEach(() => {
    feature = {
      name: 'Test Feature',
      description: 'This is a test feature',
      key: 'testFeature',
      type: 'boolean',
      defaultValue: false,
    };
  });

  it('should have a name', () => {
    expect(feature.name).toBeDefined();
    expect(typeof feature.name).toBe('string');
  });

  it('should have a description', () => {
    expect(feature.description).toBeDefined();
    expect(typeof feature.description).toBe('string');
  });

  it('should have a key', () => {
    expect(feature.key).toBeDefined();
    expect(typeof feature.key).toBe('string');
  });

  it('should have a type', () => {
    expect(feature.type).toBeDefined();
    expect(['boolean', 'number', 'string', 'object']).toContain(feature.type);
  });

  it('should have a defaultValue', () => {
    expect(feature.defaultValue).toBeDefined();
  });
});
