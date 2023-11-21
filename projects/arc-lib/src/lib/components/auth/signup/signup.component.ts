import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '@project-lib/core/auth';
import { RouteComponentBaseDirective } from '@project-lib/core/route-component-base';
import {Location} from '@angular/common';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'lib-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent extends RouteComponentBaseDirective {
  signupForm: FormGroup;
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
  this.signupForm = this.fb.group({
    firstName: ['',[Validators.required]],
    lastName: ['',Validators.required],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]],
  })
  }

  signUp(){
    // this.router.navigate(['auth/login']);
  }

  onSubmit(){
    debugger;  // Set a breakpoint here
    if (this.signupForm.valid) {
      const credentials = this.signupForm.value;
      {
        console.log(credentials);
      }
      // this.authService.signup("", "").subscribe(
      //   (response) => {
      //     debugger;  // Set a breakpoint here
      //     // Handle successful login response
      //     console.log('Login successful:', response);
      //   },
      //   (error) => {
      //     debugger;  // Set a breakpoint here
      //     // Handle login error
      //     console.error('Login error:', error);
      //   }
      // );
    }
  }
  
  loginViaGoogle() {
    this.authService.loginViaGoogle();
  }

}
