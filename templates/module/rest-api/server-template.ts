import { ApplicationServer } from '../../application';

import $entityNameRouter from './$moduleName-router';

export default class $entityNameServer extends ApplicationServer {
  configure(): void {
    const { server } = this;
    const router = new $entityNameRouter();

    const baseUrl = '$baseUrl';

    server.use(`${baseUrl}/$moduleName`, router.router);
  }
}
