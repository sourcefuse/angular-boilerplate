import {Component, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ThemeModule} from '@project-lib/theme/theme.module';
import {
  NbActionsModule,
  NbMenuItem,
  NbMenuService,
  NbSidebarService,
} from '@nebular/theme';
import {COMPONENTS_ITEMS} from '@main-project/boiler/main/constants/components.constant';
import {NEBULAR_COMP_ITEMS} from '@main-project/boiler/main/constants/nebularComponents.constants';
import {ActivatedRoute, Router} from '@angular/router';
import {AuthService} from '@project-lib/core/auth';
import {IconPacksManagerService} from '@project-lib/theme/services';
import {takeUntil} from 'rxjs';
import {RouteComponentBaseDirective} from '@project-lib/core/route-component-base';
import {Location} from '@angular/common';
import {SIDEBAR_MENU_ITEMS} from '@project-lib/core/constants/sidebar-menu.constant';

@Component({
  selector: 'lib-sidebar',
  standalone: true,
  imports: [CommonModule, ThemeModule],
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent
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
  menu: NbMenuItem[] = SIDEBAR_MENU_ITEMS;

  ngOnInit(): void {
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
