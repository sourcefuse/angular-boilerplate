import {catchError, delay, map, Observable, of} from 'rxjs';
import {USERS} from '../mock-data.constants';
import {UserDetails} from '../user-title.interface';

export class UserService {
  private readonly users = USERS;

  getUserById(id: string): Observable<UserDetails> {
    const user = this.users.find(u => u.id === id);
    return of(user);
  }
  getUserNameForBreadcrumb(params: Record<string, string>): Observable<string> {
    const id = params['id']; // Access any param key dynamically
    return this.getUserById(id).pipe(
      map(user => user?.name || `User #${id}`),
      catchError(() => of(`User #${id}`)),
      delay(4000),
    );
  }
}
