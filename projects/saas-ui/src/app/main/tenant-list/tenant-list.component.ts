import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {RouteComponentBaseDirective} from '@project-lib/core/route-component-base';
import {AgGridAngular} from 'ag-grid-angular'; // AG Grid Component
import {ColDef} from 'ag-grid-community';
import {Location} from '@angular/common';
import {TenantFacadeService} from './tenant-list-facade.service';
import {takeUntil} from 'rxjs';
import {OnBoardingService} from '../../on-boarding/on-boarding-service';

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
    {field: 'firstName'},
    {field: 'lastName'},
    {field: 'companyName'},
    {field: 'email'},
    {field: 'addressId'},
    {field: 'country'},
  ];
  // id!: string;
  // name!: string;
  // description!: string;
  // domain!: string;
  // primaryContactName!: string;
  // primaryContactEmail!: string;
  rowData = [];
  tenants: import('/home/surbhi.sharma1/angular-boilerplate/projects/arc-lib/src/public-api').AnyObject[];

  constructor(
    protected override readonly location: Location,
    protected override readonly route: ActivatedRoute,
    private readonly router: Router,
    private readonly onboardingService: OnBoardingService,
  ) {
    super(route, location);
  }

  ngOnInit(): void {
    this.getTenants();
  }

  getTenants() {
    this.onboardingService
      .getLeadList()
      .pipe(takeUntil(this._destroy$))
      .subscribe(res => {
        this.rowData = res;
      });
  }
}
