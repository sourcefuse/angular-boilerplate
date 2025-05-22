import {Injectable} from '@angular/core';
import {Resolve, ActivatedRouteSnapshot} from '@angular/router';

@Injectable({providedIn: 'root'})
export class NoteResolver implements Resolve<any> {
  resolve(route: ActivatedRouteSnapshot) {
    const noteId = route.paramMap.get('noteId');
    return {title: noteId === '1' ? 'First note' : 'Second note'};
  }
}
