import { defineConfig } from 'cypress';

import scenarios from './cypress/scenarios';

export default defineConfig({
  e2e: {
    async setupNodeEvents(on, config) {
      on('task', {
        async 'scenario:cleanup'(scenario) {
          if (scenarios[scenario] == undefined)
            throw new Error('Undefined Scenario');

          await scenarios[scenario].cleanup();

          return null;
        },
        async 'scenario:setup'(scenario) {
          if (scenarios[scenario] == undefined)
            throw new Error('Undefined Scenario');

          const res = await scenarios[scenario].setup();

          return res || null;
        },
      });
    },
  },
  retries: {
    // Configure retry attempts for `cypress run`
    // Default is 0
    runMode: 2,
    // Configure retry attempts for `cypress open`
    // Default is 0
    openMode: 0,
  },
  screenshotOnRunFailure: false,
  video: false,
});
