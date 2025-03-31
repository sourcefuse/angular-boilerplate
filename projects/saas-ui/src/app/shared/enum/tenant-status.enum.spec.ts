import {TenantStatus} from './tenant-status.enum';

describe('TenantStatus', () => {
  it('should have the correct enum values', () => {
    expect(TenantStatus.ACTIVE).toEqual(0);
    expect(TenantStatus.PENDING_PROVISION).toEqual(1);
    expect(TenantStatus.PROVISIONING).toEqual(2);
    expect(TenantStatus.PROVISION_FAILED).toEqual(3);
    expect(TenantStatus.DEPROVISIONING).toEqual(4);
    expect(TenantStatus.INACTIVE).toEqual(5);
  });
});
