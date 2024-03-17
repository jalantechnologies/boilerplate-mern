import { ApplicationRepository } from '../../../application';

import { AccountDB, AccountDbSchema } from './account-db';

const AccountRepository = ApplicationRepository<AccountDB>(
  'Account',
  AccountDbSchema,
);

export default AccountRepository;
