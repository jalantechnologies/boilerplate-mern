import { ApplicationRouter } from '../../application';

import * as AccountController from './account-controller';

export default class AccountRouter extends ApplicationRouter {
  configure(): void {
    const { router } = this;

    router.post('/', AccountController.createAccount);
  }
}
