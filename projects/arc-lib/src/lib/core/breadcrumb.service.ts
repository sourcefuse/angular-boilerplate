import {Injectable} from '@angular/core';
import {ActivatedRoute, NavigationEnd, Router} from '@angular/router';
import {BehaviorSubject} from 'rxjs';
import {filter, map} from 'rxjs/operators';

export interface Breadcrumb {
  label: string;
  url: string;
}

@Injectable({providedIn: 'root'})
export class BreadcrumbService {
  private _breadcrumbs$ = new BehaviorSubject<Breadcrumb[]>([]);
  breadcrumbs$ = this._breadcrumbs$.asObservable();

  constructor(
    private router: Router,
    private route: ActivatedRoute,
  ) {
    this.router.events
      .pipe(
        filter(event => event instanceof NavigationEnd),
        map(() => this.buildBreadcrumbs(this.route.root)),
      )
      .subscribe(breadcrumbs => this._breadcrumbs$.next(breadcrumbs));
  }

  private buildBreadcrumbs(
    route: ActivatedRoute,
    url = '',
    breadcrumbs: Breadcrumb[] = [],
  ): Breadcrumb[] {
    const routeConfig = route.routeConfig;
    let currentUrl = url;
    if (routeConfig?.data?.breadcrumb) {
      let label = '';
      const path = routeConfig.path || '';
      currentUrl = `${url}/${path}`;
      const bc = routeConfig.data.breadcrumb;
      if (typeof bc === 'function') {
        // Pass resolved data, params, and snapshot for maximum flexibility
        label = bc(
          route.snapshot.data,
          route.snapshot.paramMap,
          route.snapshot,
        );
      } else {
        label = bc;
      }
      breadcrumbs.push({label, url: currentUrl});
    }
    return route.firstChild
      ? this.buildBreadcrumbs(route.firstChild, currentUrl, breadcrumbs)
      : breadcrumbs;
  }
}
