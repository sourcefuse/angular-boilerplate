import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, NavigationEnd, Router} from '@angular/router';
import {BehaviorSubject} from 'rxjs';
import {filter} from 'rxjs/operators';
import {Breadcrumb} from './breadcrump.interface';

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
    url='',
    breadcrumbs: Breadcrumb[] = [],
  ): Breadcrumb[] {
    if (!route.routeConfig) {
      if (route.firstChild) {
        return this.buildBreadcrumbs(route.firstChild, url, breadcrumbs);
      }
      return breadcrumbs;
    }

    let path = route.routeConfig.path || '';
    Object.keys(route.params).forEach(key => {
      path = path.replace(`:${key}`, route.params[key]);
    });
    const nextUrl = path ? `${url}/${path}` : url;

    const breadcrumbData = route.routeConfig.data?.['breadcrumb'];
    let label = '';

    if (typeof breadcrumbData === 'function') {
      label = breadcrumbData(route.data, route.paramMap, route);
    } else if (typeof breadcrumbData === 'string') {
      label = breadcrumbData;
    } else if (route.routeConfig.path?.startsWith(':')) {
      const paramName = route.routeConfig.path.slice(1);
      label = route.params[paramName] ?? paramName;
    } else {
      label = this.toTitleCase(path);
    }
    const skipLink = route.routeConfig.data?.['skipLink'] ?? false;

    if (label) {
      breadcrumbs.push({label, url: nextUrl, skipLink});
    }

    if (route.firstChild) {
      return this.buildBreadcrumbs(route.firstChild, nextUrl, breadcrumbs);
    }

    return breadcrumbs;
  }

  private toTitleCase(str: string): string {
    return str.replace(/-/g, ' ').replace(/\b\w/g, char => char.toUpperCase());
  }

  get breadcrumbs() {
    return this.breadcrumbs$.asObservable();
  }
}
