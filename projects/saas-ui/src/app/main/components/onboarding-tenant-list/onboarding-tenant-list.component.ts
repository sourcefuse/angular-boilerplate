import {Component, Inject} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {RouteComponentBaseDirective} from '@project-lib/core/route-component-base';
import {ColDef, GridApi, GridOptions} from 'ag-grid-community';
import {Location} from '@angular/common';
import {Observable} from 'rxjs';
import {TenantFacadeService} from '../../../shared/services/tenant-list-facade.service';
import {Tenant} from '../../../shared/models';
import {AnyObject, BackendFilter} from '@project-lib/core/api';
import {TenantStatus} from '../../../shared/enum/tenant-status.enum';
import {APP_CONFIG} from '@project-lib/app-config';
import {IAnyObject} from '@project-lib/core/i-any-object';
import {EyeIconRendererComponent} from '../eye-icon-renderer/eye-icon-renderer.component';
import {tenantDetails} from '../../../shared/models/tenantDetails.model';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-onboarding-tenant-list',
  templateUrl: './onboarding-tenant-list.component.html',
  styleUrls: ['./onboarding-tenant-list.component.scss'],
})
export class OnboardingTenantListComponent extends RouteComponentBaseDirective {
  gridApi: GridApi;
  params: AnyObject;
  gridOptions: GridOptions;
  defaultColDef: ColDef = {
    flex: 1,
    minWidth: 150,
    filter: true,
    floatingFilter: true,
    resizable: true,
  };

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
      rowModelType: 'clientSide',
      paginationPageSize: 5,
      paginationPageSizeSelector: [5, 10, 20, 50, 100],
      cacheBlockSize: 5,
      onGridReady: this.onGridReady.bind(this),
      rowHeight: 60,
      defaultColDef: {flex: 1},
    };
    this.getTenantDetails();
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
    {
      headerName: 'Actions',
      minWidth: 100,
      cellRenderer: EyeIconRendererComponent,
    },
  ];

  rowData: any[] = [];
  onGridReady(params: AnyObject) {
    this.gridApi = params.api;
  }

  getTenantDetails() {
    this.tenantFacade.getTenantDetails().subscribe(resp => {
      this.rowData = resp.map(item => {
        if (item) {
          const fullTenantName = [
            item.contacts[0]?.firstName,
            '    ',
            item.contacts[0]?.lastName,
          ]
            .filter(ele => ele != null && ele.trim() != '')
            .join(' ');

          const addressString = [item.address.zip, '    ', item.address.country]
            .filter(ele => ele != null && ele.trim() != '')
            .join(' ');

          return {
            id: item.id,
            name: item.name,
            tenant_name: fullTenantName,
            email: item.contacts[0].email,
            address: addressString,
            planName: item.subscription?.plan.name,
            status: TenantStatus[item.subscription?.status],
            startDate: item.subscription?.startDate
              ? new Date(item.subscription.startDate).toLocaleDateString()
              : 'N/A',
            endDate: item.subscription?.endDate
              ? new Date(item.subscription.endDate).toLocaleDateString()
              : 'N/A',
          };
        }
      });
      if (this.gridApi) {
        this.gridApi.setRowData(this.rowData);
      }
    });
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

  registerTenantPage() {
    this.router.navigate(['main/create-tenant']);
  }
}
