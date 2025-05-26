import {Injectable} from '@angular/core';
import {Observable, of} from 'rxjs';

@Injectable({providedIn: 'root'})
export class UserService {
  private readonly users = [
    {id: '123', name: 'John Doe', email: 'john.doe123@example.com'},
    {id: '124', name: 'Jane Smith', email: 'jane.smith124@example.com'},
  ];

  getUserById(id: string): Observable<any> {
    const user = this.users.find(u => u.id === id);
    return of(user);
  }
}
