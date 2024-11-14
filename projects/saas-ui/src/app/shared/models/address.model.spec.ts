import {Address} from './address.model';

describe('Address Model', () => {
  let address: Address;

  beforeEach(() => {
    address = {
      id: 'some-id',
      address: '123 Main St',
      city: 'Sample City',
      state: 'CA',
      zip: '12345',
      country: 'USA',
    };
  });

  it('should create an Address instance', () => {
    expect(address).toBeTruthy();
  });
});
