import {Location} from '@angular/common';
import {Component} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {AuthService} from '@boiler/core/auth';
import {RouteComponentBaseDirective} from '@boiler/core/route-component-base';

@Component({
  selector: 'boiler-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent extends RouteComponentBaseDirective {
  constructor(
    override readonly route: ActivatedRoute,
    override readonly location: Location,
    private readonly authService: AuthService,
  ) {
    super(route, location);
  }

  loginViaGoogle() {
    this.authService.loginViaGoogle();
  }
}
