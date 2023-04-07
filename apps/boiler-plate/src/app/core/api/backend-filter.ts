import {PermissionKey} from '@boiler/shared/enums';

export interface AnyObject {
  [property: string]: any;
}
export declare type ShortHandEqualType = string | number | boolean | Date;
export declare type Operators =
  | 'eq'
  | 'neq'
  | 'gt'
  | 'gte'
  | 'lt'
  | 'lte'
  | 'inq'
  | 'nin'
  | 'between'
  | 'exists'
  | 'and'
  | 'or'
  | 'like'
  | 'nlike'
  | 'ilike'
  | 'nilike'
  | 'regexp';

export declare type KeyOf<MT extends object> = Exclude<
  Extract<keyof MT, string>,
  Operators
>;
export declare type Condition<MT extends object> = {
  [P in KeyOf<MT>]?: PredicateComparison<MT[P]> | (MT[P] & ShortHandEqualType);
};
export declare type PredicateComparison<PT> = {
  eq?: PT;
  neq?: PT;
  gt?: PT;
  gte?: PT;
  lt?: PT;
  lte?: PT;
  inq?: PT[];
  nin?: PT[];
  between?: [PT, PT];
  exists?: boolean;
  like?: PT;
  nlike?: PT;
  ilike?: PT;
  nilike?: PT;
  regexp?: string | RegExp;
};
export interface AndClause<MT extends object> {
  and: Where<MT>[];
}
export interface OrClause<MT extends object> {
  or: Where<MT>[];
}
export declare type Where<MT extends object = AnyObject> =
  | Condition<MT>
  | AndClause<MT>
  | OrClause<MT>;

export declare type Fields<MT = AnyObject> = {
  [P in keyof MT]?: boolean;
};
export interface Inclusion {
  relation: string;
  scope?: BackendFilter;
}
export interface BackendFilter<MT extends object = AnyObject> {
  /**
   * The matching criteria
   */
  where?: Where<MT>;
  /**
   * To include/exclude fields
   */
  fields?: Fields<MT> | (keyof MT)[];
  /**
   * Sorting order for matched entities. Each item should be formatted as
   * `fieldName ASC` or `fieldName DESC`.
   * For example: `['f1 ASC', 'f2 DESC', 'f3 ASC']`.
   *
   * We might want to use `Order` in the future. Keep it as `string[]` for now
   * for compatibility with LoopBack 3.x.
   */
  order?: string[];
  /**
   * Maximum number of entities
   */
  limit?: number;
  /**
   * Skip N number of entities
   */
  skip?: number;
  /**
   * Offset N number of entities. An alias for `skip`
   */
  offset?: number;
  /**
   * To include related objects
   */
  include?: Inclusion[];
}
