import {Component} from '@angular/core';
import {Router} from '@angular/router';
import {ToasterService} from '@project-lib/theme/toaster';
import {ICellRendererAngularComp} from 'ag-grid-angular';
import {GridApi, ICellRendererParams} from 'ag-grid-community';
import {BillingPlanService} from '../../../shared/services/billing-plan-service';
import {AddPlanComponent} from '../add-plan/add-plan.component';
import {FormBuilder, Validators} from '@angular/forms';
import {Location} from '@angular/common';
@Component({
  selector: 'app-button-renderer',
  templateUrl: './button-renderer.component.html',
  styleUrls: ['./button-renderer.component.scss'],
})
export class ButtonRendererComponent implements ICellRendererAngularComp {
  params: any;
  gridApi: GridApi;
  addPlanForm: any;
  constructor(
    private readonly router: Router,
    private toastrService: ToasterService,
    private readonly billingPlanService: BillingPlanService,
    private location: Location,
    private fb: FormBuilder,
  ) {
    this.addPlanForm = this.fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      price: ['', Validators.required],
      currencyId: ['', Validators.required],
      billingCycleId: [null, Validators.required],
      tier: [null, Validators.required],
    });
  }
  agInit(params: ICellRendererParams): void {
    this.params = params;
  }
  refresh(params: ICellRendererParams) {
    return true;
  }
  editPlan(e) {
    const rowDataId = this.params.node.data.id;
    this.router.navigate([`/main/edit-plan/${rowDataId}`]);
  }
  deletePlan(e) {
    alert('are you sure you want to delete this?');
    const selectedPlanId = this.params.node.data.id;
    this.billingPlanService.deletePlan(selectedPlanId).subscribe({
      next: () => {
        this.toastrService.success('Plan deleted successfully!');
        location.reload();
      },
      error: error => {
        this.toastrService.error('Failed to delete plan', 'Error');
      },
    });
  }
  onGridReady(params) {
    this.gridApi = params.api;
  }
}
