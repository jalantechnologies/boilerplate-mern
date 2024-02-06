import { ApplicationRouter } from '../../application';

import { AccessTokenController } from './access-token-controller';

export default class AccessTokenRouter extends ApplicationRouter {
  configure(): void {
    const { router } = this;
    const ctrl = new AccessTokenController();

    router.post('/', ctrl.createAccessToken);
  }
}
