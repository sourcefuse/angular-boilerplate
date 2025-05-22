import {Injectable} from '@angular/core';
import {Resolve, ActivatedRouteSnapshot} from '@angular/router';

@Injectable({providedIn: 'root'})
export class UserResolver implements Resolve<any> {
  resolve(route: ActivatedRouteSnapshot) {
    const userId = route.paramMap.get('userId');
    return {name: userId === '12' ? 'John B' : 'Jane Smith'};
  }
}
