import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {NbMenuItem, NbMenuService, NbSidebarService} from '@nebular/theme';
import {AuthService} from '@project-lib/core/auth';
import {RouteComponentBaseDirective} from '@project-lib/core/route-component-base';
import {IconPacksManagerService} from '@project-lib/theme/services';
import {takeUntil} from 'rxjs';
import {Location} from '@angular/common';

import {DOCUMENTATION_MENU_ITEMS} from '../constants/docs-menu.constant';

@Component({
  selector: 'app-docs',
  templateUrl: './docs.component.html',
  styleUrls: ['./docs.component.scss'],
})
export class DocsComponent extends RouteComponentBaseDirective {
  constructor(
    override readonly route: ActivatedRoute,
    override readonly location: Location,
    private readonly iconMgr: IconPacksManagerService,
    private router: Router,
  ) {
    super(route, location);
    this.iconMgr.registerSvgs();
  }

  menu: NbMenuItem[] = DOCUMENTATION_MENU_ITEMS;
}
