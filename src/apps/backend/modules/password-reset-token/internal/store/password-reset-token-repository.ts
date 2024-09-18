import { ApplicationRepository } from '../../../application';
import { PasswordResetToken } from '../../types';

import { passwordResetTokenDbSchema } from './password-reset-token-db';

const PasswordResetTokenRepository = ApplicationRepository<PasswordResetToken>(
  'password-reset-tokens',
  passwordResetTokenDbSchema,
);

export default PasswordResetTokenRepository;
