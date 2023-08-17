import { PapertrailTransport } from 'winston-papertrail-transport';

import ConfigService from '../../config/config-service';
import WinstonLogger from './winston-logger';

export default class PapertrailLogger extends WinstonLogger {
  constructor() {
    const transport = new PapertrailTransport({
      host: ConfigService.getStringValue('papertrail.host'),
      port: ConfigService.getIntValue('papertrail.port'),
      program: ConfigService.hasValue('papertrail.program')
        ? ConfigService.getStringValue('papertrail.program')
        : 'default',
      handleExceptions: true,
    });

    super(transport);
  }
}
