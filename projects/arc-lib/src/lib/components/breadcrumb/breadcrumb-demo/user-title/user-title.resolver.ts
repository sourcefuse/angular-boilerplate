import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot} from '@angular/router';
import {Observable} from 'rxjs';
import {TitleService} from './user-title.service';
import {Title} from '../user-title.interface';

@Injectable()
export class TitleResolver {
  constructor(private readonly titleService: TitleService) {}

  resolve(route: ActivatedRouteSnapshot): Observable<Title> {
    const id = route.paramMap.get('id');
    return this.titleService.getTitleById(id);
  }
}
