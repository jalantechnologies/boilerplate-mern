import config from 'config';
import { defineConfig } from 'cypress';

import scenarios from './cypress/scenarios';

export default defineConfig({
  e2e: {
    baseUrl: config.get('webAppHost'),
    setupNodeEvents(on) {
      on('task', {
        'scenario:setup': async ({
          name,
          params,
        }: {
          name: string;
          params?: unknown;
        }) => {
          const scenario = scenarios[name];
          if (!scenario) {
            throw new Error(
              `Could not run setup - Scenario with name ${name} not found`
            );
          }

          const res = await scenario.setup(params);
          return res || null;
        },
        'scenario:cleanup': async ({ name }: { name: string }) => {
          const scenario = scenarios[name];
          if (!scenario) {
            throw new Error(
              `Could not run cleanup - Scenario with name ${name} not found`
            );
          }

          await scenario.cleanup();
          return null;
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
  screenshotOnRunFailure: true,
  video: false,
});
