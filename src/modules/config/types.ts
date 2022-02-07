// eslint-disable-next-line max-classes-per-file
export enum Environment {
  LOCAL = 'local',
  TESTING = 'testing',
  STAGING = 'staging',
  QA = 'qa',
  BETA = 'beta',
  PRODUCTION = 'production',
}

export enum ConfigErrorCode {
  MISSING_KEY = 'CONFIG_ERR_O1',
  VALUE_TYPE_MISMATCH = 'CONFIG_ERR_O2',
  ENVIRONMENT_NOT_SUPPORTED = 'CONFIG_ERR_O3',
}

export class EnvironmentNotSupportedError extends Error {
  code: ConfigErrorCode;

  constructor(env: string) {
    super(`Environment ${env} is not supported`);
    this.code = ConfigErrorCode.ENVIRONMENT_NOT_SUPPORTED;
  }
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
      `Value mismatch for key: ${key}. Expected: ${expectedValueType}, Actual: ${actualValueType}`,
    );
    this.code = ConfigErrorCode.VALUE_TYPE_MISMATCH;
  }
}
