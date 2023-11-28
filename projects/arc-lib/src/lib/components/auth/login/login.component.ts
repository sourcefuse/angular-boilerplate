import {Location} from '@angular/common';
import {Component, Inject} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {AuthService} from '@project-lib/core/auth';
import {RouteComponentBaseDirective} from '@project-lib/core/route-component-base';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { concatMap, throwError } from 'rxjs';


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
    private fb: FormBuilder
 
  ) {
    super(route, location);
    this.imageUrl = '../../../assets/images/auth/ARC_logo.png'; 
    this.altText = 'logo';
    this.loginForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]],
  })
}

  
  showPassword = false;

  onSubmit() {
    if (this.loginForm.valid) {
      const credentials = this.loginForm.value;
      this.authService.login(credentials.email,credentials.password).pipe(
        concatMap(response => {
          if (response.body && response.body.code) {
             this.authService.authorize(response.body.code).subscribe();
          }
          return throwError('Unauthorized');
        }),
      ).subscribe(
        () => { 
          // Handle successful login response
          console.log('Login successful:');
        },
        (error) => {
          // Handle login error
          console.error('Login error:', error);
        }
      );
    }
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

  // function for login via google
  loginViaGoogle() {
    this.authService.loginViaGoogle();
  }
}
