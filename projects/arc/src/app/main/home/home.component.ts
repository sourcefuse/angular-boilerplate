import {Location} from '@angular/common';
import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {AuthService, LoggedInUserDM} from '@project-lib/core/auth';
import {RouteComponentBaseDirective} from '@project-lib/core/route-component-base';
import {takeUntil} from 'rxjs';

@Component({
  selector: 'home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent
  extends RouteComponentBaseDirective
  implements OnInit
{
  imageUrl: string;
  altText: string;
  constructor(
    override readonly route: ActivatedRoute,
    override readonly location: Location,
    private readonly router: Router,
    private readonly authService: AuthService,
  ) {
    super(route, location);
    this.imageUrl = '../../../assets/images/home/home-banner.png';

    this.altText = 'homepage-illustration';
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
    const data: [number, string][] = [
        [21, 'Good Night'],
        [16, 'Good Evening'],
        [12, 'Good Afternoon'],
        [5, 'Good Morning'],
        [0, 'Good Night'],
      ],
      hr = new Date().getHours();
    for (const [hour, greeting] of data) {
      if (hr >= hour) {
        return greeting;
      }
    }
    // sonarignore:end
    return 'Good morning';
  }
}
