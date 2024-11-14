import {PlanTier} from './plan-tier.enum';

describe('PlanTier Enum', () => {
  it('should have the correct values for each enum member', () => {
    expect(PlanTier.POOLED).toBe(0);
    expect(PlanTier.SILO).toBe(1);
  });

  it('should have the correct names for each enum member', () => {
    expect(PlanTier[PlanTier.POOLED]).toBe('POOLED');
    expect(PlanTier[PlanTier.SILO]).toBe('SILO');
  });
});
