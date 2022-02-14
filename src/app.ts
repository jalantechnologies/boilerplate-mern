import express, { Application } from 'express';
import { Server } from 'http';
import serverErrorHandler from './error-handler';
import MicroServices from './load-services';
import CommunicationServiceManager from './modules/communication/communication-service-manager';
import ConfigManager from './modules/config/config-manager';
import ConfigService from './modules/config/config-service';
import LoggerManager from './modules/logger/logger-manager';

export default class App {
  private static app: Application;

  public static async startRESTApiServer(): Promise<Server> {
    this.app = express();

    // Core Services
    await ConfigManager.mountConfig();
    await LoggerManager.mountLogger();
    await CommunicationServiceManager.mountService();

    // loading all microservices
    // all microservices would listen on /api endpoint now.
    const microServicesApi = await MicroServices.loadMicroServices();
    this.app.use('/api', microServicesApi);

    // Error handling
    this.app.use(serverErrorHandler);

    const port = ConfigService.getIntValue('server.port');
    return this.app.listen(port);
  }
}
