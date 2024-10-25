import { ApplicationRouter } from '../../application';

import { PasswordResetTokenController } from './password-reset-token-controller';

export default class PasswordResetTokenRouter extends ApplicationRouter {
  constructor() {
    super(__filename);
  }

  configure(): void {
    const { router } = this;
    const ctrl = new PasswordResetTokenController();

    router.post('/password-reset-tokens', ctrl.createPasswordResetToken);
  }
}
