import {Component} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Title} from '../user-title.interface';

@Component({
  selector: 'lib-user-title',
  templateUrl: './user-title.component.html',
})
export class UserTitleComponent {
  title: Title;
  constructor(private readonly route: ActivatedRoute) {
    this.title = this.route.snapshot.data['document'];
  }
}
