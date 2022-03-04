import express, { Application } from 'express';
import { Server } from 'http';

import path from 'path';
import expressEjsLayouts from 'express-ejs-layouts';

import AccesstokenServiceManager from './modules/access-token/access-token-manager';
import AccountServiceManager from './modules/account/account-service-manager';
import CommunicationServiceManager from './modules/communication/communication-service-manager';
import TaskServiceManager from './modules/task/task-service-manager';
import ConfigManager from './modules/config/config-manager';
import ConfigService from './modules/config/config-service';
import LoggerManager from './modules/logger/logger-manager';

export default class App {
  private static app: Application;

  public static async startServer(): Promise<Server> {
    this.app = express();

    await ConfigManager.mountConfig();
    await LoggerManager.mountLogger();
    await CommunicationServiceManager.mountService();

    const restAPIServices = await this.createRESTApiServer();
    this.app.use('/api', restAPIServices);

    const app = await this.createExperienceService();
    this.app.use('/', app);

    const port = ConfigService.getStringValue('server.port');
    return this.app.listen(port);
  }

  private static async createRESTApiServer(): Promise<Application> {
    const app: Application = express();

    const accountServiceRESTApi = await AccountServiceManager.createRestAPIServer();
    app.use('/', accountServiceRESTApi);

    const accessTokenServiceRESTApi = await AccesstokenServiceManager.createRestAPIServer();
    app.use('/', accessTokenServiceRESTApi);

    const taskServiceRESTApi = await TaskServiceManager.createRestAPIServer();
    app.use('/', taskServiceRESTApi);

    return app;
  }

  private static async createExperienceService(): Promise<Application> {
    const app: Application = express();

    app.set('view engine', 'ejs');
    app.set('views', path.join(__dirname, 'views'));
    app.use(expressEjsLayouts);
    app.set('layout', 'layouts/layout.ejs');

    app.use(express.static(path.join(__dirname)));

    app.get('/', (_req, res) => res.render('pages/index.ejs'));

    return Promise.resolve(app);
  }
}
