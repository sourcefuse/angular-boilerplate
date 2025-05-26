import {Injectable} from '@angular/core';
import {Observable, of} from 'rxjs';

@Injectable({providedIn: 'root'})
export class TitleService {
  private readonly titles = [
    {id: '1', title: 'Contract.pdf'},
    {id: '2', title: 'Appointment.pdf'},
  ];

  getTileById(id: string): Observable<any> {
    const title = this.titles.find(u => u.id === id);
    return of(title);
  }
}
