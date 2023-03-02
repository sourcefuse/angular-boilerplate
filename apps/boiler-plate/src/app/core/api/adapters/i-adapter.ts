// tslint:disable:rule no-any
export interface IAdapter<T, R = T> {
  adaptToModel(resp: any): T;
  adaptFromModel(data: Partial<R>): any;
}
