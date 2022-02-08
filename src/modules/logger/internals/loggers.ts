import Logger from './types';
import ConfigService from '../../config/config-service';
import { Environment, EnvironmentNotSupportedError } from '../../config/types';
import ConsoleLogger from './console-logger';
import RollbarLogger from './rollbar-logger';

export default class Loggers {
  private static loggers: Logger[];

  public static initializeLoggers(): void {
    const currentEnv = ConfigService.getEnvironment();
    switch (currentEnv) {
      case Environment.LOCAL:
      case Environment.TESTING:
        Loggers.loggers = [new ConsoleLogger()];
        break;
      case Environment.STAGING:
      case Environment.QA:
      case Environment.BETA:
      case Environment.PRODUCTION:
        Loggers.loggers = [new RollbarLogger()];
        break;
      default:
        throw new EnvironmentNotSupportedError(currentEnv);
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
}
