import {Component, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import { ThemeModule } from '@project-lib/theme/theme.module';
import { ActivatedRoute, Router } from '@angular/router';
import { NbSidebarService, NbMenuService, NbMenuItem } from '@nebular/theme';
import { AuthService, LoggedInUserDM } from '@project-lib/core/auth';
import { RouteComponentBaseDirective } from '@project-lib/core/route-component-base';
import { IconPacksManagerService } from '@project-lib/theme/services';
import { takeUntil } from 'rxjs';
import {Location} from '@angular/common';

@Component({
  selector: 'lib-header',
  standalone: true,
  imports: [CommonModule, ThemeModule],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent
  extends RouteComponentBaseDirective
  implements OnInit
{
  toggleFooter = false;
  loggedInUserDM: LoggedInUserDM = new LoggedInUserDM();
  userMenu: NbMenuItem[] = [{ title: 'Log out', data: 'logout' }]; //dynamic krna hai ,
  // dusry project mai b chala hai
  //header place change   ------Done
  //css variable
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

  ngOnInit(): void {
    this.authService
      .currentUser()
      .pipe(takeUntil(this._destroy$))
      .subscribe(usr => {
        this.loggedInUserDM = usr;
      });
    // this.menuService
    //   .onItemClick()
    //   .pipe(takeUntil(this._destroy$))
    //   .subscribe(menu => {
    //     console.log(menu);
    //     if (menu.tag === 'userMenu' && menu.item.data === 'logout') {
    //       this.authService.logout().pipe(takeUntil(this._destroy$)).subscribe();
    //     }
    //   });
  }
}
