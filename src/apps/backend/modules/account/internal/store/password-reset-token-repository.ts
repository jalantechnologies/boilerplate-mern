import { ApplicationRepository } from '../../../application';

import { PasswordResetTokenDB, passwordResetTokenDbSchema } from './password-reset-token-db';

const PasswordResetTokenRepository = ApplicationRepository<PasswordResetTokenDB>(
  'password-reset-token',
  passwordResetTokenDbSchema,
);

export default PasswordResetTokenRepository;
