import {Injectable} from '@angular/core';
import {Resolve, ActivatedRouteSnapshot} from '@angular/router';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {UserService} from './user.service';

@Injectable({providedIn: 'root'})
export class UserResolver implements Resolve<any> {
  constructor(
    private readonly http: HttpClient,
    private readonly userService: UserService,
  ) {}

  resolve(route: ActivatedRouteSnapshot): Observable<any> {
    const id = route.paramMap.get('id');
    return this.userService.getUserById(id);
  }
}
