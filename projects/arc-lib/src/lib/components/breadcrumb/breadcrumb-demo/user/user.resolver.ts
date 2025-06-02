import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot} from '@angular/router';
import {Observable} from 'rxjs';
import {UserService} from './user.service';
import {User} from '../user-title.interface';

@Injectable()
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  resolve(route: ActivatedRouteSnapshot): Observable<User> {
    const id = route.paramMap.get('id');
    return this.userService.getUserById(id);
  }
}
