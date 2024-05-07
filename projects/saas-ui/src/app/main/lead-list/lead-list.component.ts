import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {RouteComponentBaseDirective} from '@project-lib/core/route-component-base';
import {ColDef} from 'ag-grid-community';
import {Location} from '@angular/common';
import {takeUntil} from 'rxjs';
import {OnBoardingService} from '../../on-boarding/on-boarding-service';
import {Lead} from '../../on-boarding/models';
import {AnyObject, BackendFilter} from '@project-lib/core/index';

@Component({
  selector: 'app-lead',
  templateUrl: './lead-list.component.html',
  styleUrls: ['./lead-list.component.scss'],
})
export class LeadListComponent
  extends RouteComponentBaseDirective
  implements OnInit
{
  // defining column names here
  colDefs: ColDef[] = [
    {field: 'firstName', width: 200, minWidth: 20},
    {field: 'lastName', width: 200, minWidth: 20},
    {field: 'companyName', width: 200, minWidth: 20},
    {field: 'email', width: 200, minWidth: 20},
    {field: 'country', width: 200, minWidth: 20},
  ];

  rowData = [];
  tenants: AnyObject[];
  filter: BackendFilter<Lead> = {
    include: [{relation: 'address'}],
  };
  constructor(
    protected override readonly location: Location,
    protected override readonly route: ActivatedRoute,
    private readonly onboardingService: OnBoardingService,
  ) {
    super(route, location);
  }

  ngOnInit(): void {
    this.getTenants();
  }

  getTenants() {
    this.onboardingService
      .getLeadList(null, null, this.filter)
      .pipe(takeUntil(this._destroy$))
      .subscribe(res => {
        const data = res;
        this.rowData = data.map(item => ({
          firstName: item.firstName,
          lastName: item.lastName,
          companyName: item.companyName,
          email: item.email,
          country: item.address.country,
        }));
      });
  }
}
