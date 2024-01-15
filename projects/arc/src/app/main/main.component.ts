import {Location} from '@angular/common';
import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {NbMenuItem, NbMenuService, NbSidebarService} from '@nebular/theme';
import {takeUntil} from 'rxjs';
import {AuthService, LoggedInUserDM} from '@project-lib/core/auth';
import {RouteComponentBaseDirective} from '@project-lib/core/route-component-base';
import {IconPacksManagerService} from '@project-lib/theme/services';
import {COMPONENTS_ITEMS} from './constants/components.constant';
import {NEBULAR_COMP_ITEMS} from './constants/nebularComponents.constants';

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
    private router: Router,
  ) {
    super(route, location);
    this.iconMgr.registerSvgs();
  }

  loggedInUserDM: LoggedInUserDM = new LoggedInUserDM();
  userMenu: NbMenuItem[] = [{title: 'Log out', data: 'logout'}];
  menu: NbMenuItem[] = [
    {
      title: 'Home',
      icon: 'book-outline',
      link: '/main/home',
      home: true,
      pathMatch: 'prefix',
    },
    {
      title: 'Components',
      icon: 'fab fa-buromobelexperte',
      link: '/main/components',
      home: true,
      pathMatch: 'prefix',
      children: [
        {
          title: 'Nebular Components',
          link: '/nebular-comp',
          children: NEBULAR_COMP_ITEMS as NbMenuItem[],
        },
        {
          title: ' Arc Components',
          link: '/arc-comp',
          children: COMPONENTS_ITEMS as NbMenuItem[],
        },
      ],
    },
  ];

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
    this.menuService
      .onItemClick()
      .pipe(takeUntil(this._destroy$))
      .subscribe(menu => {
        console.log(menu);
        if (menu.tag === 'userMenu' && menu.item.data === 'logout') {
          this.authService.logout().pipe(takeUntil(this._destroy$)).subscribe();
        }
      });
  }
}
