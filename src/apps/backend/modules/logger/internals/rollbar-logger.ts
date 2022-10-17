import Rollbar from 'rollbar';

import ConfigService from '../../config/config-service';

import Logger from './types';

export default class RollbarLogger implements Logger {
  private rollbar: Rollbar;

  constructor() {
    this.rollbar = new Rollbar({
      accessToken: ConfigService.getStringValue('rollbar.accessToken'),
      environment: ConfigService.getStringValue('rollbar.env'),
    });
  }

  public info(message: string): void {
    this.rollbar.info(message);
  }

  public debug(message: string): void {
    this.rollbar.debug(message);
  }

  public error(message: string): void {
    this.rollbar.error(message);
  }

  public warn(message: string): void {
    this.rollbar.warning(message);
  }

  public critical(message: string): void {
    this.rollbar.critical(message);
  }
}
