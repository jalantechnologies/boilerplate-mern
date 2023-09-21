import AccountsFixture from '../../test/fixtures/accounts';

import { Scenario } from './types';

export default {
  async cleanup() {
    await AccountsFixture.clear();
  },
  async setup<CreateAccountParams>() {
    const credentials = await AccountsFixture.seedOne();
    return credentials as unknown as CreateAccountParams;
  },
} as Scenario;
