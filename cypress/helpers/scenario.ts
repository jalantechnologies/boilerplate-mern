export const setupScenario = <T = unknown>(
  name: string,
  params?: unknown,
): Cypress.Chainable<T> => cy.task('scenario:setup', { name, params });
