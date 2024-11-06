import { ApplicationServer } from './modules/application';

export interface APIMicroserviceService {
  rootFolderPath: string;
  serverInstance: ApplicationServer;
}
