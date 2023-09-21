// define separate files for hooks and import them here
// mocha imports this files and all associated hooks get registered along the way
// @see - https://mochajs.org/#available-root-hooks

import { startApplication } from '../helpers/app';

import { registerPlugins } from './chai';
import { connectDatabase, disconnectDatabase, cleanDatabase } from './database';
import { initMocks } from './mocks';
import { resetSinon, restoreSinon } from './sinon';

export const mochaHooks = {
  async beforeAll(this: Mocha): Promise<void> {
    // set a longer timeout (10 seconds) for this hook to allow database
    // to report status within 5 seconds
    this.timeout(10000);

    registerPlugins();
    await connectDatabase();
    await startApplication();
  },
  async beforeEach(): Promise<void> {
    initMocks();
    await cleanDatabase();
  },
  afterEach(): void {
    resetSinon();
    restoreSinon();
  },
  async afterAll(): Promise<void> {
    await disconnectDatabase();
  },
};
