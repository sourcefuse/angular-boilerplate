import {AnyObject} from '@project-lib/core/api';

export class Lead {
  id?: string;
  name!: string;
  companyName!: string;
  email!: string;
  isValidated!: boolean;
  address!: AnyObject;
  country?: string;
}
