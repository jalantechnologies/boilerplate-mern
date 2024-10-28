import fs from 'fs';
import path from 'path';

import App from '../app';

import expressListRoutes from './internals/express-list-routes';

export default class DocumentationService {
  public static generateDocumentation(): void {
    const apiMicroservices = App.getAPIMicroservices();
    // TODO: update to a valid path & file name, once done with documentation generation through ai
    const documentationPath = path.join(
      __dirname,
      '../../../assets/documentation/index.txt',
    );
    let documentationContent = '';

    apiMicroservices.forEach((server) => {
      const routes = expressListRoutes(server.serverInstance.server);
      const serverInfo = `Server Root: ${server.serverRootFolderPath}\nRoutes:\n${JSON.stringify(routes, null, 2)}\n`;
      documentationContent += serverInfo;
    });

    fs.writeFileSync(documentationPath, documentationContent, 'utf8');
  }
}
