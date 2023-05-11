import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NbMenuItem, NbMenuService, NbSidebarService } from '@nebular/theme';
import { takeUntil } from 'rxjs';
import { AuthService, LoggedInUserDM } from '@main-project/core/auth';
import { RouteComponentBaseDirective } from '@main-project/core/route-component-base';
import { IconPacksManagerService } from '@main-project/theme/services';

@Component({
  selector: 'boiler-main',
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
    private readonly iconMgr: IconPacksManagerService
  ) {
    super(route, location);
    this.iconMgr.registerSvgs();
  }

  loggedInUserDM: LoggedInUserDM = new LoggedInUserDM();
  userMenu: NbMenuItem[] = [{ title: 'Log out', data: 'logout' }];
  menu: NbMenuItem[] = [
    {
      title: 'Home',
      icon: 'book-outline',
      link: '/main/home',
      home: true,
      pathMatch: 'prefix',
    },
  ];

  toggle() {
    this.sidebarService.toggle(true, 'right');
    this.toggleFooter = !this.toggleFooter;
  }

  ngOnInit(): void {
    // this.authService
    //   .currentUser()
    //   .pipe(takeUntil(this._destroy$))
    //   .subscribe((usr) => {
    //     this.loggedInUserDM = usr;
    //   });
    // this.menuService
    //   .onItemClick()
    //   .pipe(takeUntil(this._destroy$))
    //   .subscribe((menu) => {
    //     if (menu.tag === 'userMenu' && menu.item.data === 'logout') {
    //       this.authService.logout().pipe(takeUntil(this._destroy$)).subscribe();
    //     }
    //   });
  }
}
