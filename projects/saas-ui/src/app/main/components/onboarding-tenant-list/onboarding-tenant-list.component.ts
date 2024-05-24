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
import {environment} from 'projects/saas-ui/src/environment';

@Component({
  selector: 'app-onboarding-tenant-list',
  templateUrl: './onboarding-tenant-list.component.html',
  styleUrls: ['./onboarding-tenant-list.component.scss'],
})
export class OnboardingTenantListComponent
  extends RouteComponentBaseDirective
  implements OnInit
{
  defaultColDef: ColDef = {
    flex: 1,
    minWidth: 150,
    filter: true,
    floatingFilter: true,
    resizable: true,
  };

  colDefs: ColDef[] = [
    {
      field: 'name',
      headerName: 'Company Name',
      width: 300,
      minWidth: 20,
      filter: 'agTextColumnFilter',
      floatingFilter: true,
      cellRenderer: function (params) {
        console.log(params);
        console.log(params.data.key);
        return `<a href="${params.data.key}.${environment.baseApiUrl}" target="_blank" class="company-link">
        ${params.value}
        </a>`;
      },
    },
    {
      field: 'domains',
      width: 300,
      minWidth: 20,
      filter: 'agTextColumnFilter',
      floatingFilter: true,
    },
    {
      field: 'address',
      width: 400,
      minWidth: 20,
      filter: 'agTextColumnFilter',
      floatingFilter: true,
    },
    {
      field: 'status',
      width: 300,
      minWidth: 20,
      filter: 'agTextColumnFilter',
      floatingFilter: true,
    },
  ];

  rowData = [];
  tenants: any;
  leads: any;
  filter: BackendFilter<Tenant> = {
    include: [{relation: 'address'}],
  };
  variable: any;
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
          this.variable = item.key;
          const addressString = `${item.address.city}, ${item.address.state}, ${item.address.zip}, ${item.address.country}`;
          return {
            name: item.name,
            key: item.key,
            domains: item.domains.join(', '),
            address: addressString,
            status: TenantStatus[item.status],
          };
        });
      });
  }
}
