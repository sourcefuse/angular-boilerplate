export interface Deal {
  name: string;
  allocatedHours: number;
  status: string;
}

export interface Item {
  allocatedHours: number;
  billingRate: number;
  startDate: Date;
  endDate: Date;
  allotedDeals: Deal[];
}

export interface empData {
  name: string;
  subtitle: string;
  hasChildren: boolean;
  isParent: boolean;
  $open: boolean;
  overallocated: boolean;
}
