import {AnyObject} from '@project-lib/core/api';
import {Address} from './address.model';

export class Lead {
  id?: string;
  name!: string;
  companyName!: string;
  email!: string;
  isValidated!: boolean;
  address!: Address;
  country?: string;
}
