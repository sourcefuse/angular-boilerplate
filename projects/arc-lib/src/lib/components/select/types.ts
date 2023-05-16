import { SelectState } from './constants';

export type ValueType<Mode, ResulType> =
  | (Mode extends true ? ResulType[] : ResulType)
  | null;

export type Panel<T> = {
  width: number;
  height: number;
  state: SelectState;
  list: T[];
  removal: boolean;
  allowInput: boolean;
};
export interface GroupConfig<T> {
  groupName?: string;
  fieldName: keyof T;
  value: T[keyof T] | '*';
}
