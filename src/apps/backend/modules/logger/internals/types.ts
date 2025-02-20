export default interface Logger {
  info(message: string, ...args: unknown[]): void;

  debug(message: string, ...args: unknown[]): void;

  error(message: string, ...args: unknown[]): void;

  warn(message: string, ...args: unknown[]): void;

  critical(message: string, ...args: unknown[]): void;
}

export enum LoggerTransport {
  Console = 'console',
  Datadog = 'datadog',
}
