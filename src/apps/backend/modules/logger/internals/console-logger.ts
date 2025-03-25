/* eslint-disable no-console,class-methods-use-this */
import { Logger } from 'backend/modules/logger';

export default class ConsoleLogger implements Logger {
  public info(message: string, ...args: unknown[]): void {
    console.info(`[INFO] ${message}`, ...args);
  }

  public debug(message: string, ...args: unknown[]): void {
    console.debug(`[DEBUG] ${message}`, ...args);
  }

  public error(message: string, ...args: unknown[]): void {
    console.error(`[ERROR] ${message}`, ...args);
  }

  public warn(message: string, ...args: unknown[]): void {
    console.warn(`[WARN] ${message}`, ...args);
  }

  public critical(message: string, ...args: unknown[]): void {
    console.error(`[CRITICAL] ${message}`, ...args);
  }
}
