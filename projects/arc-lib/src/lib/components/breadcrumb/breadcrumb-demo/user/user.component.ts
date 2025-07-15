import {CommonModule} from '@angular/common';
import {Component} from '@angular/core';
import {ActivatedRoute, RouterModule} from '@angular/router';
import {UserDetails} from '../user-title.interface';
import {UserService} from './user.service';

@Component({
  selector: 'lib-user',
  standalone: true,
  templateUrl: './user.component.html',
  imports: [CommonModule, RouterModule],
})
export class UserComponent {
  user: UserDetails;

  constructor(
    private readonly route: ActivatedRoute,
    private readonly userService: UserService,
  ) {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.userService.getUserById(id).subscribe(user => {
        this.user = user;
      });
    }
  }
}
