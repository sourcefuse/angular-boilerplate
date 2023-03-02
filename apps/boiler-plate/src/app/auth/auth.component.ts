import {Location} from '@angular/common';
import {Component} from '@angular/core';
import {NbAuthComponent, NbAuthService} from '@nebular/auth';

@Component({
  selector: 'boiler-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss'],
})
export class AuthComponent extends NbAuthComponent {
  constructor(
    override readonly auth: NbAuthService,
    override readonly location: Location,
  ) {
    super(auth, location);
  }
}
