import 'reflect-metadata';
import {requiredMetadataKey} from './required.decorator';

/**
 *
 * A class decorator to be used with parameterised constructors
 * to validate the property constraints
 */
export function validate() {
  // sonarignore:start
  return <T extends {new (...args: any[]): {}}>(constructor: T) => {
    // sonarignore:end
    return class Validate extends constructor {
      // sonarignore:start
      constructor(...args: any[]) {
        // sonarignore:end
        if (!args || !args.length) {
          throw new Error(
            `Can only use validate decorator with paramterized constructor`,
          );
        }

        super(args[0]);

        const requiredProps: string[] = Reflect.getMetadata(
          requiredMetadataKey,
          constructor,
        );
        if (requiredProps) {
          requiredProps.forEach(prop => {
            const propValue = args[0][prop];
            if (propValue === null || propValue === undefined) {
              // sonarignore:start
              console.error(
                `Property ${prop} is required for model ${constructor.name}\n` +
                  `Received ${propValue}`,
              );
              // sonarignore:end
            }
          });
        }
      }
    };
  };
}
