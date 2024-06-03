import {Component, OnInit} from '@angular/core';
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
import {Observable, combineLatest, map, of, takeUntil} from 'rxjs';
import {OnBoardingService} from '../../../shared/services/on-boarding-service';
import {Lead} from '../../../shared/models';
import {AnyObject, BackendFilter, Count} from '@project-lib/core/index';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-lead',
  templateUrl: './lead-list.component.html',
  styleUrls: ['./lead-list.component.scss'],
})
export class LeadListComponent extends RouteComponentBaseDirective {
  // defining column names here
  colDefs: ColDef[] = [
    {field: 'firstName', width: 250, minWidth: 20},
    {field: 'lastName', width: 250, minWidth: 20},
    {field: 'companyName', width: 250, minWidth: 20},
    {field: 'email', width: 300, minWidth: 20},
    {field: 'country', width: 250, minWidth: 20},
  ];

  rowData = [];
  tenants: AnyObject[];
  filter: BackendFilter<Lead> = {
    include: [{relation: 'address'}],
  };
  gridApi: GridApi;
  gridOptions: GridOptions;
  limit = 5;

  constructor(
    protected override readonly location: Location,
    protected override readonly route: ActivatedRoute,
    private readonly onboardingService: OnBoardingService,
    private http: HttpClient,
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

  onGridReady(params: AnyObject) {
    this.gridApi = params.api;
    const dataSource: IDatasource = {
      getRows: (params: IGetRowsParams) => {
        const page = params.endRow / this.limit;
        const paginatedLeads = this.getPaginatedLeads(page, this.limit);
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

  getPaginatedLeads(page: number, limit: number): Observable<AnyObject[]> {
    const filter: BackendFilter<Lead> = {
      offset: limit * (page - 1),
      limit: limit,
      include: [{relation: 'address'}],
    };
    return this.onboardingService.getLeadList(filter).pipe(
      map(res => {
        const rows = res.map(item => ({
          firstName: item.firstName,
          lastName: item.lastName,
          companyName: item.companyName,
          email: item.email,
          country: item.address.country,
        }));
        return rows;
      }),
    );
  }

  getTotal(): Observable<Count> {
    return this.onboardingService.getTotalLead();
  }
}
