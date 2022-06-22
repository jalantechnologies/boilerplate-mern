import Logger from './types';

export default class ConsoleLogger implements Logger {
  // eslint-disable-next-line class-methods-use-this
  public info(message: string): void {
    // eslint-disable-next-line no-console
    console.log(`[INFO] ${message}`);
  }

  // eslint-disable-next-line class-methods-use-this
  public debug(message: string): void {
    // eslint-disable-next-line no-console
    console.log(`[DEBUG] ${message}`);
  }

  // eslint-disable-next-line class-methods-use-this
  public error(message: string): void {
    // eslint-disable-next-line no-console
    console.log(`[ERROR] ${message}`);
  }

  // eslint-disable-next-line class-methods-use-this
  public warn(message: string): void {
    // eslint-disable-next-line no-console
    console.log(`[WARN] ${message}`);
  }

  // eslint-disable-next-line class-methods-use-this
  public critical(message: string): void {
    // eslint-disable-next-line no-console
    console.log(`[CRITICAL] ${message}`);
  }
}
