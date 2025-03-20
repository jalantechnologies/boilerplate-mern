import { ApplicationRepository } from 'modules/application';
import {
  PasswordResetTokenDB,
  passwordResetTokenDbSchema,
} from 'modules/authentication/internals/password-reset-token/store/password-reset-token-db';

const PasswordResetTokenRepository =
  ApplicationRepository<PasswordResetTokenDB>(
    'password-reset-tokens',
    passwordResetTokenDbSchema
  );

export default PasswordResetTokenRepository;
