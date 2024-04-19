import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {RouteComponentBaseDirective} from '@project-lib/core/route-component-base';
import {AgGridAngular} from 'ag-grid-angular'; // AG Grid Component
import {ColDef} from 'ag-grid-community';
import {Location} from '@angular/common';

@Component({
  selector: 'app-tenant',
  templateUrl: './tenant-list.component.html',
  styleUrls: ['./tenant-list.component.scss'],
})
export class TenantListComponent
  extends RouteComponentBaseDirective
  implements OnInit
{
  colDefs: ColDef[] = [
    {field: 'firstname'},
    {field: 'lastname'},
    {field: 'companyName'},
    {field: 'address'},
    {field: 'country'},
    {field: 'state'},
    {field: 'city'},
    {field: 'zip'},
  ];

  rowData = [
    {
      firstname: 'Deepika',
      lastname: 'Mahindroo',
      companyName: 'deepika.mahindroo@sourcefuse.com',
      address: '#482,DeraBassi',
      country: 'India',
      state: 'Punjab',
      city: 'Dera Bassi',
      zip: '140507',
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
    this.getTenants();
  }

  getTenants() {
    // this.tenantFacade
    //   .getTenantList()
    //   .pipe(takeUntil(this._destroy$))
    //   .subscribe(res => {
    //     this.tenants = res;
    //   });
  }
}
