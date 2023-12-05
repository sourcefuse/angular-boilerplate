import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '@project-lib/core/auth';
import { RouteComponentBaseDirective } from '@project-lib/core/route-component-base';
import {Location} from '@angular/common';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { concatMap, throwError } from 'rxjs';

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

  

  onSubmit(){
 
    if (this.signupForm.valid) {
      const userData = this.signupForm.value;
      // this.authService.createToken(userData).pipe(
      //   concatMap(response => {
          // if (response.body && response.body.code) {
            this.authService.createExternalUser(userData).subscribe(
        (resp)=>{
          // Handle successful login response
          console.log('signup successful:', resp);
          this.router.navigate(['/auth/login']);
        },
        (error) => {
          debugger;  // Set a breakpoint here
          // Handle login error
          console.error('signup error:', error);
        }
      );
    }
  }
  
  loginViaGoogle() {
    this.authService.loginViaGoogle();
  }

}
