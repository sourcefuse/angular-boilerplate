export class TenantLead {
  name: string;
  contact?: {
    firstName?: string;
    lastName?: string;
    email?: string;
    isPrimary?: boolean;
  };

  address?: string;
  city?: string;
  state?: string;
  zip?: number;
  country?: string;
  key?: string;
  domains?: Array<string>;
  planId?: string;
}
