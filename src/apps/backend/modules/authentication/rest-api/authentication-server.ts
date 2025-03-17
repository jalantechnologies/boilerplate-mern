import { ApplicationServer } from '../../application';

import AuthenticationRouter from './authentication-router';

export default class AuthenticationServer extends ApplicationServer {
  configure(): void {
    const { server } = this;
    const authenticationRouter = new AuthenticationRouter();

    server.use('/', authenticationRouter.router);
  }
}
