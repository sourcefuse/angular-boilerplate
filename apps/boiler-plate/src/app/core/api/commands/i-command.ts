// tslint:disable:rule no-any
import {Observable} from 'rxjs';

export interface ICommand {
  parameters?: any;
  execute(): Observable<any>;
}
