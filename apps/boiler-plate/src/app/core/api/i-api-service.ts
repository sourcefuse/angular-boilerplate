import {Observable} from 'rxjs';

export interface IApiService {
  get(url: string, options?: object): Observable<any>;
  post(url: string, payload: any | null, options?: object): Observable<any>;
  patch(url: string, payload: any | null, options?: object): Observable<any>;
  put(url: string, payload: any | null, options?: object): Observable<any>;
  delete(url: string, options?: object): Observable<any>;
}
