import Rollbar from 'rollbar';
import ConfigService from '../../config/config-service';
import Logger from './types';

export class RollbarLogger implements Logger {
  private rollbar: Rollbar;

  constructor() {
    this.rollbar = new Rollbar({
      accessToken: ConfigService.getStringValue('rollbar.accessToken'),
      environment: ConfigService.getEnvironment(),
    });
  }

  public info(message: string): void {
    this.rollbar.info(message);
  }

  public debug(message: string): void {
    this.rollbar.debug(message);
  }

  public warn(message: string): void {
    this.rollbar.warning(message);
  }

  public criticial(message: string): void {
    this.rollbar.critical(message);
  }
}

const rollbarLogger = new RollbarLogger();

export default rollbarLogger;
