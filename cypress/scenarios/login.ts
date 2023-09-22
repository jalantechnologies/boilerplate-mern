import AccountsFixture from '../../test/fixtures/accounts';

import { Scenario } from './types';

export default {
  async setup() {
    return AccountsFixture.seedOne();
  },

  async cleanup() {
    await AccountsFixture.clear();
  },
} as Scenario;
