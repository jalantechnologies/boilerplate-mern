import { ApplicationRouter } from 'modules/application';
import { AuthenticationController } from 'modules/authentication/rest-api/authentication-controller';

export default class AuthenticationRouter extends ApplicationRouter {
  configure(): void {
    const { router } = this;
    const ctrl = new AuthenticationController();

    router.post('/access-tokens', ctrl.createAccessToken);
    router.post('/password-reset-tokens', ctrl.createPasswordResetToken);
  }
}
