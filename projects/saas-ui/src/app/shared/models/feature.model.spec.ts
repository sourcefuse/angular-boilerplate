import {Features} from './feature.model';

describe('Features', () => {
  it('should set properties correctly through the constructor', () => {
    const data = {
      id: '1',
      name: 'Test Feature',
      description: 'A test feature description',
      key: 'test-feature',
      type: 'boolean' as const,
      defaultValue: true,
      value: {featureKey: 'test-feature', status: 'true', value: true} as any, // Replace `as any` with appropriate type if necessary
    };

    const feature = new Features(data);

    expect(feature.id).toEqual('1');
    expect(feature.name).toEqual('Test Feature');
    expect(feature.description).toEqual('A test feature description');
    expect(feature.key).toEqual('test-feature');
    expect(feature.type).toEqual('boolean');
    expect(feature.defaultValue).toEqual(true);
    expect(feature.value).toEqual(data.value);
  });

  it('should handle partial data in the constructor', () => {
    const data = {
      name: 'Partial Feature',
      type: 'string' as const,
      defaultValue: 'default',
    };

    const feature = new Features(data);

    expect(feature.id).toBeUndefined();
    expect(feature.name).toEqual('Partial Feature');
    expect(feature.description).toBeUndefined();
    expect(feature.key).toBeUndefined();
    expect(feature.type).toEqual('string');
    expect(feature.defaultValue).toEqual('default');
    expect(feature.value).toBeUndefined();
  });
});
