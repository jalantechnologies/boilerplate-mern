import {
  AccountDB,
  AccountDbSchema,
} from 'modules/account/internal/store/account-db';
import { ApplicationRepository } from 'modules/application';

const AccountRepository = ApplicationRepository<AccountDB>(
  'accounts',
  AccountDbSchema
);

export default AccountRepository;
