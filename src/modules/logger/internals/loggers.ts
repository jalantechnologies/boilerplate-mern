import Logger, { LoggerTransport } from './types';
import ConfigService from '../../config/config-service';
import ConsoleLogger from './console-logger';
import RollbarLogger from './rollbar-logger';
import { UnknownTransportError } from '../types';
import GrafanaLokiLogger from './grafana-loki-logger';

export default class Loggers {
  private static loggers: Logger[];

  public static initializeLoggers(): void {
    const transports: LoggerTransport[] = ConfigService.getListValue<LoggerTransport>('logger.transports');
    const loggerTransports: Logger[] = [];

    transports.forEach((loggerTransport: LoggerTransport) => {
      switch (loggerTransport) {
        case LoggerTransport.Console:
          loggerTransports.push(Loggers.getConsoleLogger());
          break;
        case LoggerTransport.Rollbar:
          loggerTransports.push(Loggers.getRollbarLogger());
          break;
        case LoggerTransport.GrafanaLoki:
          loggerTransports.push(Loggers.getGrafanaLokiLogger());
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

  static getRollbarLogger(): RollbarLogger {
    return new RollbarLogger();
  }

  static getGrafanaLokiLogger(): GrafanaLokiLogger {
    return new GrafanaLokiLogger();
  }
}
