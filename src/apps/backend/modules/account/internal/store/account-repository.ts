import {
  AccountDB,
  AccountDbSchema,
} from 'backend/modules/account/internal/store/account-db';
import { ApplicationRepository } from 'backend/modules/application';

const AccountRepository = ApplicationRepository<AccountDB>(
  'accounts',
  AccountDbSchema
);

export default AccountRepository;
