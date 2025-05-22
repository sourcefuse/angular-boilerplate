import {Component} from '@angular/core';
import {COMPONENTS_ITEMS} from '../constants/components.constant';
import {ActivatedRoute, Router, NavigationEnd} from '@angular/router';
import {NEBULAR_COMP_ITEMS} from '../constants/nebularComponents.constants';
import {CommonModule} from '@angular/common';
import {NbCardModule} from '@nebular/theme';
import {BreadcrumbsComponent} from 'projects/arc-lib/src/lib/components/breadcrumbs/breadcrumbs.component';
import {RouterModule} from '@angular/router';
import {filter} from 'rxjs/operators';

@Component({
  selector: 'arc-introduction',
  standalone: true,
  imports: [CommonModule, NbCardModule, BreadcrumbsComponent, RouterModule],
  templateUrl: './introduction.component.html',
  styleUrls: ['./introduction.component.scss'],
})
export class IntroductionComponent {
  config = [];
  hasChildRoute = false;
  constructor(
    private router: Router,
    private route: ActivatedRoute,
  ) {}

  ngOnInit() {
    this.loadConfig();
    this.hasChildRoute =
      this.route.firstChild &&
      this.route.firstChild.snapshot.routeConfig?.path !== '';

    this.router.events
      .pipe(filter(e => e instanceof NavigationEnd))
      .subscribe(() => {
        this.loadConfig();
        this.hasChildRoute =
          this.route.firstChild &&
          this.route.firstChild.snapshot.routeConfig?.path !== '';
      });
  }

  loadConfig() {
    if (this.router.url.includes('arc-comp')) {
      this.config = COMPONENTS_ITEMS;
    } else {
      this.config = NEBULAR_COMP_ITEMS;
    }
  }

  redirectComponent(c) {
    if (c.url) {
      // Open external URL in a new tab
      window.open(c.url, '_blank');
    } else {
      // Navigate to local link using Angular Router
      this.router.navigate([c.link]);
    }
    console.log(this.route.snapshot);
  }
}
