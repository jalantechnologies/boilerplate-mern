import * as winston from 'winston';

import ConfigService from '../../config/config-service';

import WinstonLogger from './winston-logger';

export default class DatedogLogger extends WinstonLogger {
  constructor() {
    const DATADOG_API_KEY = ConfigService.getStringValue('datadog.api_key');
    const APP_NAME = ConfigService.getStringValue('datadog.app_name');

    const httpTransportOptions = {
      host: 'http-intake.logs.us5.datadoghq.com',
      path: `/api/v2/logs?dd-api-key=${DATADOG_API_KEY}&ddsource=nodejs&service=${APP_NAME}`,
      ssl: true,
    };

    const transport = new winston.transports.Http(httpTransportOptions);
    super(transport);
  }
}
