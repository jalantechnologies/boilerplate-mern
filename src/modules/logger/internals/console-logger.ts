import Logger from './types';

export class ConsoleLogger implements Logger {
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
  public warn(message: string): void {
    // eslint-disable-next-line no-console
    console.log(`[WARN] ${message}`);
  }

  // eslint-disable-next-line class-methods-use-this
  public criticial(message: string): void {
    // eslint-disable-next-line no-console
    console.log(`[CRITICAL] ${message}`);
  }
}

const consoleLogger = new ConsoleLogger();

export default consoleLogger;
