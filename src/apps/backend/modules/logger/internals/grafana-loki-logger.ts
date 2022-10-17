import { format } from 'winston';
import LokiTransport from 'winston-loki';

import ConfigService from '../../config/config-service';

import WinstonLogger from './winston-logger';

export default class GrafanaLokiLogger extends WinstonLogger {
  constructor() {
    const transport = new LokiTransport({
      host: ConfigService.getStringValue('grafana.host'),
      basicAuth: `${ConfigService.getStringValue('grafana.username')}:${ConfigService.getStringValue('grafana.password')}`,
      labels: {
        app: ConfigService.getStringValue('grafana.labels.app'),
        env: ConfigService.getStringValue('grafana.labels.env'),
      },
      json: true,
      format: format.json(),
      replaceTimestamp: true,
      // eslint-disable-next-line no-console
      onConnectionError: (err) => console.error(err),
    });

    super(transport);
  }
}
