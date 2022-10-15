import { Server } from 'http';
import * as path from 'path';

import cors from 'cors';
import express, { Application } from 'express';
import expressWinston from 'express-winston';

import AccessTokenServiceManager from './modules/access-token/access-token-manager';
import AccountServiceManager from './modules/account/account-service-manager';
import CommunicationServiceManager from './modules/communication/communication-service-manager';
import ConfigManager from './modules/config/config-manager';
import ConfigService from './modules/config/config-service';
import Logger from './modules/logger/logger';
import LoggerManager from './modules/logger/logger-manager';
import TaskServiceManager from './modules/task/task-service-manager';

const isDevEnv = process.env.NODE_ENV === 'development';

export default class App {
  private static app: Application;

  public static async startServer(): Promise<Server> {
    this.app = express();
    this.app.use(App.getRequestLogger());

    await ConfigManager.mountConfig();
    await LoggerManager.mountLogger();
    await CommunicationServiceManager.mountService();

    const restAPIServices = await this.createRESTApiServer();
    this.app.use('/api', restAPIServices);

    const app = await this.createExperienceService();
    this.app.use('/', app);

    // error logger, to be always registered at last
    this.app.use(App.getErrorLogger());

    const port = ConfigService.getStringValue('server.port');
    const server = this.app.listen(port);

    Logger.info(`http server started listening on port - ${port}`);
    return server;
  }

  private static async createRESTApiServer(): Promise<Application> {
    const app: Application = express();

    // if running server in development mode, allow cross-origin calls
    // from webpack dev server
    if (isDevEnv) {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-call
      app.use(cors({
        origin: 'http://localhost:3000',
      }));
    }

    const accountServiceRESTApi = await AccountServiceManager.createRestAPIServer();
    app.use('/', accountServiceRESTApi);

    const accessTokenServiceRESTApi = await AccessTokenServiceManager.createRestAPIServer();
    app.use('/', accessTokenServiceRESTApi);

    const taskServiceRESTApi = await TaskServiceManager.createRestAPIServer();
    app.use('/', taskServiceRESTApi);

    return app;
  }

  private static async createExperienceService(): Promise<Application> {
    const app: Application = express();

    app.use('/assets', express.static('dist/assets'));

    app.use(express.static('dist/public'));

    app.get('/*', (_req, res) => {
      res.sendFile(path.join(process.cwd(), 'dist/public/index.html'));
    });

    return Promise.resolve(app);
  }

  private static getRequestLogger(): express.Handler {
    return expressWinston.logger({
      transports: [
        LoggerManager.getWinstonTransport(),
      ],
      // no pre-build meta
      meta: false,
      msg: 'www - request - {{req.ip}} - {{res.statusCode}} - {{req.method}} - {{res.responseTime}}ms - {{req.url}} - {{req.headers[\'user-agent\']}}',
      // use the default express/morgan request formatting
      // enabling this will override any msg if true
      expressFormat: false,
      // force colorize when using custom msg
      colorize: true,
      // set log level according to response status
      statusLevels: true,
    });
  }

  private static getErrorLogger(): express.ErrorRequestHandler {
    return expressWinston.errorLogger({
      transports: [
        LoggerManager.getWinstonTransport(),
      ],
    });
  }
}
