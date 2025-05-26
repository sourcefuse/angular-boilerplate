import {CommonModule} from '@angular/common';
import {Component} from '@angular/core';
import {ActivatedRoute, RouterModule} from '@angular/router';

@Component({
  selector: 'lib-user',
  standalone: true,
  templateUrl: './user.component.html',
  imports: [CommonModule, RouterModule],
})
export class UserComponent {
  user: any;

  constructor(private readonly route: ActivatedRoute) {
    this.user = this.route.snapshot.data['user'];
  }
}
