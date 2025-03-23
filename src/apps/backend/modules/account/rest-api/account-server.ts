import AccountRouter from 'backend/modules/account/rest-api/account-router';
import { ApplicationServer } from 'backend/modules/application';

export default class AccountServer extends ApplicationServer {
  configure(): void {
    const { server } = this;
    const router = new AccountRouter();

    server.use('/accounts', router.router);
  }
}
