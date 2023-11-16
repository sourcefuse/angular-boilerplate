import { Component } from '@angular/core';

@Component({
  selector: 'lib-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent {
  image:string;
  altText:string;
constructor(){
    this.image="../../../images/auth/login-img.png" 
    this.altText="loginImg"
}
  
}
