import { CreateAccountParamsByUsernameAndPassword } from '../../src/apps/backend/modules/account';
import { setupScenario } from '../helpers/scenario';
import { Nullable } from '../types/common';

describe('Login', () => {
  const credentials: Nullable<CreateAccountParamsByUsernameAndPassword> =
    setupScenario('login');

  beforeEach(() => {
    cy.visit('/login');
  });

  it('loads the login component', () => {
    cy.get('form').should('be.visible');
  });

  it('should allow login', () => {
    cy.get('[data-testid="username"]').clear();
    // @ts-expect-error - credentials might be null and supposed to be that way for the cypress test
    cy.get('[data-testid="username"]').type(credentials.username);
    cy.get('[data-testid="password"]').clear();
    // @ts-expect-error - credentials might be null and supposed to be that way for the cypress test
    cy.get('[data-testid="password"]').type(credentials.password);
    cy.get('button[data-baseweb="button"]').click();

    cy.url().should('be.equal', `${Cypress.config('baseUrl')}/`);
  });

  it('should not allow login for removed credentials', () => {
    cy.task('scenario:cleanup', 'login');
    cy.get('[data-testid="username"]').clear();
    // @ts-expect-error - credentials might be null and supposed to be that way for the cypress test
    cy.get('[data-testid="username"]').type(credentials.username);
    cy.get('[data-testid="password"]').clear();
    // @ts-expect-error - credentials might be null and supposed to be that way for the cypress test
    cy.get('[data-testid="password"]').type(credentials.password);
    cy.get('button[data-baseweb="button"]').click();

    const toaster = () => cy.get('div[data-baseweb="toast"]');

    toaster().should(
      'contain',
      // @ts-expect-error - credentials might be null and supposed to be that way for the cypress test
      `${credentials.username} not found with provided parameters.`,
    );
  });
});
