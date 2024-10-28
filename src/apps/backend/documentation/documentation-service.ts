import fs from 'fs';
import path from 'path';

import App from '../app';
import { ConfigService } from '../modules/config';
import { Logger } from '../modules/logger';

import expressListRoutes from './internals/express-list-routes';

export default class DocumentationService {
  public static generateDocumentation(): void {
    const apiMicroservices = App.getAPIMicroservices();
    // TODO: update to a valid path & file name, once done with documentation generation through ai
    const documentationPath = path.join(
      __dirname,
      '../../../assets/documentation/index.md',
    );
    let documentationContent = '';

    apiMicroservices.forEach((server) => {
      const routes = expressListRoutes(server.serverInstance.server);
      const serverInfo = `Server Root: ${server.serverRootFolderPath}\nRoutes:\n${JSON.stringify(routes, null, 2)}\n`;
      documentationContent += serverInfo;
    });

    const isDocumentationEnabled = ConfigService.getValue<boolean>(
      'documentation.enabled',
    );

    if (isDocumentationEnabled) {
      fs.writeFileSync(documentationPath, documentationContent, 'utf8');
    } else {
      Logger.info('Documentation is disabled for the current environment');
    }
  }
}
