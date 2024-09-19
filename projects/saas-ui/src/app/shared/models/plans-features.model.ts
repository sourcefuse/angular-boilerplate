import {Feature} from '../interfaces/features';
import {Features} from './feature.model';

export class PlanWithFeatures {
  name: string;
  tier: string;
  size: string;
  features: Features[];
}
