import { accessAuthMiddleware } from '../../access-token/rest-api/access-auth-middleware';
import { ApplicationRouter } from '../../application';

import { AccountController } from './account-controller';

export default class AccountRouter extends ApplicationRouter {
  configure(): void {
    const { router } = this;
    const ctrl = new AccountController();

    router.post('/', ctrl.createAccount);

    router.patch('/:accountId/reset-password', ctrl.resetPassword);

    router.use(accessAuthMiddleware);

    router.get('/:accountId', ctrl.getAccountById);
  }
}
