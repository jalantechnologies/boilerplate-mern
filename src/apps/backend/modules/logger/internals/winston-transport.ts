import WinstonTransport from 'winston-transport';

import Logger from '../logger';

type TransportLogLevel = 'info' | 'warn' | 'error';

type TransportLogCallback = () => void;

type TransportLogInfo = {
  level: TransportLogLevel
  message: string
};

export default class CustomWinstonTransport extends WinstonTransport {
  log(info: TransportLogInfo, callback: TransportLogCallback): void {
    setImmediate(() => {
      this.emit('logged', info);
    });

    CustomWinstonTransport.logMessage(info.level, info.message);
    callback();
  }

  private static logMessage(level: TransportLogLevel, message: string) {
    const log = Logger[level] || Logger.info;
    log(message);
  }
}
