import {Component} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {NbMenuItem} from '@nebular/theme';
import {RouteComponentBaseDirective} from '@project-lib/core/route-component-base';
import {IconPacksManagerService} from '@project-lib/theme/services';
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
    private readonly router: Router,
  ) {
    super(route, location);
    this.iconMgr.registerSvgs();
  }

  menu: NbMenuItem[] = DOCUMENTATION_MENU_ITEMS;
}
