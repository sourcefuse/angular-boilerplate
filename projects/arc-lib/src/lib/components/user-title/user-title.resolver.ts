import {Injectable} from '@angular/core';
import {Resolve, ActivatedRouteSnapshot} from '@angular/router';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {TitleService} from './user-title.service';

@Injectable({providedIn: 'root'})
export class TitleResolver implements Resolve<any> {
  constructor(
    private readonly http: HttpClient,
    private readonly titleService: TitleService,
  ) {}

  resolve(route: ActivatedRouteSnapshot): Observable<any> {
    const id = route.paramMap.get('id');
    return this.titleService.getTileById(id);
  }
}
