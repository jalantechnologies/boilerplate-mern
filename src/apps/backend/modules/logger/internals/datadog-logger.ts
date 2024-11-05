import * as winston from 'winston';

import { ConfigService } from '../../config';

import WinstonLogger from './winston-logger';

export default class DatadogLogger extends WinstonLogger {
  constructor() {
    const DD_REGION = ConfigService.getValue<string>('datadog.region');
    const DD_API_KEY =
      ConfigService.hasValue('datadog.api_key') &&
      ConfigService.getValue<string>('datadog.api_key');
    const DD_APP_NAME = ConfigService.getValue<string>('datadog.app_name');

    const transport = new winston.transports.Http({
      host: `http-intake.logs.${DD_REGION}.datadoghq.com`,
      path: `/api/v2/logs?dd-api-key=${DD_API_KEY}&ddsource=nodejs&service=${DD_APP_NAME}`,
      ssl: true,
    });

    super(transport);
  }
}
