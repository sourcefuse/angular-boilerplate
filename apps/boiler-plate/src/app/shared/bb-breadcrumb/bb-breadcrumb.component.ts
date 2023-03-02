import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, NavigationEnd, Router} from '@angular/router';
import {distinctUntilChanged, filter} from 'rxjs';
import {IBreadCrumb} from './breadcrumb-interface';

@Component({
  selector: 'boiler-bb-breadcrumb',
  templateUrl: './bb-breadcrumb.component.html',
  styleUrls: ['./bb-breadcrumb.component.scss'],
})
export class BbBreadcrumbComponent implements OnInit {
  public breadcrumbs: IBreadCrumb[];

  constructor(private router: Router, private activatedRoute: ActivatedRoute) {
    this.breadcrumbs = this.buildBreadCrumb(this.activatedRoute.root);
  }

  ngOnInit() {
    this.router.events
      .pipe(
        filter(event => event instanceof NavigationEnd),
        distinctUntilChanged(),
      )
      .subscribe(() => {
        this.breadcrumbs = this.buildBreadCrumb(this.activatedRoute.root);
      });
  }

  onClick(url: string) {
    if (url != '') this.router.navigate([url]);
  }

  buildBreadCrumb(
    route?: ActivatedRoute,
    url = '',
    breadcrumbs: IBreadCrumb[] = [],
  ): IBreadCrumb[] {
    if (!route) {
      return [];
    }
    let label = route.routeConfig?.data?.['breadcrumb'] ?? '';
    let path = route.routeConfig?.path;

    // If the route is dynamic route such as ':id', remove it
    const lastRoutePart = path?.split('/').pop()!;
    const isDynamicRoute = lastRoutePart?.startsWith(':');
    // NEEDS TO BE REFACTORED / OPTIMIZED
    // WHEN THERE WILL BE MULTIPLE IDs THEN IT WILL NOT WORK
    const sliceValue = -2;
    const seclastRoutePart = path?.split('/').slice(sliceValue, -1)[0]!;
    if (isDynamicRoute && !!route.snapshot) {
      const paramName = lastRoutePart.split(':')[1];
      path = path?.replace(lastRoutePart, route.snapshot.params[paramName]);
      const paramId = seclastRoutePart.split(':')[1];
      path = path?.replace(seclastRoutePart, route.snapshot.params[paramId]);

      label = route.snapshot.params[paramName];
    }

    //In the routeConfig the complete path is not available,
    //so we rebuild it each time
    // let urlpart = route.routeConfig && route.routeConfig.data && route.routeConfig.data['pathInitiate']

    let nextUrl = path ? `${url}/${path}` : `${url}`;
    const breadcrumb: IBreadCrumb = {
      label: label,
      url: nextUrl,
    };
    // Only adding route with non-empty label
    const newBreadcrumbs = breadcrumb.label
      ? [...breadcrumbs, breadcrumb]
      : [...breadcrumbs];

    if (route?.firstChild) {
      if (route.routeConfig?.data?.['pathInitiate']) {
        let pathinitiate = route.routeConfig.data['pathInitiate'];
        newBreadcrumbs.forEach((item, index) => {
          if (!newBreadcrumbs[index]['url'].includes(`/${pathinitiate}`)) {
            newBreadcrumbs[index][
              'url'
            ] = `/${pathinitiate}${newBreadcrumbs[index]['url']}`;
          }
        });
      }
      //there will be more children to look after, to build our breadcumb
      return this.buildBreadCrumb(route.firstChild, nextUrl, newBreadcrumbs);
    }
    let lastOffset = newBreadcrumbs.length - 1;
    newBreadcrumbs.forEach((item, index) => {
      if (index == lastOffset) {
        newBreadcrumbs[index]['url'] = '';
      }
    });
    return newBreadcrumbs;
  }
}
