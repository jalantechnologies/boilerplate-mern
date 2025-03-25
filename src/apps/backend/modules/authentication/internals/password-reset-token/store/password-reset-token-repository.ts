import { ApplicationRepository } from 'backend/modules/application';
import {
  PasswordResetTokenDB,
  passwordResetTokenDbSchema,
} from 'backend/modules/authentication/internals/password-reset-token/store/password-reset-token-db';

const PasswordResetTokenRepository =
  ApplicationRepository<PasswordResetTokenDB>(
    'password-reset-tokens',
    passwordResetTokenDbSchema
  );

export default PasswordResetTokenRepository;
