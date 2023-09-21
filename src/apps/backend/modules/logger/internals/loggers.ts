import { ConfigService } from '../../config';
import { UnknownTransportError } from '../types';

import ConsoleLogger from './console-logger';
import GrafanaLokiLogger from './grafana-loki-logger';
import PapertrailLogger from './papertrail-logger';
import RollbarLogger from './rollbar-logger';
import Logger, { LoggerTransport } from './types';

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
    const transports: LoggerTransport[] = ConfigService.getValue<LoggerTransport[]>('logger.transports');
    const loggers: Logger[] = [];

    transports.forEach((loggerTransport: string) => {
      switch (loggerTransport) {
        case LoggerTransport.Console:
          loggers.push(Loggers.getConsoleLogger());
          break;
        case LoggerTransport.Rollbar:
          loggers.push(Loggers.getRollbarLogger());
          break;
        case LoggerTransport.Grafana:
          loggers.push(Loggers.getGrafanaLokiLogger());
          break;
        case LoggerTransport.Papertrail:
          loggers.push(Loggers.getPapertrailLogger());
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

  private static getRollbarLogger(): RollbarLogger {
    return new RollbarLogger();
  }

  private static getGrafanaLokiLogger(): GrafanaLokiLogger {
    return new GrafanaLokiLogger();
  }

  private static getPapertrailLogger(): PapertrailLogger {
    return new PapertrailLogger();
  }
}
