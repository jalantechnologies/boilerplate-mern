import express, { Application } from 'express';
import { Server } from 'http';
import CommunicationServiceManager from './modules/communication/communication-service-manager';
import ConfigManager from './modules/config/config-manager';

export default class App {
  private static app: Application;

  public static async startRESTApiServer(): Promise<Server> {
    this.app = express();
    await ConfigManager.mountConfig();
    await CommunicationServiceManager.mountService();
    // The order of core services is important because Logger depends on Config
    // await ConfigManager.mountConfig()
    // await LoggerManager.mountLogger()
    // await CommunicationServiceManager.mountService()

    // Mount micro services, the order is not important here
    // const accountServiceRESTApi = AccountServiceManager.createRestAPIServer()
    // this.app.use('/', accountServiceRESTApi)

    // const accessTokenServiceRESTApi = AccessTokenServiceManager.createRestAPIServer()
    // this.app.use('/', accessTokenServiceRESTApi)

    // const taskServiceRESTApi = TaskServiceManager.createRestAPIServer()
    // this.app.use('/', taskServiceRESTApi)

    // TODO: Read the port from ConfigService
    return this.app.listen(8000);
  }
}
