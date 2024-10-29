import {Component, Inject} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {RouteComponentBaseDirective} from '@project-lib/core/route-component-base';
import {
  ColDef,
  GridApi,
  GridOptions,
  IDatasource,
  IGetRowsParams,
} from 'ag-grid-community';
import {Location} from '@angular/common';
import {Observable, combineLatest, map} from 'rxjs';
import {TenantFacadeService} from '../../../shared/services/tenant-list-facade.service';
import {Tenant} from '../../../shared/models';
import {AnyObject, BackendFilter} from '@project-lib/core/api';
import {TenantStatus} from '../../../shared/enum/tenant-status.enum';
import {APP_CONFIG} from '@project-lib/app-config';
import {IAnyObject} from '@project-lib/core/i-any-object';
import {EyeIconRendererComponent} from '../eye-icon-renderer/eye-icon-renderer.component';
import {TenantDetails} from '../../../shared/models/tenantDetails.model';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-onboarding-tenant-list',
  templateUrl: './onboarding-tenant-list.component.html',
  styleUrls: ['./onboarding-tenant-list.component.scss'],
})
export class OnboardingTenantListComponent extends RouteComponentBaseDirective {
  gridApi: GridApi;
  params: TenantDetails;
  gridOptions: GridOptions;
  limit = 10;
  defaultColDef: ColDef = {
    flex: 1,
    minWidth: 150,
    filter: true,
    floatingFilter: true,
    resizable: true,
  };
  tierOptions = [
    {name: 'Basic', value: 'BASIC'},
    {name: 'Standard', value: 'STANDARD'},
    {name: 'Premium', value: 'PREMIUM'},
  ];

  constructor(
    protected override readonly location: Location,
    private readonly router: Router,
    protected override readonly route: ActivatedRoute,
    private readonly tenantFacade: TenantFacadeService,
    private http: HttpClient,
    @Inject(APP_CONFIG) private readonly appConfig: IAnyObject,
  ) {
    super(route, location);
    this.gridOptions = {
      pagination: true,

      alwaysShowHorizontalScroll: true,
      rowModelType: 'infinite',
      paginationPageSize: this.limit,

      paginationPageSizeSelector: [this.limit, 20, 50, 100],
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
      flex: 1,
      minWidth: 160,
      filter: 'agTextColumnFilter',
      floatingFilter: true,
      sortable: true,
      cellRenderer: params => this.createCompanyLink(params),
    },
    {
      field: 'tenant_name',
      headerName: 'Tenant Name',
      minWidth: 160,
      flex: 1,
      filter: 'agTextColumnFilter',
      floatingFilter: true,
      sortable: true,
    },
    {
      field: 'email',
      headerName: 'Email',
      minWidth: 180,
      flex: 1,
      filter: 'agTextColumnFilter',
      floatingFilter: true,
      sortable: true,
    },
    {
      field: 'address',
      headerName: 'Address',
      minWidth: 120,
      filter: 'agTextColumnFilter',
      floatingFilter: true,
    },
    {
      field: 'planName',
      headerName: 'Plan Name',
      minWidth: 130,
      flex: 1,
      filter: 'agTextColumnFilter',
      floatingFilter: true,
    },
    {
      field: 'tier',
      headerName: 'Tier',
      minWidth: 120,
      flex: 1,
      filter: 'agTextColumnFilter',
      floatingFilter: true,
      cellStyle: {textAlign: 'center'}, // Optional styling for the column
    },
    {
      field: 'status',
      headerName: 'Subscription Status',
      minWidth: 180,
      filter: 'agTextColumnFilter',
      floatingFilter: true,
    },
    {
      field: 'startDate',
      headerName: 'Start Date',
      minWidth: 120,
      filter: 'agTextColumnFilter',
      floatingFilter: true,
    },
    {
      field: 'endDate',
      headerName: 'End Date',
      minWidth: 120,
      filter: 'agTextColumnFilter',
      floatingFilter: true,
    },
    // {
    //   headerName: 'Actions',
    //   minWidth: 100,
    //   cellRenderer: EyeIconRendererComponent,
    // },
  ];

  rowData: any[] = [];
  onGridReady(params: AnyObject) {
    this.gridApi = params.api;
    const dataSource: IDatasource = {
      getRows: (params: IGetRowsParams) => {
        const page = params.endRow / this.limit;
        const paginatedLeads = this.getPaginatedTenantDetails(page, this.limit);
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

  getPaginatedTenantDetails(
    page: number,
    limit: number,
  ): Observable<AnyObject[]> {
    const filter: BackendFilter<TenantDetails> = {
      offset: limit * (page - 1),
      limit: limit,
    };
    return this.tenantFacade.getTenantDetails(filter).pipe(
      map(resp => {
        console.log(resp);
        try {
          const rows = resp.map(item => {
            if (item) {
              const fullTenantName = [
                item?.firstName || '',
                '    ',
                item?.lastName || '',
              ]
                .filter(ele => ele != null && ele.trim() != '')
                .join(' ');

              const addressString = [
                item.address.zip,
                '    ',
                item.address.country,
              ]
                .filter(ele => ele != null && ele.trim() != '')
                .join(' ');

              const displayTier =
                this.tierOptions.find(
                  option => option.value === item.subscription.plan.tier,
                )?.name || '';

              return {
                id: item.id,
                name: item.name,
                tenant_name: fullTenantName,
                email: item.email,
                key: item.key,
                address: addressString,
                planName: item.subscription?.plan.name,
                tier: displayTier,
                status: TenantStatus[item.status],
                startDate: item.subscription?.startDate
                  ? new Date(item.subscription.startDate).toLocaleDateString()
                  : 'N/A',
                endDate: item.subscription?.endDate
                  ? new Date(item.subscription.endDate).toLocaleDateString()
                  : 'N/A',
              };
            }
          });
          return rows;
        } catch (error) {
          console.error('Error processing response:', error);
          return [];
        }
      }),
    );
  }

  getTotal() {
    return this.tenantFacade.getTotalTenant();
  }

  createCompanyLink(params: any) {
    const url = this.appConfig.baseApiUrl.replace(
      '//',
      `//${params.data?.key}.`,
    );
    return `<a href="${url}" target="_blank" 
    style="color: #007bff; text-decoration: none;">
   ${params.value}
 </a>`;
  }

  registerTenantPage() {
    this.router.navigate(['main/create-tenant']);
  }
}
