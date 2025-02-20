export enum LoggerErrorCode {
  UNKNOWN_TRANSPORT = 'LOGGER_01',
}

export class UnknownTransportError extends Error {
  code: LoggerErrorCode;

  constructor(transport: string) {
    super(`${transport} is not supported`);
    this.code = LoggerErrorCode.UNKNOWN_TRANSPORT;
  }
}
