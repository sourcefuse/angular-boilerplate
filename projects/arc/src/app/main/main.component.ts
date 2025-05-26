import {Location} from '@angular/common';
import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {NbMenuItem, NbMenuService, NbSidebarService} from '@nebular/theme';
import {takeUntil} from 'rxjs';
import {AuthService, LoggedInUserDM} from '@project-lib/core/auth';
import {RouteComponentBaseDirective} from '@project-lib/core/route-component-base';
import {IconPacksManagerService} from '@project-lib/theme/services';
import {SIDEBAR_MENU_ITEMS} from '@project-lib/core/constants/sidebar-menu.constant';

@Component({
  selector: 'main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
})
export class MainComponent
  extends RouteComponentBaseDirective
  implements OnInit
{
  toggleFooter = false;
  constructor(
    override readonly route: ActivatedRoute,
    override readonly location: Location,
    private readonly sidebarService: NbSidebarService,
    private readonly authService: AuthService,
    private readonly menuService: NbMenuService,
    private readonly iconMgr: IconPacksManagerService,
    private readonly router: Router,
  ) {
    super(route, location);
    this.iconMgr.registerSvgs();
  }
  loggedInUserDM: LoggedInUserDM = new LoggedInUserDM();
  userMenu: NbMenuItem[] = [{title: 'Log out', data: 'logout'}];
  menu: NbMenuItem[] = SIDEBAR_MENU_ITEMS;

  ngOnInit(): void {
    this.menuService
      .onItemClick()
      .pipe(takeUntil(this._destroy$))
      .subscribe(menu => {
        if (menu.tag === 'userMenu' && menu.item.data === 'logout') {
          this.authService.logout().pipe(takeUntil(this._destroy$)).subscribe();
        }
      });
  }
}
