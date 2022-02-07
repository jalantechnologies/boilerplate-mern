import config from "config";
import {
  ConfigType,
  Environment,
  MissingKeyError,
  ValueTypeMismatchError,
} from "./types";

export default class ConfigService {
  public static getEnvironment(): Environment {
    return config.get("node.env");
  }

  public static getBoolValue(key: string): boolean {
    // This method should throw MissingKeyError if key is not found in config
    // This method should throw ValueTypeMismatchError if key is found but the
    // there is a value type mistmatch
    // Otherwise return the value
    const expectedValueType = ConfigType.BOOLEAN;
    const value = config.get(key);

    if (!value) {
      throw new MissingKeyError(key);
    }

    if (typeof value !== expectedValueType) {
      throw new ValueTypeMismatchError(typeof value, expectedValueType, key);
    } else {
      return value as boolean;
    }
  }

  public static getIntValue(key: string): number {
    // This method should throw MissingKeyError if key is not found in config
    // This method should throw ValueTypeMismatchError if key is found but the
    // there is a value type mistmatch
    // Otherwise return the value
    const expectedValueType = ConfigType.NUMBER;
    const value = config.get(key);

    if (!value) {
      throw new MissingKeyError(key);
    }

    if (typeof value !== expectedValueType) {
      throw new ValueTypeMismatchError(typeof value, expectedValueType, key);
    } else {
      return value as number;
    }
  }

  public static getStringValue(key: string): string {
    // This method should throw MissingKeyError if key is not found in config
    // This method should throw ValueTypeMismatchError if key is found but the
    // there is a value type mistmatch
    // Otherwise return the value
    const expectedValueType = ConfigType.STRING;
    const value = config.get(key);

    if (!value) {
      throw new MissingKeyError(key);
    }

    if (typeof value !== expectedValueType) {
      throw new ValueTypeMismatchError(typeof value, expectedValueType, key);
    } else {
      return value as string;
    }
  }
}
