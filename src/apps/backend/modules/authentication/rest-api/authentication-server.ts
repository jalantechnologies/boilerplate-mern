import { ApplicationServer } from 'backend/modules/application';
import AuthenticationRouter from 'backend/modules/authentication/rest-api/authentication-router';

export default class AuthenticationServer extends ApplicationServer {
  configure(): void {
    const { server } = this;
    const authenticationRouter = new AuthenticationRouter();

    server.use('/', authenticationRouter.router);
  }
}
