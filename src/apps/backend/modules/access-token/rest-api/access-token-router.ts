import { ApplicationRouter } from '../../application';

import * as AccessTokenController from './access-token-controller';

export default class AccessTokenRouter extends ApplicationRouter {
  configure(): void {
    const { router } = this;

    router.post('/', AccessTokenController.createAccessToken);
  }
}
