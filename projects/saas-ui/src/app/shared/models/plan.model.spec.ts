import {PlanTier} from '../enum/plan-tier.enum';
import {Plan} from './plan.model';

describe('Plan', () => {
  let plan: Plan;

  beforeEach(() => {
    plan = new Plan();
  });

  it('should have an id property', () => {
    expect(plan.id).toBeUndefined();
  });

  it('should have a name property', () => {
    expect(plan.name).toBeUndefined();
  });

  it('should have a description property', () => {
    expect(plan.description).toBeUndefined();
  });

  it('should have a price property', () => {
    expect(plan.price).toBeUndefined();
  });

  it('should have a metadata property', () => {
    expect(plan.metadata).toBeUndefined();
  });

  it('should have a size property', () => {
    expect(plan.size).toBeUndefined();
  });
});
