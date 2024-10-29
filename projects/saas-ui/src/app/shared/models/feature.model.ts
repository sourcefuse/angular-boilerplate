import {AnyObject} from '@project-lib/core/api';
import {FeatureValues} from './feature-values.model';

export class Features {
  [x: string]: any;
  id?: string;
  name: string;
  description: string;
  key: string;
  type: 'boolean' | 'number' | 'string' | 'object';
  defaultValue: 'boolean' | 'number' | 'string' | 'object';
  metadata?: any;
  value?: FeatureValues;
  constructor(data?: Partial<Features>) {
    this.id = data?.id;
    this.name = data.name;
    this.description = data.description;
    this.key = data.key;
    this.type = data.type;
    this.defaultValue = data.defaultValue;
    this.value = data.value;
    this.metadata = data?.metadata;
  }
}
