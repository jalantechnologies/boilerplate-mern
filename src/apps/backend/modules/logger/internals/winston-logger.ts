import Logger from 'modules/logger/internals/types';
import * as winston from 'winston';

export default class WinstonLogger implements Logger {
  private logger: winston.Logger;

  constructor(transport: winston.transport) {
    this.logger = winston.createLogger({
      transports: [transport],
    });
  }

  public info(message: string, ...args: unknown[]): void {
    this.logger.info(message, ...args);
  }

  public debug(message: string, ...args: unknown[]): void {
    this.logger.debug(message, ...args);
  }

  public error(message: string, ...args: unknown[]): void {
    this.logger.error(message, ...args);
  }

  public warn(message: string, ...args: unknown[]): void {
    this.logger.warn(message, ...args);
  }

  public critical(message: string, ...args: unknown[]): void {
    this.logger.crit(message, ...args);
  }
}
