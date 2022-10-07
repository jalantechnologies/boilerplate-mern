import WinstonTransport from 'winston-transport';

import Loggers from './internals/loggers';
import CustomWinstonTransport from './internals/winston-transport';

export default class LoggerManager {
  // This method is called at the application start to allow Logger
  // module to initialize its resources.
  public static async mountLogger(): Promise<void> {
    Loggers.initializeLoggers();
    return Promise.resolve();
  }

  static getWinstonTransport(): WinstonTransport {
    return new CustomWinstonTransport();
  }
}
