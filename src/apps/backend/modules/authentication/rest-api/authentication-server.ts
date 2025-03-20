import { ApplicationServer } from 'modules/application';
import AuthenticationRouter from 'modules/authentication/rest-api/authentication-router';

export default class AuthenticationServer extends ApplicationServer {
  configure(): void {
    const { server } = this;
    const authenticationRouter = new AuthenticationRouter();

    server.use('/', authenticationRouter.router);
  }
}
