import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, NavigationEnd, Router} from '@angular/router';
import {BehaviorSubject} from 'rxjs';
import {filter} from 'rxjs/operators';
import {Breadcrumb} from './breadcrumb.interface';

@Injectable({providedIn: 'root'})
export class BreadcrumbService {
  private readonly breadcrumbs$ = new BehaviorSubject<Breadcrumb[]>([]);

  constructor(private readonly router: Router) {
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe(() => {
        const root = this.router.routerState.snapshot.root;
        const breadcrumbs = this.buildBreadcrumbs(root);
        this.breadcrumbs$.next(breadcrumbs);
      });
  }

  private buildBreadcrumbs(
    route: ActivatedRouteSnapshot,
    url = '',
    breadcrumbs: Breadcrumb[] = [],
  ): Breadcrumb[] {
    if (!route.routeConfig) {
      return route.firstChild
        ? this.buildBreadcrumbs(route.firstChild, url, breadcrumbs)
        : breadcrumbs;
    }

    let path = route.routeConfig.path || '';
    Object.keys(route.params).forEach(key => {
      path = path.replace(`:${key}`, route.params[key]);
    });
    const nextUrl = path ? `${url}/${path}` : url;
    const label = this._resolveLabel(route, path);
    const skipLink = route.routeConfig.data?.['skipLink'] ?? false;

    if (label) {
      breadcrumbs.push({label, url: nextUrl, skipLink});
    }

    return route.firstChild
      ? this.buildBreadcrumbs(route.firstChild, nextUrl, breadcrumbs)
      : breadcrumbs;
  }

  private _toTitleCase(str: string): string {
    return str.replace(/-/g, ' ').replace(/\b\w/g, char => char.toUpperCase());
  }

  private _resolveLabel(route: ActivatedRouteSnapshot, path: string): string {
    const breadcrumbData = route.routeConfig.data?.['breadcrumb'];

    if (typeof breadcrumbData === 'function') {
      return breadcrumbData(route.data, route.paramMap, route);
    }
    if (typeof breadcrumbData === 'string') {
      return breadcrumbData;
    }
    if (route.routeConfig.path?.startsWith(':')) {
      const paramName = route.routeConfig.path.slice(1);
      return route.params[paramName] ?? paramName;
    }
    return this._toTitleCase(path);
  }

  get breadcrumbs() {
    return this.breadcrumbs$.asObservable();
  }
}
