export class FeatureAction {
  id!: string;
  name!: string;
  featureKey!: string;
  strategyKey!: string;
  strategyEntityId!: string;
  status!: boolean;
  actions: any[] = [];
  enabled? = false;
}
