import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {RouteComponentBaseDirective} from '@project-lib/core/route-component-base';
import {ColDef} from 'ag-grid-community';
import {Location} from '@angular/common';
import {OnBoardingService} from '../../on-boarding/on-boarding-service';
import {takeUntil} from 'rxjs';
import {TenantFacadeService} from '../tenant-list/tenant-list-facade.service';

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
    {field: 'name'},
    {field: 'domains'},
    {field: 'address'},
    {field: 'status'},
  ];

  rowData = [];
  tenants: any;
  leads: any;

  constructor(
    protected override readonly location: Location,
    protected override readonly route: ActivatedRoute,
    private readonly onboardingFacade: OnBoardingService,
    private readonly tenantFacade: TenantFacadeService,
    private readonly router: Router,
  ) {
    super(route, location);
  }

  ngOnInit(): void {
    this.getOnBoardingTenants();
  }

  getOnBoardingTenants() {
    this.tenantFacade
      .getTenantList()
      .pipe(takeUntil(this._destroy$))
      .subscribe(res => {
        this.rowData = res;
      });
  }
}
