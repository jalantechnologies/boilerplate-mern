import { accessAuthMiddleware } from '../../access-token/rest-api/access-auth-middleware';
import { ApplicationRouter } from '../../application';

import { AccountController } from './account-controller';

export default class AccountRouter extends ApplicationRouter {
  public static currentFilePath(): string {
    return __filename;
  }

  configure(): void {
    const { router } = this;
    const ctrl = new AccountController();

    router.post('/', ctrl.createAccount);

    router.patch('/:accountId', ctrl.updateAccount);

    router.delete('/:accountId', ctrl.deleteAccount);

    router.use(accessAuthMiddleware);

    router.get('/:accountId', ctrl.getAccountById);
  }
}
