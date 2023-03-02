import {Location} from '@angular/common';
import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {AuthService, LoggedInUserDM} from '@boiler/core/auth';
import {RouteComponentBaseDirective} from '@boiler/core/route-component-base';
import {takeUntil} from 'rxjs';

@Component({
  selector: 'boiler-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent
  extends RouteComponentBaseDirective
  implements OnInit
{
  constructor(
    override readonly route: ActivatedRoute,
    override readonly location: Location,
    private readonly router: Router,
    private readonly authService: AuthService,
  ) {
    super(route, location);
  }

  loggedInUserDM: LoggedInUserDM = new LoggedInUserDM();
  greeting = '';

  ngOnInit(): void {
    this.authService
      .currentUser()
      .pipe(takeUntil(this._destroy$))
      .subscribe(usr => {
        this.loggedInUserDM = usr;
        this.greeting = this.getGreetingText();
      });
  }

  getGreetingText() {
    // Intentionally ignored as this is needed to be done sequentially
    // sonarignore:start
    const data = [
        [21, 'Good Night'],
        [16, 'Good Evening'],
        [12, 'Good Afternoon'],
        [5, 'Good Morning'],
        [0, 'Good Night'],
      ],
      hr = new Date().getHours();
    for (let i = 0; i < data.length; i++) {
      if (hr >= data[i][0]) {
        return data[i][1] as string;
      }
    }
    // sonarignore:end
    return 'Good morning';
  }
}
