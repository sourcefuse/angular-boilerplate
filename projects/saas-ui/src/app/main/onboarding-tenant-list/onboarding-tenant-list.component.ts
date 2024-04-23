import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {RouteComponentBaseDirective} from '@project-lib/core/route-component-base';
import {ColDef} from 'ag-grid-community';
import {Location} from '@angular/common';

@Component({
  selector: 'app-onboarding-tenant-list',
  templateUrl: './onboarding-tenant-list.component.html',
  styleUrls: ['./onboarding-tenant-list.component.scss'],
})
export class OnboardingTenantListComponent
  extends RouteComponentBaseDirective
  implements OnInit
{
  colDefs: ColDef[] = [
    {field: 'firstname'},
    {field: 'lastname'},
    {field: 'companyName'},
    {field: 'email'},
    {field: 'status'},
    {field: 'startDate'},
    {field: 'endDate'},
  ];

  rowData = [
    // {
    //   firstname: 'Deepika',
    //   lastname: 'Mahindroo',
    //   companyName: 'SourceFuse',
    //   email: '#482,DeraBassi',
    //   status: 'Active',
    //   startDate: '6th April 2024',
    //   endDate: '6th May 2024',
    // },
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
    //     this.rowData = res;
    //   });
  }
}
