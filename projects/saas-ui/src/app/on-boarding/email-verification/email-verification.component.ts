import {Component} from '@angular/core';
import {FormBuilder} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';

import {Location} from '@angular/common';
import {AuthService} from '../../shared /auth/auth.service';

@Component({
  selector: 'app-email-verification',
  templateUrl: './email-verification.component.html',
  styleUrls: ['./email-verification.component.scss'],
})
export class EmailVerificationComponent {
  constructor(
    private route: ActivatedRoute,
    private location: Location,
    private readonly authService: AuthService,
    private readonly router: Router,
    private fb: FormBuilder,
  ) {}

  completeRegistration() {
    this.router.navigate(['/tenant/add-tenant']);
  }
}
