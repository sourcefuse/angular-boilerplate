import {Injectable} from '@angular/core';
import {Observable, of} from 'rxjs';
import {USERS} from '../mock-data.constants';

@Injectable()
export class UserService {
  private readonly users = USERS;

  getUserById(id: string): Observable<any> {
    const user = this.users.find(u => u.id === id);
    return of(user);
  }
}
