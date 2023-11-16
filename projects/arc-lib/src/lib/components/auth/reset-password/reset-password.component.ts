import { Component } from '@angular/core';
import {Location} from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '@project-lib/core/auth';
import { RouteComponentBaseDirective } from '@project-lib/core/route-component-base';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'lib-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent extends RouteComponentBaseDirective {
  resetPasswordForm: FormGroup;
    imageUrl: string;
    altText: string;
    constructor(
      override readonly route: ActivatedRoute,
      override readonly location: Location,
      private readonly authService: AuthService,
      private readonly router: Router,
      private fb: FormBuilder
   
    ) {
      super(route, location);
      this.imageUrl = '../../../assets/images/auth/ARC_logo.png'; 
    this.altText = 'logo';
    }

    ngOnInit() {
      this.resetPasswordForm = this.fb.group({
        newPassword: ['', [Validators.required, Validators.minLength(6)]],
        confirmPassword: ['', Validators.required],
      });
    }

    onSubmit() {
      debugger;
      if (this.resetPasswordForm.valid) {
        // Perform API call to set the new password
        const newPassword = this.resetPasswordForm.value.newPassword;
    
        // Call your service to set the new password
        // For demonstration purposes, you can log the new password to the console
        console.log('New Password set:', newPassword);
      }
    }

  resetPassword(){}

  showPassword = false;

  getInputType() {
    if (this.showPassword) {
      return 'text';
    }
    return 'password';
  }
  

  toggleShowPassword() {
    this.showPassword = !this.showPassword;
  }
}
