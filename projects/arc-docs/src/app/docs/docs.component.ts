import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {NbMenuItem, NbMenuService, NbSidebarService} from '@nebular/theme';
import {AuthService} from '@project-lib/core/auth';
import {RouteComponentBaseDirective} from '@project-lib/core/route-component-base';
import {IconPacksManagerService} from '@project-lib/theme/services';
import {takeUntil} from 'rxjs';
import {Location} from '@angular/common';

@Component({
  selector: 'app-docs',
  templateUrl: './docs.component.html',
  styleUrls: ['./docs.component.scss'],
})
export class DocsComponent
  extends RouteComponentBaseDirective
  implements OnInit
{
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

  menu: NbMenuItem[] = [
    {
      title: 'Getting Started',
      icon: 'book-outline',
      // pathMatch: 'prefix',
      children: [
        {
          title: 'Introduction',
          link: '/docs/getting-started',
        },
      ],
    },
    {
      title: 'Guide',
      icon: 'book-outline',
      children: [
        {
          title: 'Cloning Boilerplate',
          link: '/docs/guide/clone',
        },
        {
          title: 'Backend Integration',
        },
      ],
    },
  ];

  ngOnInit(): void {
    this.menuService
      .onItemClick()
      .pipe(takeUntil(this._destroy$))
      .subscribe(menu => {
        console.log(menu);
      });
  }
}
