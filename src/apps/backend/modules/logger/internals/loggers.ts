import ConfigService from '../../config/config-service';
import { UnknownTransportError } from '../types';

import ConsoleLogger from './console-logger';
import GrafanaLokiLogger from './grafana-loki-logger';
import PapertrailLogger from './papertrail-logger';
import RollbarLogger from './rollbar-logger';
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
        case LoggerTransport.Rollbar:
          loggerTransports.push(Loggers.getRollbarLogger());
          break;
        case LoggerTransport.Grafana:
          loggerTransports.push(Loggers.getGrafanaLokiLogger());
          break;
        case LoggerTransport.Papertrail:
          loggerTransports.push(Loggers.getPapertrailLogger());
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

  static getPapertrailLogger(): PapertrailLogger {
    return new PapertrailLogger();
  }
}
