import { ApplicationServer } from '../../application';

import AccessTokenRouter from './access-token-router';

export default class AccessTokenServer extends ApplicationServer {
  constructor() {
    super(new AccessTokenRouter().routerFilePath);
  }

  configure(): void {
    const { server } = this;
    const router = new AccessTokenRouter();

    server.use('/access-tokens', router.router);
  }
}
