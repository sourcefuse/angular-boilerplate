import {CommonModule} from '@angular/common';
import {Component} from '@angular/core';
import {ActivatedRoute, RouterModule} from '@angular/router';
import {User} from '../user-title.interface';
import {UserResolver} from './user.resolver';

@Component({
  selector: 'lib-user',
  standalone: true,
  templateUrl: './user.component.html',
  imports: [CommonModule, RouterModule],
})
export class UserComponent {
  user: User;

  constructor(private readonly route: ActivatedRoute) {
    this.user = this.route.snapshot.data['user'];
  }
}
