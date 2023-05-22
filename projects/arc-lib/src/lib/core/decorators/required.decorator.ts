import { AnyObject } from '../api';
import 'reflect-metadata';

export const requiredMetadataKey = Symbol('required');
/**
 * A property decorator that can be used to mark properties in a model as required
 * Validate class decorator can be applied to class for required validation check
 *
 */
export function required<T extends Object = AnyObject>() {
  return (target: T, propertyKey: string) => {
    const requiredProps: string[] =
      Reflect.getOwnMetadata(requiredMetadataKey, target.constructor) ?? [];
    requiredProps.push(propertyKey);
    Reflect.defineMetadata(
      requiredMetadataKey,
      requiredProps,
      target.constructor
    );
  };
}
