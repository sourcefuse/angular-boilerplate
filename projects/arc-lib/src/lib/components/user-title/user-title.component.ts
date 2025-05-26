import {Component} from '@angular/core';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'lib-user-title',
  templateUrl: './user-title.component.html',
  styleUrls: ['./user-title.component.css'],
})
export class UserTitleComponent {
  title: any;
  constructor(private readonly route: ActivatedRoute) {
    this.title = this.route.snapshot.data['document'];
  }
}
