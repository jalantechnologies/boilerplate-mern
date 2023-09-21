import { PapertrailTransport } from 'winston-papertrail-transport';

import { ConfigService } from '../../config';

import WinstonLogger from './winston-logger';

export default class PapertrailLogger extends WinstonLogger {
  constructor() {
    const transport = new PapertrailTransport({
      host: ConfigService.getValue('papertrail.host'),
      port: parseInt(ConfigService.getValue('papertrail.port'), 10),
      program: ConfigService.hasValue('papertrail.program')
        ? ConfigService.getValue('papertrail.program')
        : 'default',
      handleExceptions: true,
    });

    super(transport);
  }
}
