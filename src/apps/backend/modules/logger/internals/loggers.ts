import { ConfigService } from 'modules/config';
import { UnknownTransportError } from 'modules/logger';
import ConsoleLogger from 'modules/logger/internals/console-logger';
import DatadogLogger from 'modules/logger/internals/datadog-logger';
import Logger, { LoggerTransport } from 'modules/logger/internals/types';

export default class Loggers {
  private static loggers = this.getLoggers();

  public static info(message: string, ...args: unknown[]): void {
    Loggers.loggers.forEach((logger) => {
      logger.info(message, ...args);
    });
  }

  public static debug(message: string, ...args: unknown[]): void {
    Loggers.loggers.forEach((logger) => {
      logger.debug(message, ...args);
    });
  }

  public static error(message: string, ...args: unknown[]): void {
    Loggers.loggers.forEach((logger) => {
      logger.error(message, ...args);
    });
  }

  public static warn(message: string, ...args: unknown[]): void {
    Loggers.loggers.forEach((logger) => {
      logger.warn(message, ...args);
    });
  }

  public static critical(message: string, ...args: unknown[]): void {
    Loggers.loggers.forEach((logger) => {
      logger.critical(message, ...args);
    });
  }

  private static getLoggers(): Logger[] {
    const transports: LoggerTransport[] =
      ConfigService.getValue<LoggerTransport[]>('logger.transports');
    const loggers: Logger[] = [];

    transports.forEach((loggerTransport: LoggerTransport) => {
      switch (loggerTransport) {
        case LoggerTransport.Console:
          loggers.push(Loggers.getConsoleLogger());
          break;
        case LoggerTransport.Datadog:
          loggers.push(Loggers.getDatadogLogger());
          break;
        default:
          throw new UnknownTransportError(loggerTransport);
      }
    });

    return loggers;
  }

  private static getConsoleLogger(): ConsoleLogger {
    return new ConsoleLogger();
  }

  private static getDatadogLogger(): DatadogLogger {
    return new DatadogLogger();
  }
}
