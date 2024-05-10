import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {ColDef, GridApi} from 'ag-grid-community';
import {OnBoardingService} from '../../../on-boarding/on-boarding-service';
import {NbToastrService} from '@nebular/theme';
import {Location} from '@angular/common';
import {takeUntil} from 'rxjs';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Plan} from '../../../on-boarding/models';
import {RouteComponentBaseDirective} from '@project-lib/core/route-component-base';
import {AnyObject, BackendFilter} from '@project-lib/core/api';
import {BillingPlanService} from '../../services/billing-plan-service';
import {ToasterService} from '@project-lib/theme/toaster';
import {ButtonRendererComponent} from '../button-renderer/button-renderer.component';
@Component({
  selector: 'app-manage-plans',
  templateUrl: './manage-plans.component.html',
  styleUrls: ['./manage-plans.component.scss'],
})
export class ManagePlansComponent
  extends RouteComponentBaseDirective
  implements OnInit
{
  [x: string]: any;
  colDefs: ColDef[] = [
    {field: 'name', headerName: 'Plan Name', width: 200, minWidth: 20},
    {field: 'description', width: 200, minWidth: 20},
    {field: 'cycleName', width: 200, minWidth: 20},
    {field: 'currencyName', width: 200, minWidth: 20},
    {field: 'price', width: 200, minWidth: 20},
    {
      field: 'actions',
      headerName: 'Actions',
      cellRenderer: ButtonRendererComponent,
    },
  ];

  gridApi: GridApi;
  rowData = [];
  public rowSelection: 'single' | 'multiple' = 'single';
  tenants: AnyObject[];
  // for Pagination
  pagination = true;
  paginationPageSize = 5;
  paginationPageSizeSelector = [5, 10, 20, 50, 100];
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
  }

  ngOnInit(): void {
    this.getPlans();
  }

  getPlans() {
    this.billingPlanService
      .getPlanOptions(null, null, this.filter)
      .pipe(takeUntil(this._destroy$))
      .subscribe(res => {
        this.rowData = res.map(item => {
          return {
            id: item.id,
            name: item.name,
            description: item.description,
            cycleName: item['billingCycle'].cycleName,
            currencyName: item['currency'].currencyName,
            price: item.price,
          };
        });
      });
  }

  onGridReady(params) {
    this.gridApi = params.api;
  }
  showManagePlan() {
    this.router.navigate(['/main/add-plan']);
  }
}
