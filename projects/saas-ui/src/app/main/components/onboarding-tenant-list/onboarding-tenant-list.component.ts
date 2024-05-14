import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {RouteComponentBaseDirective} from '@project-lib/core/route-component-base';
import {ColDef} from 'ag-grid-community';
import {Location} from '@angular/common';
import {takeUntil} from 'rxjs';
import {TenantFacadeService} from '../../../shared/services/tenant-list-facade.service';
import {Tenant} from '../../../shared/models';
import {BackendFilter} from '@project-lib/core/api';
import {TenantStatus} from '../../../shared/enum/tenant-status.enum';

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
    {field: 'name', headerName: 'Company Name', width: 200, minWidth: 20},
    {field: 'domains', width: 200, minWidth: 20},
    {field: 'address', width: 300, minWidth: 20},
    {field: 'status', width: 200, minWidth: 20},
  ];

  rowData = [];
  tenants: any;
  leads: any;
  filter: BackendFilter<Tenant> = {
    include: [{relation: 'address'}],
  };
  constructor(
    protected override readonly location: Location,
    protected override readonly route: ActivatedRoute,
    private readonly tenantFacade: TenantFacadeService,
  ) {
    super(route, location);
  }

  ngOnInit(): void {
    this.getOnBoardingTenants();
  }

  getOnBoardingTenants() {
    this.tenantFacade
      .getTenantList(null, null, this.filter)
      .pipe(takeUntil(this._destroy$))
      .subscribe(res => {
        this.rowData = res.map(item => {
          const addressString = `${item.address.city}, ${item.address.state}, ${item.address.zip}, ${item.address.country}`;
          return {
            name: item.name,
            domains: item.domains.join(', '),
            address: addressString,
            status: TenantStatus[item.status],
          };
        });
      });
  }
}
