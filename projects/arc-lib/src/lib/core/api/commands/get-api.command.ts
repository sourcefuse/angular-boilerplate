import {HttpHeaders, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';

import {IAdapter} from '../adapters/i-adapter';
import {IApiService} from '../i-api-service';
import {HttpObserve, ResponseType} from '../types';
import {ICommand} from './i-command';

export abstract class GetAPICommand<T, R = T> implements ICommand {
  constructor(
    protected readonly apiService: IApiService,
    protected readonly adapter: IAdapter<T, R>,
    protected readonly uri: string,
  ) {}

  parameters?: {
    query?: HttpParams;
    headers?: HttpHeaders;
    observe?: HttpObserve;
    responseType?: ResponseType;
  };

  execute(): Observable<T> {
    // tslint:disable-next-line:rule no-any
    let options: any;
    if (this.parameters) {
      options = {};
      options.observe = this.parameters.observe || 'body';

      if (this.parameters.headers) {
        options.headers = this.parameters.headers;
      }

      if (this.parameters.query) {
        options.params = this.parameters.query;
      }

      if (this.parameters.responseType) {
        options.responseType = this.parameters.responseType;
      }
    }
    return this.apiService
      .get(this.uri, options)
      .pipe(map(resp => this.adapter.adaptToModel(resp)));
  }
}
