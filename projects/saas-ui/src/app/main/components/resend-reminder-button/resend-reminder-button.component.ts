import {Component} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {AnyObject} from '@project-lib/core/api';
import {ToasterService} from '@project-lib/theme/toaster';
import {ICellRendererAngularComp} from 'ag-grid-angular';
import {GridApi, ICellRendererParams} from 'ag-grid-community';
import {BillingPlanService, OnBoardingService} from '../../../shared/services';
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
    private route: ActivatedRoute,
    private readonly onBoardingService: OnBoardingService,
  ) {}
  refresh(params: ICellRendererParams) {
    return true;
  }

  agInit(params: ICellRendererParams): void {
    this.params = params;
  }
  resendEmail(e) {
    // const rowDataId = this.route.snapshot.paramMap.get('id')!;
    const rowDataId = this.params.node.data.id;
    console.log(rowDataId);
    this.onBoardingService
      .resendValidateEmail(rowDataId)
      .subscribe(respLead => {
        console.log(respLead);
      });
    this.toastrService.show('The email has been sent successfully.');
  }
  onGridReady(params) {
    this.gridApi = params.api;
  }
}
