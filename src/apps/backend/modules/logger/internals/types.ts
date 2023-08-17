export default interface Logger {
  info(message: string): void;

  debug(message: string): void;

  error(message: string): void;

  warn(message: string): void;

  critical(message: string): void;
}

export enum LoggerTransport {
  Console = 'console',
  Rollbar = 'rollbar',
  Grafana = 'grafana',
  Papertrail = 'papertrail',
}
