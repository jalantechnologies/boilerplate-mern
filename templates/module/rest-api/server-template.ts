import { ApplicationServer } from '../../application';

import $entityNameRouter from './$moduleName-router';

export default class $moduleNameServer extends ApplicationServer {
  configure(): void {
    const { server } = this;
    const router = new $entityNameRouter();

    server.use('/$moduleNames', router.router);
  }
}
