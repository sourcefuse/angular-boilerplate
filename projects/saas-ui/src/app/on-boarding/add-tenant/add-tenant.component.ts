import {Component} from '@angular/core';
import {Validators, FormBuilder, FormGroup} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {NbToastrService} from '@nebular/theme';
import {Location} from '@angular/common';
import {takeUntil} from 'rxjs';
import {OnBoardingService} from '../on-boarding-service';
import {TenantFacadeService} from '../../main/tenant-list/tenant-list-facade.service';

@Component({
  selector: 'app-add-tenant',
  templateUrl: './add-tenant.component.html',
  styleUrls: ['./add-tenant.component.scss'],
})
export class AddTenantComponent {
  [x: string]: any;
  addTenantForm: FormGroup;
  leadId = '';
  // this.getRouteParam('leadId') ?? '';
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
      selectedPlan: [''],
    });
  }

  subscriptionPlans = [
    {
      name: 'Basic',
      price: '$10/month',
      features: ['Feature 1', 'Feature 2', 'Feature 3'],
    },
    {
      name: 'Standard',
      price: '$20/month',
      features: ['Feature 1', 'Feature 2', 'Feature 3', 'Feature 4'],
    },
    {
      name: 'Premium',
      price: '$30/month',
      features: [
        'Feature 1',
        'Feature 2',
        'Feature 3',
        'Feature 4',
        'Feature 5',
      ],
    },
  ];

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
