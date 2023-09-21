import Rollbar from 'rollbar';

import ConfigService from '../../config/config-service';

import Logger from './types';

export default class RollbarLogger implements Logger {
  private rollbar: Rollbar;

  constructor() {
    this.rollbar = new Rollbar({
      accessToken: ConfigService.getValue('rollbar.accessToken'),
      environment: ConfigService.getValue('rollbar.env'),
    });
  }

  public info(message: string, ...args: Rollbar.LogArgument[]): void {
    this.rollbar.info(message, ...args);
  }

  public debug(message: string, ...args: Rollbar.LogArgument[]): void {
    this.rollbar.debug(message, ...args);
  }

  public error(message: string, ...args: Rollbar.LogArgument[]): void {
    this.rollbar.error(message, ...args);
  }

  public warn(message: string, ...args: Rollbar.LogArgument[]): void {
    this.rollbar.warning(message, ...args);
  }

  public critical(message: string, ...args: Rollbar.LogArgument[]): void {
    this.rollbar.critical(message, ...args);
  }
}
