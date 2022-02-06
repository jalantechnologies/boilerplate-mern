import Loggers from './internals/loggers';

export default class LoggerManager {
  // This method is called at the application start to allow Logger
  // module to initialize its resources.
  public static async mountLogger(): Promise<void> {
    Loggers.initializeLoggers();
    return Promise.resolve();
  }
}
