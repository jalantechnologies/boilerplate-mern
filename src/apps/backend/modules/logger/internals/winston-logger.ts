import * as winston from 'winston';

import Logger from './types';

export default class WinstonLogger implements Logger {
  private logger: winston.Logger;

  constructor(transport: winston.transport) {
    this.logger = winston.createLogger({
      transports: [transport],
    });
  }

  public info(message: string): void {
    this.logger.info(message);
  }

  public debug(message: string): void {
    this.logger.debug(message);
  }

  public error(message: string): void {
    this.logger.error(message);
  }

  public warn(message: string): void {
    this.logger.warn(message);
  }

  public critical(message: string): void {
    this.logger.crit(message);
  }
}
