import {InjectionToken, Provider} from '@angular/core';
import {AnyObject, Where} from '@boiler/core/api/backend-filter';

import {AbstractGridFilterService, FilterValues} from '../types';
import {AgGridFilterService} from './grid-filter.service';
import {AgGridBaseComponent, AgGridFilterModel, Constructor} from './types';

export function agGridUtilsProviders(
  component: Constructor<AgGridBaseComponent>,
): Provider[] {
  return [
    {
      provide: AbstractGridFilterService,
      useClass: AgGridFilterService,
    },
    {
      provide: AG_GRID_BASED_COMPONENT,
      useExisting: component,
    },
  ];
}

/**
 * It takes a model with text filter properties and returns a where object that can be used in a
 * loopback query
 * @param model - The model that contains the text filter data.
 * @returns Where<T>
 */
export function textFilterModelToWhere<T extends Object>(
  model: AgGridFilterModel<AnyObject>,
  filterType?: string,
): AnyObject {
  let searchConditions: AnyObject[] = [];
  let filterConditions: AnyObject[] = [];
  let where: AnyObject | undefined;
  Object.entries(model).forEach(([key, data]) => {
    if (!data?.filter) {
      return;
    }
    const dataObject = JSON.parse(data.filter);
    if (dataObject.search) {
      searchConditions.push({
        [key]: {
          ilike: `%${dataObject.search}%`,
        },
      });
    }
    if (dataObject.filter) {
      if (filterType === 'project') {
        filterConditions.push({
          [key]: parseFilterValue(dataObject.filter, key),
        });
      } else {
        filterConditions.push({
          [key]: parseFilterValue(dataObject.filter),
        });
      }
    }
  });
  where = buildSearch(searchConditions, where);
  where = buildFilter(filterConditions, where);

  return where ?? ({} as Where<T>);
}

/**
 * If the value is a string, return an object with an `eq` property set to the value.
 * If the value is an array of strings, return an object with an `inq` property set
 * to the array of strings. Otherwise,
 * return null
 * @param {FilterValues} value - FilterValues - this is the value that is passed in from the filter
 * component.
 */
export function parseFilterValue(value: FilterValues, key?: string) {
  switch (true) {
    case value &&
      typeof value[0] === 'string' &&
      (key === 'type' || key === 'revenueLine' || key === 'deliveryManagerId'):
      return {
        containsAny: value,
      };
    case typeof value === 'string':
      return {
        eq: value,
      };
    case value && typeof value[0] === 'string':
      return {
        inq: value,
      };
    case value && typeof value[0] === 'boolean':
      return {
        inq: value,
      };

    default:
      return null;
  }
}

function buildSearch(searchConditions: AnyObject[], where?: AnyObject) {
  if (searchConditions.length > 1) {
    where = {
      or: searchConditions,
    };
  } else if (searchConditions.length === 1) {
    where = searchConditions[0];
  } else {
    // do nothing
  }
  return where;
}

function buildFilter(filterConditions: AnyObject[], where?: AnyObject) {
  if (filterConditions.length > 1) {
    if (where) {
      where = {
        and: [
          where,
          {
            and: filterConditions,
          },
        ],
      };
    } else {
      where = {
        and: filterConditions,
      };
    }
  } else if (filterConditions.length === 1) {
    if (where) {
      where = {
        and: [where, filterConditions[0]],
      };
    } else {
      where = filterConditions[0];
    }
  } else {
    // do nothing
  }
  return where;
}

export const AG_GRID_BASED_COMPONENT = new InjectionToken<AgGridBaseComponent>(
  'boiler.grid.base.component',
);
