import 'module-alias/register';
import { Server } from 'http';
import * as path from 'path';

import { AccountServer } from 'backend/modules/account';
import { ApplicationServer } from 'backend/modules/application';
import { AuthenticationServer } from 'backend/modules/authentication';
import { ConfigService } from 'backend/modules/config';
import {
  DocumentationServer,
  DocumentationService,
  expressListRoutes,
} from 'backend/modules/documentation';
import { Logger, CustomLoggerTransport } from 'backend/modules/logger';
import { TaskServer } from 'backend/modules/task';
import cors from 'cors';
import express, { Application } from 'express';
import expressWinston from 'express-winston';

interface APIMicroserviceService {
  rootFolderPath: string;
  serverInstance: ApplicationServer;
}

const isDevEnv = process.env.NODE_ENV === 'development';

export default class App {
  public static baseAPIRoutePath = '/api';

  private static app: Application;

  public static async startServer(): Promise<Server> {
    this.app = express();
    this.app.use(App.getRequestLogger());

    const restAPIServer = this.createRESTApiServer();
    this.app.use(this.baseAPIRoutePath, restAPIServer);

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

    DocumentationService.generateAPIDocumentation().catch((error: Error) => {
      Logger.error(
        `app - error generating and injecting documentation: ${error.message}`
      );
    });

    return Promise.resolve(server);
  }

  public static getAPIMicroservices(): APIMicroserviceService[] {
    // add the new server here to the list
    return [
      {
        serverInstance: new AccountServer(),
        rootFolderPath: path.join(__dirname, 'modules/account'),
      },
      {
        serverInstance: new AuthenticationServer(),
        rootFolderPath: path.join(__dirname, 'modules/authentication'),
      },
      {
        serverInstance: new DocumentationServer(),
        rootFolderPath: path.join(__dirname, 'modules/documentation'),
      },
      {
        serverInstance: new TaskServer(),
        rootFolderPath: path.join(__dirname, 'modules/task'),
      },
    ];
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
        })
      );
    }

    this.getAPIMicroservices().forEach((server) => {
      app.use('/', server.serverInstance.server);

      const routes = expressListRoutes(
        server.serverInstance.server,
        this.baseAPIRoutePath
      );
      DocumentationService.expressRoutesList.push({
        rootFolderPath: server.rootFolderPath,
        routes,
      });
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
