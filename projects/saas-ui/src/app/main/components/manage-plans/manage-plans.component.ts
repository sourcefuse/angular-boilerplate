import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {
  ColDef,
  GridApi,
  GridOptions,
  IDatasource,
  IGetRowsParams,
} from 'ag-grid-community';
import {OnBoardingService} from '../../../shared/services/on-boarding-service';
import {NbToastrService} from '@nebular/theme';
import {Location} from '@angular/common';
import {Observable, combineLatest, map, takeUntil} from 'rxjs';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Plan} from '../../../shared/models';
import {RouteComponentBaseDirective} from '@project-lib/core/route-component-base';
import {AnyObject, BackendFilter, Count} from '@project-lib/core/api';
import {BillingPlanService} from '../../../shared/services/billing-plan-service';
import {ToasterService} from '@project-lib/theme/toaster';
import {ButtonRendererComponent} from '../button-renderer/button-renderer.component';
@Component({
  selector: 'app-manage-plans',
  templateUrl: './manage-plans.component.html',
  styleUrls: ['./manage-plans.component.scss'],
})
export class ManagePlansComponent extends RouteComponentBaseDirective {
  [x: string]: any;
  gridApi: GridApi;
  gridOptions: GridOptions;
  limit = 5;
  colDefs: ColDef[] = [
    {field: 'name', headerName: 'Plan Name', width: 200, minWidth: 20},
    {field: 'description', width: 200, minWidth: 20},
    {field: 'cycleName', width: 250, minWidth: 20},
    {field: 'currencyName', width: 250, minWidth: 20},
    {field: 'price', width: 250, minWidth: 20},
    {
      field: 'actions',
      headerName: 'Actions',
      cellRenderer: ButtonRendererComponent,
      width: 200,
    },
  ];
  rowData = [];
  public rowSelection: 'single' | 'multiple' = 'single';
  tenants: AnyObject[];
  filter: BackendFilter<AnyObject> = {
    include: [{relation: 'currency'}, {relation: 'billingCycle'}],
  };
  constructor(
    protected override readonly location: Location,
    protected override readonly route: ActivatedRoute,
    private toastrService: ToasterService,
    private readonly billingPlanService: BillingPlanService,
    private readonly onboardingService: OnBoardingService,
    private readonly router: Router,
    private fb: FormBuilder,
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
        const page = params.endRow / this.limit;
        const paginatedLeads = this.getPaginatedPlans(page, this.limit);
        const totalLead = this.getTotal();
        combineLatest([paginatedLeads, totalLead]).subscribe(
          ([data, count]) => {
            params.successCallback(data, count.count);
          },

          err => {
            params.failCallback();
          },
        );
      },
    };
    params.api.setDatasource(dataSource);
  }

  getPaginatedPlans(page: number, limit: number): Observable<any[]> {
    const filter: BackendFilter<Plan> = {
      offset: limit * (page - 1),
      limit: limit,
      include: [{relation: 'currency'}, {relation: 'billingCycle'}],
    };
    return this.billingPlanService.getPlanOptions(filter).pipe(
      map(res => {
        const rows = res.map(item => {
          return {
            id: item.id,
            name: item.name,
            description: item.description,
            cycleName: item['billingCycle'].cycleName,
            currencyName: item['currency'].currencyName,
            price: item.price,
          };
        });
        return rows;
      }),
    );
  }

  getTotal(): Observable<Count> {
    return this.billingPlanService.getTotalPlan();
  }

  showManagePlan() {
    this.router.navigate(['/main/add-plan']);
  }
}
