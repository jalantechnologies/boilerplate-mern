import { format } from 'winston';
import LokiTransport from 'winston-loki';

import { ConfigService } from '../../config';

import WinstonLogger from './winston-logger';

export default class GrafanaLokiLogger extends WinstonLogger {
  constructor() {
    const transport = new LokiTransport({
      host: ConfigService.getValue('grafana.host'),
      basicAuth: `${ConfigService.getValue<string>('grafana.username')}:${ConfigService.getValue<string>('grafana.password')}`,
      labels: {
        app: ConfigService.getValue('grafana.labels.app'),
        env: ConfigService.getValue('grafana.labels.env'),
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
