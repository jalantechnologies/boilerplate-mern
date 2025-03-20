import { AccountController } from 'modules/account/rest-api/account-controller';
import { ApplicationRouter } from 'modules/application';
import { accessAuthMiddleware } from 'modules/authentication';

export default class AccountRouter extends ApplicationRouter {
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
