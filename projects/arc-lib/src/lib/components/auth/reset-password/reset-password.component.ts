import { Component } from '@angular/core';
import {Location} from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '@project-lib/core/auth';
import { RouteComponentBaseDirective } from '@project-lib/core/route-component-base';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { CustomValidators } from '@project-lib/core/validators';

@Component({
  selector: 'lib-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent extends RouteComponentBaseDirective {
  resetPasswordForm: FormGroup;
  showPassword = false;
  showConfirmPassword = false;
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
      // 
      this.resetPasswordForm = new FormGroup(
        {
          password: new FormControl('', [
            Validators.required,
            Validators.minLength(6),
            Validators.pattern(
              '(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&#])[A-Za-zd$@$!%*?&].{7,}',
            ),
          ]),
          confirmPassword: new FormControl('', [
            Validators.required,
            Validators.minLength(6),
          ]),
        },
        [CustomValidators.match2Validators('password', 'confirmPassword')],
      );
    }

    onSubmit() {
      debugger;
      if (this.resetPasswordForm.valid) {

        const creds = this.resetPasswordForm.value;
        // Perform API call to set the new password
      this.authService.resetPassword("123",creds.password).subscribe((resp)=>{
        console.log(resp,"reset password successfull");
      });
      }
      
    }


    // to show and hide password 
toggleShowPassword() {
  this.showPassword = !this.showPassword;
}
toggleShowConfirmPassword() {
  this.showConfirmPassword = !this.showConfirmPassword;
}

getInputTypeShowPassword() {
  return this.showPassword ? 'text' : 'password';
}
getInputTypeConfirmShowPassword() {
  return this.showConfirmPassword ? 'text' : 'password';
}

}

