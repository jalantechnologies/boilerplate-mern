// eslint-disable-next-line max-classes-per-file
export enum Environment {
  LOCAL = 1,
  TESTING = 2,
  STAGING = 3,
  QA = 4,
  BETA = 5,
  PRODUCTION = 6,
}

export enum ConfigErrorCode {
  MISSING_KEY = "CONFIG_ERR_O1",
  VALUE_TYPE_MISMATCH = "CONFIG_ERR_O2",
}

export class MissingKeyError extends Error {
  code: ConfigErrorCode;

  constructor(missingKey: string) {
    super(`${missingKey} is not found in the config`);
    this.code = ConfigErrorCode.MISSING_KEY;
  }
}

export class ValueTypeMismatchError extends Error {
  code: ConfigErrorCode;

  constructor(actualValueType: string, expectedValueType: string, key: string) {
    super(
      `Value mismatch for key: ${key}. Expected: ${expectedValueType}, Actual: ${actualValueType}`
    );
    this.code = ConfigErrorCode.VALUE_TYPE_MISMATCH;
  }
}

export enum ConfigType {
  BOOLEAN = "boolean",
  NUMBER = "number",
  STRING = "string",
}
