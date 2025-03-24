import { Logger } from 'backend/modules/logger';
import WinstonTransport from 'winston-transport';

type TransportLogLevel = 'info' | 'warn' | 'error';

type TransportLogCallback = () => void;

type TransportLogInfo = {
  level: TransportLogLevel;
  message: string;
};

export default class CustomWinstonTransport extends WinstonTransport {
  private static logMessage(level: TransportLogLevel, message: string) {
    const log = Logger[level] || Logger.info;
    log(message);
  }

  log(info: TransportLogInfo, callback: TransportLogCallback): void {
    setImmediate(() => {
      this.emit('logged', info);
    });

    CustomWinstonTransport.logMessage(info.level, info.message);
    callback();
  }
}
