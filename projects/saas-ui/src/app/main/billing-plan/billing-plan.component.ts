import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {RouteComponentBaseDirective} from '@project-lib/core/route-component-base';
import {ColDef} from 'ag-grid-community';
import {Location} from '@angular/common';

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
    {field: 'name'},
    {field: 'cyclename'},
    {field: 'duration'},
    {field: 'durationUnit'},
    {field: 'description'},
  ];

  rowData = [
    {
      name: 'Deepika',
      cyclename: 'Mahindroo',
      duration: 'SourceFuse',
      durationUnit: '#482,DeraBassi',
      description: 'Active',
    },
  ];

  constructor(
    protected override readonly location: Location,
    protected override readonly route: ActivatedRoute,
    // private readonly tenantFacade: TenantFacadeService,
    private readonly router: Router,
  ) {
    super(route, location);
  }

  ngOnInit(): void {
    this.getOnBoardingTenants();
  }

  getOnBoardingTenants() {
    // this.tenantFacade
    //   .getTenantList()
    //   .pipe(takeUntil(this._destroy$))
    //   .subscribe(res => {
    //     this.tenants = res;
    //   });
  }
}
