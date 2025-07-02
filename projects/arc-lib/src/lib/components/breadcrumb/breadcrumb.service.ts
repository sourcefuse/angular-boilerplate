import {Injectable, Injector} from '@angular/core';
import {ActivatedRouteSnapshot, NavigationEnd, Router} from '@angular/router';
import {BehaviorSubject, EMPTY, Observable} from 'rxjs';
import {catchError, filter, finalize, tap} from 'rxjs/operators';
import {Breadcrumb} from './breadcrumb.interface';

@Injectable({providedIn: 'root'})
export class BreadcrumbService {
  private readonly breadcrumbs$ = new BehaviorSubject<Breadcrumb[]>([]);
  private readonly loading$ = new BehaviorSubject<boolean>(false);

  constructor(
    private readonly router: Router,
    private readonly injector: Injector,
  ) {
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe(async () => {
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

    // Replace route params like :id with actual values
    Object.keys(route.params).forEach(key => {
      path = path.replace(`:${key}`, route.params[key]);
    });
    const nextUrl = path ? `${url}/${path}` : url;
    const label = this._resolveLabel(route, path, nextUrl);
    const skipLink = route.routeConfig.data?.['skipLink'] ?? false;
    const icon = route.routeConfig.data?.['icon'];

    if (label && label.trim() !== '') {
      breadcrumbs.push({label, url: nextUrl, skipLink, icon});
    }

    return route.firstChild
      ? this.buildBreadcrumbs(route.firstChild, nextUrl, breadcrumbs)
      : breadcrumbs;
  }

  private _toTitleCase(str: string): string {
    return str.replace(/-/g, ' ').replace(/\b\w/g, char => char.toUpperCase());
  }

  private _resolveLabel(
    route: ActivatedRouteSnapshot,
    path: string,
    currentUrl: string,
  ): string {
    const data = route.routeConfig?.data;

    //async breadcrumb logic
    const asyncConfig = data?.asyncBreadcrumb;
    if (asyncConfig?.service && asyncConfig?.method) {
      const params = route.paramMap;
      const paramValue = Object.fromEntries(
        params.keys.map(k => [k, params.get(k)]),
      );
      const fallback =
        asyncConfig.fallbackLabel?.(params) || this._toTitleCase(path);

      this.loading$.next(true);
      try {
        const serviceInstance = this.injector.get(asyncConfig.service);
        const result$ = serviceInstance[asyncConfig.method](paramValue);

        this.loading$.next(true);

        result$
          .pipe(
            tap(result =>
              this.updateBreadcrumbLabel(currentUrl, String(result)),
            ),
            catchError(error => {
              console.warn('Async breadcrumb load failed:', error);
              return EMPTY;
            }),
            finalize(() => this.loading$.next(false)),
          )
          .subscribe();
      } catch (error) {
        console.warn('Async breadcrumb load failed:', error);
        this.loading$.next(false);
      }

      return fallback;
    }
    const breadcrumbData = data?.['breadcrumb'];

    if (typeof breadcrumbData === 'string') {
      return breadcrumbData;
    }

    return this._toTitleCase(path);
  }
  updateBreadcrumbLabel(url: string, newLabel: string): void {
    const currentBreadcrumbs = this.breadcrumbs$.getValue();
    const index = currentBreadcrumbs.findIndex(bc => bc.url === url);
    if (index !== -1) {
      currentBreadcrumbs[index] = {
        ...currentBreadcrumbs[index],
        label: newLabel,
      };
      this.breadcrumbs$.next([...currentBreadcrumbs]);
    }
  }
  get breadcrumbs() {
    return this.breadcrumbs$.asObservable();
  }
  get loading(): Observable<boolean> {
    return this.loading$.asObservable();
  }
}
