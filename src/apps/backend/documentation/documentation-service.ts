import App from '../app';

import expressListRoutes from './internals/express-list-routes';

export default class DocumentationService {
  public static generateDocumentation(): void {
    const apiMicroservices = App.getAPIMicroservices();

    apiMicroservices.forEach((server) => {
      // TODO:replace logs with actual documentation generation
      console.log(server.serverRootFolderPath);
      console.log(
        App.baseRoutePath,
        expressListRoutes(server.serverInstance.server),
      );
    });
  }
}
