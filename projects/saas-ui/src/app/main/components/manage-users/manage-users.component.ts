import {Component} from '@angular/core';
import {FormBuilder} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {ToasterService} from '@project-lib/theme/toaster';
import {Location} from '@angular/common';
import {ColDef, GridApi, GridOptions} from 'ag-grid-community';
import {AnyObject} from '@project-lib/core/api';

@Component({
  selector: 'app-manage-users',
  templateUrl: './manage-users.component.html',
  styleUrls: ['./manage-users.component.scss'],
})
export class ManageUsersComponent {
  gridApi: GridApi;
  gridOptions: GridOptions;
  limit = 5;
  colDefs: ColDef[] = [
    {field: 'name', headerName: 'User Name', width: 200, minWidth: 20},
    {field: 'email', headerName: 'Email', width: 200, minWidth: 20},
    {field: 'role', headerName: 'Role', width: 250, minWidth: 20},
    {field: 'idp', headerName: 'IDP', width: 250, minWidth: 20},
  ];
  rowData = [];
  constructor(
    private toastrService: ToasterService,
    private readonly router: Router,
    private fb: FormBuilder,
  ) {
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
  }
  showManageUsers() {
    this.router.navigate(['/main/add-user']);
  }
}
