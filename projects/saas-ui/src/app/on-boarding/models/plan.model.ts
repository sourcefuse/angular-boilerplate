import {AnyObject} from '@project-lib/core/api';

export class Plan {
  id?: string;
  name!: string;
  description!: string;
  price!: number;
  metadata?: AnyObject;
}
