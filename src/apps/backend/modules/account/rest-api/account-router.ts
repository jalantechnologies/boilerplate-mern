import { accessAuthMiddleware } from '../../access-token';
import { ApplicationRouter } from '../../application';

import { AccountController } from './account-controller';

export default class AccountRouter extends ApplicationRouter {
  configure(): void {
    const { router } = this;
    const ctrl = new AccountController();

    router.post('/', ctrl.createAccount);

    router.use(accessAuthMiddleware);

    router.get('/:accountId', ctrl.getAccountById);
  }
}
