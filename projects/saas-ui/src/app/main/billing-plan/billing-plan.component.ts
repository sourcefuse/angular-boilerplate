import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {AnyObject} from '@project-lib/core/api';
import {RouteComponentBaseDirective} from '@project-lib/core/route-component-base';
import {ColDef} from 'ag-grid-community';
import {takeUntil} from 'rxjs';
import {Location} from '@angular/common';
import {SubscriptionStatus} from '../enums/subscription-status.enum';
import {BillingPlanService} from '../services/billing-plan-service';

@Component({
  selector: 'app-billing-plan',
  templateUrl: './billing-plan.component.html',
  styleUrls: ['./billing-plan.component.scss'],
})
export class BillingPlanComponent
  extends RouteComponentBaseDirective
  implements OnInit
{
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
  }

  ngOnInit(): void {
    this.getOnBoardingTenants();
  }

  getOnBoardingTenants() {
    this.billingplanService
      .getBillingDetails()
      .pipe(takeUntil(this._destroy$))
      .subscribe(res => {
        this.rowData = res.map(item => {
          console.log(item);
          return {
            companyName: item.companyName,
            userName: item.userName,
            planName: item.planName,
            startDate: item.startDate,
            endDate: item.endDate,
            status: SubscriptionStatus[item.status],
          };
        });
      });
  }
}
