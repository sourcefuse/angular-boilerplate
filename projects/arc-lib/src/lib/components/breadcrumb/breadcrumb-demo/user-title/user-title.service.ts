import {catchError, delay, map, Observable, of} from 'rxjs';
import {TITLES} from '../mock-data.constants';
import {TitleDetails} from '../user-title.interface';

export class TitleService {
  private readonly titles = TITLES;

  getTitleById(id: string): Observable<TitleDetails> {
    const title = this.titles.find(u => u.id === id);
    return of(title);
  }
  getTitleNameForBreadcrumb(
    params: Record<string, string>,
  ): Observable<string> {
    const id = params['id'];
    return this.getTitleById(id).pipe(
      map(titles => titles?.title || `Document #${id}`),
      catchError(() => of(`Document #${id}`)),
      delay(4000), // Simulating network delay
    );
  }
}
