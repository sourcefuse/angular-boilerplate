import {Component} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {TitleDetails} from '../user-title.interface';
import {TitleService} from './user-title.service';

@Component({
  selector: 'lib-user-title',
  templateUrl: './user-title.component.html',
})
export class UserTitleComponent {
  title: TitleDetails;
  constructor(
    private readonly route: ActivatedRoute,
    private readonly titleService: TitleService,
  ) {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.titleService.getTitleById(id).subscribe(title => {
        this.title = title;
      });
    }
  }
}
