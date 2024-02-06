import Loggers from './internals/loggers';

export default class Logger {
  public static info(message: string, ...args: unknown[]): void {
    Loggers.info(message, ...args);
  }

  public static debug(message: string, ...args: unknown[]): void {
    Loggers.debug(message, ...args);
  }

  public static error(message: string, ...args: unknown[]): void {
    Loggers.error(message, ...args);
  }

  public static warn(message: string, ...args: unknown[]): void {
    Loggers.warn(message, ...args);
  }

  public static critical(message: string, ...args: unknown[]): void {
    Loggers.critical(message, ...args);
  }
}
