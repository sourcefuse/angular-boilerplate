import {Location} from '@angular/common';
import {ActivatedRoute} from '@angular/router';
import {environment} from '@boiler/env/environment';
import {filter, map} from 'rxjs';

import {ComponentBaseDirective} from './component-base';

export class RouteComponentBaseDirective extends ComponentBaseDirective {
  constructor(
    protected readonly route: ActivatedRoute,
    protected readonly location: Location,
  ) {
    super();
  }

  getDataParam(key: string) {
    return this.route.snapshot.data[key];
  }

  getQueryParam(key: string) {
    return this.route.snapshot.queryParamMap.get(key);
  }

  getAllQueryParams() {
    return this.route.snapshot.queryParams;
  }

  getRouteParam(key: string) {
    return this.route.snapshot.paramMap.get(key);
  }

  getRouteParamObservable(key: string) {
    return this.route.paramMap.pipe(
      filter(params => !!params.get(key)),
      map(params => params.get(key)),
    );
  }
  getChildRouteParam(key: string) {
    return this.route.firstChild?.snapshot?.paramMap?.get(key);
  }

  goBack(): void {
    this.location.back();
  }

  navigateHome(): void {
    this.location.go(environment.homePath);
  }
}
