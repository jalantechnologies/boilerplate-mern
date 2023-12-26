import ConfigService from '../../config/config-service';
import { UnknownTransportError } from '../types';

import ConsoleLogger from './console-logger';
import DatadogLogger from './datadog-logger';
import Logger, { LoggerTransport } from './types';

export default class Loggers {
  private static loggers: Logger[];

  public static initializeLoggers(): void {
    const transports: LoggerTransport[] = ConfigService.getListValue<LoggerTransport>('logger.transports');
    const loggerTransports: Logger[] = [];

    transports.forEach((loggerTransport: string) => {
      switch (loggerTransport) {
        case LoggerTransport.Console:
          loggerTransports.push(Loggers.getConsoleLogger());
          break;
        case LoggerTransport.Datadog:
          loggerTransports.push(Loggers.getDatadogLogger());
          break;
        default:
          throw new UnknownTransportError(loggerTransport);
      }
    });

    Loggers.loggers = loggerTransports;
  }

  public static info(message: string): void {
    Loggers.loggers.forEach((logger) => {
      logger.info(message);
    });
  }

  public static debug(message: string): void {
    Loggers.loggers.forEach((logger) => {
      logger.debug(message);
    });
  }

  public static error(message: string): void {
    Loggers.loggers.forEach((logger) => {
      logger.error(message);
    });
  }

  public static warn(message: string): void {
    Loggers.loggers.forEach((logger) => {
      logger.warn(message);
    });
  }

  public static critical(message: string): void {
    Loggers.loggers.forEach((logger) => {
      logger.critical(message);
    });
  }

  static getConsoleLogger(): ConsoleLogger {
    return new ConsoleLogger();
  }

  static getDatadogLogger(): DatadogLogger {
    return new DatadogLogger();
  }
}
