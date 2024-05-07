import {Location} from '@angular/common';
import {Component} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {concatMap, throwError} from 'rxjs';

import {RouteComponentBaseDirective} from '@project-lib/core/route-component-base';
import {AuthService} from '@project-lib/core/auth';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent extends RouteComponentBaseDirective {
  loginForm: FormGroup;
  imageUrl: string;
  altText: string;
  constructor(
    override readonly route: ActivatedRoute,
    override readonly location: Location,
    private readonly authService: AuthService,
    private readonly router: Router,
    private fb: FormBuilder,
  ) {
    super(route, location);
    this.imageUrl = '../../../assets/images/auth/ARC_logo.png';
    this.altText = 'logo';
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: [
        '',
        [
          Validators.required,
          Validators.minLength(6),
          Validators.pattern(
            '(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&#])[A-Za-zd$@$!%*?&].{7,}',
          ),
        ],
      ],
    });
  }

  showPassword = false;

  onSubmit() {
    // TOdo
  }

  // function to show and hide password
  getInputType() {
    if (this.showPassword) {
      return 'text';
    }
    return 'password';
  }

  toggleShowPassword() {
    this.showPassword = !this.showPassword;
  }

  loginViaCognito() {
    this.authService.loginViaCognito();
  }

  withoutLogin() {
    this.router.navigate(['/tenant/add-lead']);
  }
}
