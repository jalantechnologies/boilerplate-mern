import { ApplicationServer } from './modules/application';

export interface APIMicroserviceService {
  serverName: string;
  serverRootFolderPath: string;
  serverInstance: ApplicationServer;
}
