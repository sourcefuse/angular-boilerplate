import { required, requiredMetadataKey } from './required.decorator';

class MockModel {
  @required()
  x: string;
  constructor(data: MockModel) {
    this.x = data.x;
  }
}

describe('@required', () => {
  it('should add required meta data on property x', () => {
    const requireMetadata = Reflect.getOwnMetadata(
      requiredMetadataKey,
      MockModel
    );
    expect(requireMetadata).toBeTruthy();
    expect(requireMetadata.length).toBe(1);
    expect(requireMetadata).toEqual(['x']);
  });
});
