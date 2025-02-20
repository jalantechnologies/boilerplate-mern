export enum ConfigErrorCode {
  MISSING = 'CONFIG_ERR_O1',
}

export class ConfigMissingError extends Error {
  code: ConfigErrorCode;

  constructor(missingKey: string) {
    super(`${missingKey} is missing in config`);
    this.code = ConfigErrorCode.MISSING;
  }
}
