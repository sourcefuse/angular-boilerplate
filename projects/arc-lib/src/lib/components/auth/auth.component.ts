import {Location} from '@angular/common';
import {Component} from '@angular/core';
import {NbAuthComponent, NbAuthService} from '@nebular/auth';

@Component({
  selector: 'auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss'],
})
export class AuthComponent extends NbAuthComponent {
  image:string;
  altText:string;
  constructor(
    override readonly auth: NbAuthService,
    override readonly location: Location,
  ) {
    super(auth, location);

  }
}
