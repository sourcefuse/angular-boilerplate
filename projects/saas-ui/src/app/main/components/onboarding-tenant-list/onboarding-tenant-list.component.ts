import {Component, Inject, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {RouteComponentBaseDirective} from '@project-lib/core/route-component-base';
import {
  ColDef,
  GridApi,
  GridOptions,
  IDatasource,
  IGetRowsParams,
} from 'ag-grid-community';
import {Location} from '@angular/common';
import {Observable, combineLatest, map, takeUntil} from 'rxjs';
import {TenantFacadeService} from '../../../shared/services/tenant-list-facade.service';
import {Tenant} from '../../../shared/models';
import {BackendFilter} from '@project-lib/core/api';
import {TenantStatus} from '../../../shared/enum/tenant-status.enum';
import {environment} from 'projects/saas-ui/src/environment';
import {APP_CONFIG} from '@project-lib/app-config';
import {IAnyObject} from '@project-lib/core/i-any-object';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-onboarding-tenant-list',
  templateUrl: './onboarding-tenant-list.component.html',
  styleUrls: ['./onboarding-tenant-list.component.scss'],
})
export class OnboardingTenantListComponent extends RouteComponentBaseDirective {
  gridApi: GridApi;
  gridOptions: GridOptions;
  limit = 5;
  defaultColDef: ColDef = {
    flex: 1,
    minWidth: 150,
    filter: true,
    floatingFilter: true,
    resizable: true,
  };
  keyVariable: any;
  constructor(
    protected override readonly location: Location,
    protected override readonly route: ActivatedRoute,
    private readonly tenantFacade: TenantFacadeService,
    private http: HttpClient,
    @Inject(APP_CONFIG) private readonly appConfig: IAnyObject,
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

  colDefs: ColDef[] = [
    {
      field: 'name',
      headerName: 'Company Name',
      width: 300,
      minWidth: 20,
      filter: 'agTextColumnFilter',
      floatingFilter: true,
      sortable: true,
      cellRenderer: params => this.createCompanyLink(params),
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

  onGridReady(params: any) {
    this.gridApi = params.api;
    const dataSource: IDatasource = {
      getRows: (params: IGetRowsParams) => {
        const page = params.endRow / this.limit;
        const paginatedLeads = this.getPaginatedTenants(page, this.limit);
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
    this.gridApi.updateGridOptions({datasource: dataSource});
  }

  getPaginatedTenants(page: number, limit: number): Observable<any[]> {
    const filter: BackendFilter<Tenant> = {
      offset: limit * (page - 1),
      limit: limit,
      include: [{relation: 'address'}],
    };
    return this.tenantFacade.getTenantList(filter).pipe(
      map(res => {
        return res.map(item => {
          const addressString = `${item.address.city}, ${item.address.state}, ${item.address.zip}, ${item.address.country}`;
          return {
            name: item.name,
            key: item.key,
            domains: item.domains.join(', '),
            address: addressString,
            status: TenantStatus[item.status],
          };
        });
      }),
    );
  }

  createCompanyLink(params: any) {
    const url = this.appConfig.baseApiUrl.replace(
      '//',
      `//${params.data?.key}.`,
    );
    return `<a href="${url}" target="_blank" class="company-link">
      ${params.value}
    </a>`;
  }

  getTotal() {
    return this.tenantFacade.getTotalTenant();
  }
}
