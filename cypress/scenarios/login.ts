import DataManagers from '../data-managers';

export default {
  async cleanup() {
    await DataManagers.accounts.clear();
  },
  async setup() {
    const credentials = await DataManagers.accounts.seedOne();
    return credentials;
  },
};
