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
  // Returns the value of the given key from the current route's data object.
  getDataParam(key: string) {
    return this.route.snapshot.data[key];
  }
  //  Returns the value of the given key from the current route's query parameters.
  getQueryParam(key: string) {
    return this.route.snapshot.queryParamMap.get(key);
  }
  // Returns all the query parameters of the current route.
  getAllQueryParams() {
    return this.route.snapshot.queryParams;
  }
  //Returns the value of the given key from the current route's parameters.
  getRouteParam(key: string) {
    return this.route.snapshot.paramMap.get(key);
  }
  // Returns an observable that emits the value of the given route parameter whenever it changes.
  getRouteParamObservable(key: string) {
    return this.route.paramMap.pipe(
      filter(params => !!params.get(key)),
      map(params => params.get(key)),
    );
  }
  /*
  This function returns the value of a specified parameter from the first child route 
  snapshot of the current route.
  */
  getChildRouteParam(key: string) {
    return this.route.firstChild?.snapshot?.paramMap?.get(key);
  }
  // Navigates back to the previous location in the browser's history
  goBack(): void {
    this.location.back();
  }
  // Navigates to the home page defined in the environment variable
  navigateHome(): void {
    this.location.go(environment.homePath);
  }
}
