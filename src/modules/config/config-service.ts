import { Environment } from './types';

export default class ConfigService {
  public static getEnvironment(): Environment {
    // TODO: Implement this method.
  }

  public static getBoolValue(key: string): boolean {
    // TODO: Implement this.
    // This method should throw MissingKeyError if key is not found in config
    // This method should throw ValueTypeMismatchError if key is found but the
    // there is a value type mistmatch
    // Otherwise return the value
  }

  public static getIntValue(key: string): number {
    // TODO: Implement this.
    // This method should throw MissingKeyError if key is not found in config
    // This method should throw ValueTypeMismatchError if key is found but the
    // there is a value type mistmatch
    // Otherwise return the value
  }

  public static getStringValue(key: string): string {
    // TODO: Implement this.
    // This method should throw MissingKeyError if key is not found in config
    // This method should throw ValueTypeMismatchError if key is found but the
    // there is a value type mistmatch
    // Otherwise return the value
  }
}
