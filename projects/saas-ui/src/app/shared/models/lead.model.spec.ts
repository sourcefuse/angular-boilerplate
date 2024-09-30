import {Lead} from './lead.model';
import {Address} from './address.model';

describe('Lead', () => {
  let lead: Lead;

  beforeEach(() => {
    lead = new Lead();
  });

  it('should create an instance', () => {
    expect(lead).toBeTruthy();
  });

  it('should have id property', () => {
    expect(lead.id).toBeUndefined();
  });

  it('should have companyName property', () => {
    expect(lead.companyName).toBeUndefined();
  });

  it('should have email property', () => {
    expect(lead.email).toBeUndefined();
  });

  it('should have isValidated property', () => {
    expect(lead.isValidated).toBeUndefined();
  });

  it('should have country property', () => {
    expect(lead.country).toBeUndefined();
  });
});

describe('Address', () => {
  let address: Address;

  beforeEach(() => {
    address = new Address();
  });

  it('should create an instance', () => {
    expect(address).toBeTruthy();
  });

  it('should have id property', () => {
    expect(address.id).toBeUndefined();
  });

  it('should have address property', () => {
    expect(address.address).toBeUndefined();
  });

  it('should have city property', () => {
    expect(address.city).toBeUndefined();
  });

  it('should have state property', () => {
    expect(address.state).toBeUndefined();
  });

  it('should have zip property', () => {
    expect(address.zip).toBeUndefined();
  });
});
