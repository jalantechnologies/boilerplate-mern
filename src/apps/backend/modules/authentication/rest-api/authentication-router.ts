import { ApplicationRouter } from 'backend/modules/application';
import { AuthenticationController } from 'backend/modules/authentication/rest-api/authentication-controller';

export default class AuthenticationRouter extends ApplicationRouter {
  configure(): void {
    const { router } = this;
    const ctrl = new AuthenticationController();

    router.post('/access-tokens', ctrl.createAccessToken);
    router.post('/password-reset-tokens', ctrl.createPasswordResetToken);
  }
}
