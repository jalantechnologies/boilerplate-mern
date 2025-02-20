import { ApplicationServer } from '../../application';

import AccountRouter from './account-router';

export default class AccountServer extends ApplicationServer {
  configure(): void {
    const { server } = this;
    const router = new AccountRouter();

    server.use('/accounts', router.router);
  }
}
