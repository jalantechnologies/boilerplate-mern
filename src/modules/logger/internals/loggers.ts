import Logger from './types';
import ConfigService from '../../config/config-service';
import ConsoleLogger from './console-logger';
import RollbarLogger from './rollbar-logger';
import { Environment } from '../../config/types';
import { UnknownEnvironmentError } from '../types';

export default class Loggers {
  private static loggers: Logger[];

  public static initializeLoggers(): void {
    const currentEnv = ConfigService.getEnvironment();
    switch (currentEnv) {
      case Environment.LOCAL:
      case Environment.TESTING:
        Loggers.loggers = [Loggers.getConsoleLogger()];
        break;
      case Environment.STAGING:
      case Environment.PRODUCTION:
        Loggers.loggers = [Loggers.getRollbarLogger()];
        break;
      default:
        throw new UnknownEnvironmentError(currentEnv);
    }
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

  public static criticial(message: string): void {
    Loggers.loggers.forEach((logger) => {
      logger.criticial(message);
    });
  }

  static getConsoleLogger(): ConsoleLogger {
    return new ConsoleLogger();
  }

  static getRollbarLogger(): RollbarLogger {
    return new RollbarLogger();
  }
}
