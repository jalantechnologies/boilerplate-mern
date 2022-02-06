import Logger from './types';

export default class Loggers {
  private static loggers: Logger[];

  public static initializeLoggers() {
    // TODO: It should query ConfigService to get environment and
    // initialize loggers based on the environment.
    // Local: ConsoleLogger
    // Test: ConsoleLogger
    // Staging: RollbarLogger
    // QA: RollbarLogger
    // beta: RollbarLogger
    // production: RollbarLogger
    // otherwise throw
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
