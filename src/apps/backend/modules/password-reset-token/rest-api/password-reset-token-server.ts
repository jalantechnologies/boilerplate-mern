import { ApplicationServer } from '../../application';

import PasswordResetTokenRouter from './password-reset-token-router';

export default class PasswordResetTokenServer extends ApplicationServer {
  routerFilePath: string;

  configure(): void {
    const { server } = this;
    const router = new PasswordResetTokenRouter();

    server.use('/', router.router);

    this.routerFilePath = PasswordResetTokenRouter.currentFilePath();
  }
}
