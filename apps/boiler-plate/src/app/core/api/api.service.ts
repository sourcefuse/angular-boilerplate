import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';

import {ApiModule} from './api.module';
import {IApiService} from './i-api-service';

@Injectable({
  providedIn: ApiModule,
})
export class ApiService implements IApiService {
  constructor(private readonly http: HttpClient) {}

  public post(
    url: string,
    payload: any | null,
    options?: object,
  ): Observable<any> {
    return this.http.post(`${url}`, payload, options);
  }

  public get(url: string, options?: object): Observable<any> {
    return this.http.get(`${url}`, options);
  }

  public patch(
    url: string,
    payload: any | null,
    options?: object,
  ): Observable<any> {
    return this.http.patch(`${url}`, payload, options);
  }

  public put(
    url: string,
    payload: any | null,
    options?: object,
  ): Observable<any> {
    return this.http.put(`${url}`, payload, options);
  }

  public delete(url: string, options?: object): Observable<any> {
    return this.http.delete(`${url}`, options);
  }
}
