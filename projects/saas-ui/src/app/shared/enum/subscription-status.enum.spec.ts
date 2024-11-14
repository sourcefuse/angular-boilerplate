import {SubscriptionStatus} from './subscription-status.enum';

describe('SubscriptionStatus', () => {
  it('should have PENDING value', () => {
    expect(SubscriptionStatus.PENDING).toBe(0);
  });

  it('should have ACTIVE value', () => {
    expect(SubscriptionStatus.ACTIVE).toBe(1);
  });

  it('should have INACTIVE value', () => {
    expect(SubscriptionStatus.INACTIVE).toBe(2);
  });

  it('should have CANCELLED value', () => {
    expect(SubscriptionStatus.CANCELLED).toBe(3);
  });

  it('should have EXPIRED value', () => {
    expect(SubscriptionStatus.EXPIRED).toBe(4);
  });
});
