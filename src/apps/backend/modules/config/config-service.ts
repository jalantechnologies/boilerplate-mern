import config from 'config';

import ConfigType from './config-type';
import { MissingKeyError, ValueTypeMismatchError } from './types';

export default class ConfigService {
  public static getBoolValue(key: string): boolean {
    const expectedValueType = ConfigType.BOOLEAN;
    return this.getValue<boolean>(expectedValueType, key);
  }

  public static getIntValue(key: string): number {
    const expectedValueType = ConfigType.NUMBER;
    return this.getValue<number>(expectedValueType, key);
  }

  public static getStringValue(key: string): string {
    const expectedValueType = ConfigType.STRING;
    return this.getValue<string>(expectedValueType, key);
  }

  public static getListValue<K>(key: string): K[] {
    const expectedValueType = ConfigType.OBJECT;
    return this.getValue<K[]>(expectedValueType, key);
  }

  public static hasValue(key: string): boolean {
    return config.has(key);
  }

  private static getValue<T>(expectedValueType: ConfigType, key: string): T {
    const value = config.get(key);

    if (value === undefined) {
      throw new MissingKeyError(key);
    }

    if (typeof value !== expectedValueType) {
      throw new ValueTypeMismatchError(typeof value, expectedValueType, key);
    } else {
      return value as T;
    }
  }
}
