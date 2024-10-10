import fs from 'fs';
import { Server } from 'http';
import * as path from 'path';

import cors from 'cors';
import express, { Application } from 'express';
import expressWinston from 'express-winston';

import { appBaseRoute } from './constants';
import { AccessTokenServer } from './modules/access-token';
import { AccountServer } from './modules/account';
import { routeMetadata } from './modules/application/route-metadata';
import { ConfigService } from './modules/config';
import { Logger, CustomLoggerTransport } from './modules/logger';
import { PasswordResetTokenServer } from './modules/password-reset-token';
import { TaskServer } from './modules/task';

const isDevEnv = process.env.NODE_ENV === 'development';

export default class App {
  private static app: Application;

  public static async startServer(): Promise<Server> {
    this.app = express();
    this.app.use(App.getRequestLogger());

    const restAPIServer = this.createRESTApiServer();
    this.app.use(appBaseRoute, restAPIServer);

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
      this.logRouteMetadata(); // Add this line to log the route metadata
    });

    return Promise.resolve(server);
  }

  public static logRouteMetadata() {
    let output = '';

    routeMetadata.forEach((metadata) => {
      output += `API: ${metadata.method} ${metadata.route}\n`;
      output += `Controller: ${metadata.controller}.${metadata.action}\n`;
      output += `Controller Method:\n${metadata.controllerMethod}\n`;
      output += `Serializer Method:\n${metadata.serializerMethod}\n`;
      output += `Return Type:\n${metadata.returnType}\n`;
      output += '---\n';
    });

    const outputPath = path.join(process.cwd(), 'sample-output.txt');
    fs.writeFileSync(outputPath, output);
  }

  private static createRESTApiServer(): Application {
    const app: Application = express();

    // if running server in development mode, allow cross-origin calls
    // from webpack dev server
    if (isDevEnv) {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-call
      app.use(
        cors({
          origin: 'http://localhost:3000',
        }),
      );
    }

    // add your new server here to the list
    [
      new AccountServer(),
      new AccessTokenServer(),
      new PasswordResetTokenServer(),
      new TaskServer(),
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
      transports: [new CustomLoggerTransport()],
      // no pre-build meta
      meta: false,
      msg: "app - request - {{req.ip}} - {{res.statusCode}} - {{req.method}} - {{res.responseTime}}ms - {{req.url}} - {{req.headers['user-agent']}}",
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
      transports: [new CustomLoggerTransport()],
    });
  }
}
