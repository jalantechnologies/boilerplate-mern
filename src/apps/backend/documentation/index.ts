import App from '../app';

import expressListRoutes from './express-list-routes';

(() => {
  const servers = App.getAllServers();
  servers.forEach((server) => {
    // TODO:replace logs with actual documentation generation
    console.log(server.routerFilePath);
    console.log(expressListRoutes(server.server));
  });
  process.exit(0);
})();
