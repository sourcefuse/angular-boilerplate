import {AnyObject} from '@project-lib/core/api';
import {PlanTier} from '../enum/plan-tier.enum';

export class Plan {
  id?: string;
  name!: string;
  description!: string;
  tier: PlanTier;
  price!: number;
  metadata?: AnyObject;
  billingCycleId: string;
  currencyId: string;
  size?: string;
}
