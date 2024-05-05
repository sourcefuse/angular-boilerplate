import {Component, OnInit} from '@angular/core';
import {FormGroup, FormBuilder, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {NbToastrService} from '@nebular/theme';
import {takeUntil} from 'rxjs';
import {TenantFacadeService} from '../../main/lead-list/tenant-list-facade.service';
import {OnBoardingService} from '../on-boarding-service';
import {Location} from '@angular/common';

@Component({
  selector: 'app-add-tenant',
  templateUrl: './add-tenant.component.html',
  styleUrls: ['./add-tenant.component.scss'],
})
export class AddTenantComponent implements OnInit {
  [x: string]: any;
  addTenantForm: FormGroup;
  leadId = '';
  subscriptionPlans = [];
  //getRouteParam('leadId') ?? '';
  constructor(
    private route: ActivatedRoute,
    private toastrService: NbToastrService,
    private readonly router: Router,
    private location: Location,
    private fb: FormBuilder,
    private onboardingService: OnBoardingService,
    private tenantFacade: TenantFacadeService,
  ) {
    this.addTenantForm = this.fb.group({
      key: ['', Validators.required],
      domain: ['', Validators.required],
      selectedPlan: [null],
    });
  }
  ngOnInit() {
    this.getRadioOptions();
    this.route.params.subscribe(params => {
      this.leadId = params.id;
    });
  }

  getRadioOptions() {
    this.onboardingService.getPlanOptions().subscribe(res => {
      this.subscriptionPlans = res;
    });
  }
  onSubmit() {
    if (this.addTenantForm.valid) {
      const domainData = this.addTenantForm.value;
      console.log(domainData);
      this.onboardingService
        .addTenant(domainData, this.leadId)
        .pipe(takeUntil(this._destroy$))
        .subscribe(() => {
          this.router.navigate(['/tenant/verify/complete']);
        });
    }
  }
}
