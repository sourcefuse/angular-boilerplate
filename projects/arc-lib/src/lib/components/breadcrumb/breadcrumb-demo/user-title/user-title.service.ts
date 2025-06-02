import {Injectable} from '@angular/core';
import {Observable, of} from 'rxjs';
import {TITLES} from '../mock-data.constants';

@Injectable()
export class TitleService {
  private readonly titles = TITLES;

  getTitleById(id: string): Observable<any> {
    const title = this.titles.find(u => u.id === id);
    return of(title);
  }
}
