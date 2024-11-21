import {Component} from '@angular/core';
import {Router} from '@angular/router';
import {AnyObject} from '@project-lib/core/api';
import {ToasterService} from '@project-lib/theme/toaster';
import {ICellRendererAngularComp} from 'ag-grid-angular';
import {GridApi, ICellRendererParams} from 'ag-grid-community';
import {BillingPlanService} from '../../../shared/services';
import {Location} from '@angular/common';

@Component({
  selector: 'app-resend-reminder-button',
  templateUrl: './resend-reminder-button.component.html',
  styleUrls: ['./resend-reminder-button.component.scss'],
})
export class ResendReminderButtonComponent implements ICellRendererAngularComp {
  params: AnyObject;
  gridApi: GridApi;

  constructor(
    private router: Router,
    private toastrService: ToasterService,
    private billingPlanService: BillingPlanService,
    private location: Location,
  ) {}
  refresh(params: ICellRendererParams) {
    return true;
  }

  agInit(params: ICellRendererParams): void {
    this.params = params;
  }
  resendEmail(e) {
    const rowDataId = this.params.node.data.id;
    this.router.navigate([`/tenant/add-lead/emailHasBeenSent/${rowDataId}`]);
  }
  onGridReady(params) {
    this.gridApi = params.api;
  }
}
