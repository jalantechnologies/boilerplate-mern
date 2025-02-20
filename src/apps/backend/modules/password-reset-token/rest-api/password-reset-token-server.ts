import { ApplicationServer } from '../../application';

import PasswordResetTokenRouter from './password-reset-token-router';

export default class PasswordResetTokenServer extends ApplicationServer {
  configure(): void {
    const { server } = this;
    const router = new PasswordResetTokenRouter();

    server.use('/', router.router);
  }
}
