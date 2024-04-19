import {Component} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {NbToastrService} from '@nebular/theme';
import {Location} from '@angular/common';

@Component({
  selector: 'app-plan-items',
  templateUrl: './plan-items.component.html',
  styleUrls: ['./plan-items.component.scss'],
})
export class PlanItemsComponent {
  addFeatureForm: FormGroup;

  constructor(
    private route: ActivatedRoute,
    private toastrService: NbToastrService,
    private readonly router: Router,
    private location: Location,
    private fb: FormBuilder,
  ) {
    this.addFeatureForm = this.fb.group({
      featureName: ['', Validators.required],
      featureDesc: ['', Validators.required],
    });
  }

  onSubmit() {
    if (this.addFeatureForm.valid) {
      const domainData = this.addFeatureForm.value;
      console.log(domainData);
    }
  }
}
