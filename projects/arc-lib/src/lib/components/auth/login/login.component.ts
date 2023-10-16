import {Location} from '@angular/common';
import {Component, Inject} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {AuthService} from '@project-lib/core/auth';
import {RouteComponentBaseDirective} from '@project-lib/core/route-component-base';

// import { APP_BASE_HREF } from '@angular/common';

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent extends RouteComponentBaseDirective {
  constructor(
    override readonly route: ActivatedRoute,
    override readonly location: Location,
    private readonly authService: AuthService,
  //   @Inject(APP_BASE_HREF)
  //   private baseHref: string
  ) {
    super(route, location);
  }
 image="../../../assets/images/auth/angular.png"
//  ""
//  projects/arc-lib/src/lib/assets/images/auth/angular.png
  loginViaGoogle() {
    this.authService.loginViaGoogle();
  }
}
