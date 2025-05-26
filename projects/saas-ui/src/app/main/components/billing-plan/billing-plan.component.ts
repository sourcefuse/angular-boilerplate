import {Component} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {AnyObject, BackendFilter, Count} from '@project-lib/core/api';
import {RouteComponentBaseDirective} from '@project-lib/core/route-component-base';
import {
  ColDef,
  GridApi,
  GridOptions,
  IDatasource,
  IGetRowsParams,
} from 'ag-grid-community';
import {Observable, combineLatest, map} from 'rxjs';
import {Location} from '@angular/common';

import {BillingPlanService} from '../../../shared/services/billing-plan-service';
import {SubscriptionStatus} from '../../../shared/enum/subscription-status.enum';
import {Plan} from '../../../shared/models';

@Component({
  selector: 'app-billing-plan',
  templateUrl: './billing-plan.component.html',
  styleUrls: ['./billing-plan.component.scss'],
})
export class BillingPlanComponent extends RouteComponentBaseDirective {
  gridApi: GridApi;
  gridOptions: GridOptions;
  limit = 5;
  isLoading: boolean;
  colDefs: ColDef[] = [
    {field: 'companyName', width: 200, minWidth: 20},
    {field: 'userName', width: 200, minWidth: 20},
    {field: 'planName', width: 200, minWidth: 20},
    {field: 'startDate', width: 200, minWidth: 20},
    {field: 'endDate', width: 200, minWidth: 20},
    {field: 'status', width: 200, minWidth: 20},
  ];

  rowData: AnyObject = [];
  data: AnyObject = [];
  tenants: AnyObject[];

  constructor(
    protected override readonly location: Location,
    protected override readonly route: ActivatedRoute,
    private readonly billingplanService: BillingPlanService,
  ) {
    super(route, location);
    this.gridOptions = {
      pagination: true,
      rowModelType: 'infinite',
      paginationPageSize: this.limit,
      paginationPageSizeSelector: [this.limit, 10, 20, 50, 100],
      cacheBlockSize: this.limit,
      onGridReady: this.onGridReady.bind(this),
      rowHeight: 60,
      defaultColDef: {flex: 1},
    };
  }

  onGridReady(params: AnyObject) {
    this.gridApi = params.api;
    const dataSource: IDatasource = {
      getRows: (params: IGetRowsParams) => {
        this.isLoading = true;
        const page = params.endRow / this.limit;
        const paginatedLeads = this.getPaginatedBillPlans(page, this.limit);
        const totalLead = this.getTotal();
        combineLatest([paginatedLeads, totalLead]).subscribe(
          ([data, count]) => {
            params.successCallback(data, count.count);
            this.isLoading = false;
          },

          err => {
            params.failCallback();
            this.isLoading = false;
          },
        );
      },
    };
    params.api.setDatasource(dataSource);
  }

  getPaginatedBillPlans(page: number, limit: number): Observable<AnyObject[]> {
    const filter: BackendFilter<Plan> = {
      offset: limit * (page - 1),
      limit: limit,
    };
    return this.billingplanService.getBillingDetails(filter).pipe(
      map(res => {
        const rows = res.map(item => {
          return {
            companyName: item.companyName,
            userName: item.userName,
            planName: item.planName,
            startDate: item.startDate,
            endDate: item.endDate,
            status: SubscriptionStatus[item.status],
          };
        });
        return rows;
      }),
    );
  }

  getTotal(): Observable<Count> {
    return this.billingplanService.getTotalBillingPlan();
  }
}
