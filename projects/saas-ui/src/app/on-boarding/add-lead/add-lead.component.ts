import {Component} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {NbToastrService} from '@nebular/theme';
import {Location} from '@angular/common';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-add-lead',
  templateUrl: './add-lead.component.html',
  styleUrls: ['./add-lead.component.scss'],
})
export class AddLeadComponent {
  addLeadForm: FormGroup;

  constructor(
    private route: ActivatedRoute,
    private toastrService: NbToastrService,
    private readonly router: Router,
    private location: Location,
    private fb: FormBuilder,
  ) {
    this.addLeadForm = this.fb.group({
      firstname: ['', [Validators.required]],
      lastname: ['', [Validators.required]],
      companyName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      address: ['', Validators.required],
      country: ['', Validators.required],
      state: ['', Validators.required],
      city: ['', Validators.required],
      zip: ['', Validators.required],
      // id: ['', Validators.required],
      // tenantid: ['', Validators.required],
    });
  }

  onSubmit() {
    if (this.addLeadForm.valid) {
      const userData = this.addLeadForm.value;
      console.log(userData);
    }
  }
}
