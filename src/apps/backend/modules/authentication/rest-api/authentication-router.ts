import { ApplicationRouter } from '../../application';

import { AuthenticationController } from './authentication-controller';

export default class AuthenticationRouter extends ApplicationRouter {
  configure(): void {
    const { router } = this;
    const ctrl = new AuthenticationController();

    router.post('/access-tokens', ctrl.createAccessToken);
    router.post('/password-reset-tokens', ctrl.createPasswordResetToken);
  }
}
