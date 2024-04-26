import {HttpHeaders, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {ICommand} from './i-command';
import {IApiService, IAdapter} from '@project-lib/core/api';

export abstract class GetListAPICommand<T, R = T> implements ICommand {
  constructor(
    protected readonly apiService: IApiService,
    protected readonly adapter: IAdapter<T, R>,
    protected readonly uri: string,
  ) {}

  parameters?: {
    query?: HttpParams;
    headers?: HttpHeaders;
  };

  execute(): Observable<R[]> {
    // tslint:disable-next-line:rule no-any
    const options: any = {observe: 'body'};
    if (this.parameters) {
      if (this.parameters.headers) {
        options.headers = this.parameters.headers;
      }

      if (this.parameters.query) {
        options.params = this.parameters.query;
      }
    }
    const response = this.apiService
      .get(this.uri, options)
      .pipe(
        map(resp => resp.map((data: any) => this.adapter.adaptToModel(data))),
      );
    return response;
  }
}
