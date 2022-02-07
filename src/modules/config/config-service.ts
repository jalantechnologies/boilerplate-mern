import config from 'config';
import { Environment, MissingKeyError, ValueTypeMismatchError } from './types';

export enum ConfigType {
  BOOLEAN = 'boolean',
  NUMBER = 'number',
  STRING = 'string',
}

export default class ConfigService {
  public static getEnvironment(): Environment {
    const env: Environment = config.get('node.config.env');
    if (Object.values(Environment).includes(env)) {
      return env;
    }
    throw new Error(`Environment ${env} is not supported`);
  }

  public static getBoolValue(key: string): boolean {
    const expectedValueType = ConfigType.BOOLEAN;
    return this.getEnvValue<boolean>(expectedValueType, key);
  }

  public static getIntValue(key: string): number {
    const expectedValueType = ConfigType.NUMBER;
    return this.getEnvValue<number>(expectedValueType, key);
  }

  public static getStringValue(key: string): string {
    const expectedValueType = ConfigType.STRING;
    return this.getEnvValue<string>(expectedValueType, key);
  }

  private static getEnvValue<T>(expectedValueType: ConfigType, key: string): T {
    // This method should throw MissingKeyError if key is not found in config
    // This method should throw ValueTypeMismatchError if key is found but the
    // there is a value type mistmatch
    // Otherwise return the value
    const value = config.get(key);

    if (!value) {
      throw new MissingKeyError(key);
    }

    if (typeof value !== expectedValueType) {
      throw new ValueTypeMismatchError(typeof value, expectedValueType, key);
    } else {
      return value as T;
    }
  }
}
