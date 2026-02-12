import {TenantLead} from './tenantLead.model';

describe('TenantLead', () => {
  let tenantLead: TenantLead;

  beforeEach(() => {
    tenantLead = new TenantLead();
  });

  it('should create an instance', () => {
    expect(tenantLead).toBeTruthy();
  });

  it('should have name property', () => {
    expect(tenantLead.name).toBeUndefined();
    tenantLead.name = 'John Doe';
    expect(tenantLead.name).toEqual('John Doe');
  });

  describe('contact', () => {
    it('should have contact property', () => {
      expect(tenantLead.contact).toBeUndefined();
      tenantLead.contact = {};
      expect(tenantLead.contact).toEqual({});
    });

    it('should have firstName property', () => {
      expect(tenantLead.contact?.firstName).toBeUndefined();
      tenantLead.contact = {firstName: 'John'};
      expect(tenantLead.contact?.firstName).toEqual('John');
    });

    it('should have lastName property', () => {
      expect(tenantLead.contact?.lastName).toBeUndefined();
      tenantLead.contact = {lastName: 'Doe'};
      expect(tenantLead.contact?.lastName).toEqual('Doe');
    });

    it('should have email property', () => {
      expect(tenantLead.contact?.email).toBeUndefined();
      tenantLead.contact = {email: 'john.doe@example.com'};
      expect(tenantLead.contact?.email).toEqual('john.doe@example.com');
    });

    it('should have isPrimary property', () => {
      expect(tenantLead.contact?.isPrimary).toBeUndefined();
      tenantLead.contact = {isPrimary: true};
      expect(tenantLead.contact?.isPrimary).toEqual(true);
    });
  });

  it('should have address property', () => {
    expect(tenantLead.address).toBeUndefined();
    tenantLead.address = '123 Main St';
    expect(tenantLead.address).toEqual('123 Main St');
  });

  it('should have city property', () => {
    expect(tenantLead.city).toBeUndefined();
    tenantLead.city = 'New York';
    expect(tenantLead.city).toEqual('New York');
  });

  it('should have state property', () => {
    expect(tenantLead.state).toBeUndefined();
    tenantLead.state = 'NY';
    expect(tenantLead.state).toEqual('NY');
  });

  it('should have zip property', () => {
    expect(tenantLead.zip).toBeUndefined();
    tenantLead.zip = 12345;
    expect(tenantLead.zip).toEqual(12345);
  });

  it('should have country property', () => {
    expect(tenantLead.country).toBeUndefined();
    tenantLead.country = 'USA';
    expect(tenantLead.country).toEqual('USA');
  });

  it('should have key property', () => {
    expect(tenantLead.key).toBeUndefined();
    tenantLead.key = 'abc123';
    expect(tenantLead.key).toEqual('abc123');
  });

  it('should have domains property', () => {
    expect(tenantLead.domains).toBeUndefined();
    tenantLead.domains = ['example.com', 'test.com'];
    expect(tenantLead.domains).toEqual(['example.com', 'test.com']);
  });

  it('should have planId property', () => {
    expect(tenantLead.planId).toBeUndefined();
    tenantLead.planId = '123';
    expect(tenantLead.planId).toEqual('123');
  });
});
