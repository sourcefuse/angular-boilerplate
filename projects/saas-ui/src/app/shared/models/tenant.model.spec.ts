import {Tenant} from './tenant.model';

describe('Tenant', () => {
  let tenant: Tenant;

  beforeEach(() => {
    tenant = new Tenant();
  });

  it('should create an instance', () => {
    expect(tenant).toBeTruthy();
  });

  it('should have id property', () => {
    expect(tenant.id).toBeUndefined();
  });

  it('should have name property', () => {
    expect(tenant.name).toBeUndefined();
  });

  it('should have description property', () => {
    expect(tenant.description).toBeUndefined();
  });

  it('should have domains property', () => {
    expect(tenant.domains).toBeUndefined();
  });

  it('should have primaryContactName property', () => {
    expect(tenant.primaryContactName).toBeUndefined();
  });

  it('should have primaryContactEmail property', () => {
    expect(tenant.primaryContactEmail).toBeUndefined();
  });

  it('should have addressId property', () => {
    expect(tenant.addressId).toBeUndefined();
  });

  it('should have key property', () => {
    expect(tenant.key).toBeUndefined();
  });

  it('should have planId property', () => {
    expect(tenant.planId).toBeUndefined();
  });

  it('should handle optional properties correctly', () => {
    expect(tenant.id).toBeUndefined();
    expect(tenant.name).toBeUndefined();
    expect(tenant.description).toBeUndefined();
    expect(tenant.domains).toBeUndefined();
    expect(tenant.primaryContactName).toBeUndefined();
    expect(tenant.primaryContactEmail).toBeUndefined();
    expect(tenant.addressId).toBeUndefined();
    expect(tenant.key).toBeUndefined();
    expect(tenant.planId).toBeUndefined();
  });
});
