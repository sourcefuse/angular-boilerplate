export interface Deal {
  name: string;
  allocatedHours: number;
  status: string;
}

export interface Item {
  allocatedHours?: number;
  billingRate?: number;
  startDate?: Date;
  endDate?: Date;
  allotedDeals?: Deal[];
  type?: string | number;
  allocation?: number;
  payload?: {[key: string]: any};
  classes?: string[];
  subAllocations?: AllocationBar[];
}

export interface empData {
  name: string;
  subtitle: string;
  hasChildren: boolean;
  isParent: boolean;
  $open: boolean;
  overallocated: boolean;
}

export interface AllocationBar {
  percent: number;
  allocation: number;
  allocatedHours: number;
  classes?: string[];
}
