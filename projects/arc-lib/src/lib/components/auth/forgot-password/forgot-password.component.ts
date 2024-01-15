import {Component, OnInit} from '@angular/core';
import {Location} from '@angular/common';
import {ActivatedRoute, Router} from '@angular/router';
import {AuthService} from '@project-lib/core/auth';
import {RouteComponentBaseDirective} from '@project-lib/core/route-component-base';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {NbToastrService} from '@nebular/theme';

@Component({
  selector: 'lib-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss'],
})
export class ForgotPasswordComponent
  extends RouteComponentBaseDirective
  implements OnInit
{
  forgotPasswordForm: FormGroup;
  imageUrl: string;
  altText: string;
  constructor(
    override readonly route: ActivatedRoute,
    override readonly location: Location,
    private readonly authService: AuthService,
    private readonly router: Router,
    private fb: FormBuilder,
    private toastrService: NbToastrService,
  ) {
    super(route, location);
    this.imageUrl = '../../../assets/images/auth/ARC_logo.png';
    this.altText = 'logo';
  }
  ngOnInit(): void {
    this.forgotPasswordForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
    });
  }

  onSubmit() {
    if (this.forgotPasswordForm.valid) {
      const email = this.forgotPasswordForm.value.email;
      this.authService.forgetPasswordReq(email).subscribe(
        () => {
          // Handle successful link sending
          this.toastrService.success(
            'Reset Password link sent successfully',
            'Success',
          );
        },
        () => {
          // Handle error
          this.toastrService.danger(
            'Error sending reset password link',
            'Error',
          );
        },
      );
    }
  }
}
