import { Server } from 'http';
import * as path from 'path';

import cors from 'cors';
import express, { Application } from 'express';
import expressWinston from 'express-winston';

import { AccessTokenServer } from './modules/access-token';
import { AccountServer } from './modules/account';
import { ConfigService } from './modules/config';
import { Logger, CustomLoggerTransport } from './modules/logger';
import { PasswordResetTokenServer } from './modules/password-reset-token';
import { TaskServer } from './modules/task';
import { CommentServer } from './modules/comment';

const isDevEnv = process.env.NODE_ENV === 'development';

export default class App {
  private static app: Application;

  public static async startServer(): Promise<Server> {
    this.app = express();
    this.app.use(App.getRequestLogger());

    const restAPIServer = this.createRESTApiServer();
    this.app.use('/api', restAPIServer);

    const app = this.createExperienceService();
    this.app.use('/', app);

    // error logger, to be always registered at last
    this.app.use(App.getErrorLogger());

    Logger.info('app - attempting to start server...');
    Logger.info('app - node env - %s', process.env.NODE_ENV);
    Logger.info('app - config env - %s', process.env.NODE_CONFIG_ENV);

    const port = ConfigService.getValue<string>('server.port');
    const server = this.app.listen(port, () => {
      Logger.info('app - server started listening on  - %s', server.address());
    });

    return Promise.resolve(server);
  }

  private static createRESTApiServer(): Application {
    const app: Application = express();

    // if running server in development mode, allow cross-origin calls
    // from webpack dev server
    if (isDevEnv) {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-call
      app.use(cors({
        origin: 'http://localhost:3000',
      }));
    }

    // add your new server here to the list
    [
      new AccountServer(),
      new AccessTokenServer(),
      new PasswordResetTokenServer(),
      new TaskServer(),
      new CommentServer(),
    ].forEach((server) => {
      app.use('/', server.server);
    });

    return app;
  }

  private static createExperienceService(): Application {
    const app: Application = express();

    app.use('/assets', express.static('dist/assets'));

    app.use(express.static('dist/public'));

    app.get('/*', (_req, res) => {
      res.sendFile(path.join(process.cwd(), 'dist/public/index.html'));
    });

    return app;
  }

  private static getRequestLogger(): express.Handler {
    return expressWinston.logger({
      transports: [
        new CustomLoggerTransport(),
      ],
      // no pre-build meta
      meta: false,
      msg: 'app - request - {{req.ip}} - {{res.statusCode}} - {{req.method}} - {{res.responseTime}}ms - {{req.url}} - {{req.headers[\'user-agent\']}}',
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
        new CustomLoggerTransport(),
      ],
    });
  }
}
