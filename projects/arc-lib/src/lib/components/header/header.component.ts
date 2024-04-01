import {Component, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ThemeModule} from '@project-lib/theme/theme.module';
import {ActivatedRoute, Router} from '@angular/router';
import {NbSidebarService, NbMenuService, NbMenuItem} from '@nebular/theme';
import {AuthService, LoggedInUserDM} from '@project-lib/core/auth';
import {RouteComponentBaseDirective} from '@project-lib/core/route-component-base';
import {IconPacksManagerService} from '@project-lib/theme/services';
import {takeUntil} from 'rxjs';
import {Location} from '@angular/common';

@Component({
  selector: 'lib-header',
  standalone: true,
  imports: [CommonModule, ThemeModule],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent extends RouteComponentBaseDirective {
  toggleFooter = false;
  loggedInUserDM: LoggedInUserDM = new LoggedInUserDM();

  constructor(
    override readonly route: ActivatedRoute,
    override readonly location: Location,
    private readonly sidebarService: NbSidebarService,
    private readonly authService: AuthService,
    private readonly menuService: NbMenuService,
    private readonly iconMgr: IconPacksManagerService,
    private router: Router,
  ) {
    super(route, location);
    this.iconMgr.registerSvgs();
  }

  navigate(link: string) {
    this.router.navigate([link]);
  }

  toggle() {
    this.sidebarService.toggle(true, 'right');
    this.toggleFooter = !this.toggleFooter;
  }
}
