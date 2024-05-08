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
  subscriptionPlans = [];
  leadId = '';
  constructor(
    private route: ActivatedRoute,
    private toastrService: NbToastrService,
    private readonly router: Router,
    private location: Location,
    private fb: FormBuilder,
    private onboardingService: OnBoardingService,
  ) {
    this.addTenantForm = this.fb.group({
      key: ['', Validators.required],
      domains: ['', Validators.required],
      planId: [null],
    });
  }
  ngOnInit() {
    this.getRadioOptions();
    this.route.params.subscribe(params => {
      this.leadId = params['leadId'];
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
      if (typeof domainData.domains === 'string') {
        domainData.domains = [domainData.domains];
      }
      this.onboardingService
        .addTenant(domainData, this.leadId)

        .subscribe(() => {
          this.router.navigate(['/tenant/registration/complete']);
        });
    }
  }
}
