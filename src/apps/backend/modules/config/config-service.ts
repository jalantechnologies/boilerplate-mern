import { ConfigMissingError } from 'backend/modules/config';
import config from 'config';
import _ from 'lodash';

export default class ConfigService {
  static getValue<T = unknown>(key: string): T {
    const value = config.get<T>(key);

    if (_.isNil(value)) {
      throw new ConfigMissingError(key);
    }

    return value;
  }

  public static hasValue(key: string): boolean {
    return config.has(key);
  }
}
