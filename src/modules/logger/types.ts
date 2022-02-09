export enum LoggerErrorCode {
  UNKNOWN_ENV = 'LOGGER_01',
}

export class UnknownEnvironmentError extends Error {
  code: LoggerErrorCode;

  constructor(unknownEnv: string) {
    super(`${unknownEnv} is not supported at the moment`);
    this.code = LoggerErrorCode.UNKNOWN_ENV;
  }
}
