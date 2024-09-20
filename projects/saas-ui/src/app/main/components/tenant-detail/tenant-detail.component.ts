import {Component} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {TenantFacadeService} from '../../../shared/services';

@Component({
  selector: 'app-tenant-detail',
  templateUrl: './tenant-detail.component.html',
  styleUrls: ['./tenant-detail.component.scss'],
})
export class TenantDetailComponent {
  tenantDetailForm: FormGroup;
  tenantId: string;
  constructor(
    private fb: FormBuilder,
    private readonly router: Router,
    private readonly tenantFacade: TenantFacadeService,
    protected readonly route: ActivatedRoute,
  ) {}

  ngOnInit(): void {
    this.tenantId = this.route.snapshot.paramMap.get('id');
    this.tenantDetailForm = this.fb.group({
      tenantName: [''],
      name: [''],
      email: [''],
      country: [''],
      planName: [''],
      startDate: [''],
      endDate: [''],
      price: [''],
      tier: [''],
    });
    this.loadTenantData();
  }

  loadTenantData() {
    if (this.tenantId) {
      this.tenantFacade.getTenantDetails().subscribe(
        tenantList => {
          const tenantData = tenantList.find(
            tenant => tenant.id === this.tenantId,
          );
          if (tenantData) {
            const fullTenantName = [
              tenantData.contacts[0]?.firstName,
              '    ',
              tenantData.contacts[0]?.lastName,
            ]
              .filter(ele => ele != null && ele.trim() != '')
              .join(' ');
            const tenant = {
              tenantName: fullTenantName,
              name: tenantData.name,
              email: tenantData.contacts[0]?.email,
              country: tenantData.address?.country,
              planName: tenantData.subscription?.plan?.name,
              startDate: tenantData.subscription?.startDate
                ? new Date(
                    tenantData.subscription.startDate,
                  ).toLocaleDateString()
                : '',
              endDate: tenantData.subscription?.endDate
                ? new Date(tenantData.subscription.endDate).toLocaleDateString()
                : '',
              price: tenantData.subscription?.plan?.price,
            };
            this.tenantDetailForm.patchValue(tenant);
          }
        },
        error => {
          console.error('Error fetching tenant data:', error);
        },
      );
    }
  }

  backToPriviousPage() {
    console.log('Go back to the previous page');
    this.router.navigate(['main/onboard-tenant-list']);
  }
}
