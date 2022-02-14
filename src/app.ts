import express, { Application } from 'express';
import { Server } from 'http';
import serverErrorHandler from './error-handler';
import AccesstokenServiceManager from './modules/access-token/access-token-manager';
import AccountServiceManager from './modules/account/account-service-manager';
import CommunicationServiceManager from './modules/communication/communication-service-manager';
import ConfigManager from './modules/config/config-manager';
import ConfigService from './modules/config/config-service';
import LoggerManager from './modules/logger/logger-manager';

export default class App {
  private static app: Application;

  private static async createRESTApiServer(): Promise<Application> {
    const app = express();

    const accountServiceRESTApi = await AccountServiceManager.createRestAPIServer();
    app.use('/', accountServiceRESTApi);

    const accessTokenServiceRESTApi = await AccesstokenServiceManager.createRestAPIServer();
    app.use('/', accessTokenServiceRESTApi);

    return app;
  }

  public static async startRESTApiServer(): Promise<Server> {
    this.app = express();

    // Core Services
    await ConfigManager.mountConfig();
    await LoggerManager.mountLogger();
    await CommunicationServiceManager.mountService();

    // loading all microservices
    const microServicesApi = await this.createRESTApiServer();
    this.app.use('/api', microServicesApi);

    // Error handling
    this.app.use(serverErrorHandler);

    const port = ConfigService.getIntValue('server.port');
    return this.app.listen(port);
  }
}
