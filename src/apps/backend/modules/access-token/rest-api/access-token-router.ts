import { ApplicationRouter } from '../../application';

import { AccessTokenController } from './access-token-controller';

export default class AccessTokenRouter extends ApplicationRouter {
  public static currentFilePath(): string {
    return __filename;
  }

  configure(): void {
    const { router } = this;
    const ctrl = new AccessTokenController();

    router.post('/', ctrl.createAccessToken);
  }
}
