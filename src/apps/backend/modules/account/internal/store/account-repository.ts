import { ApplicationRepository } from '../../../application';

import { AccountDB, AccountDbSchema } from './account-db';

const AccountRepository = ApplicationRepository<AccountDB>(
  'accounts',
  AccountDbSchema
);

export default AccountRepository;
