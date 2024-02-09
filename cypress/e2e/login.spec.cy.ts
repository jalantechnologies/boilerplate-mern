import { CreateAccountParams } from '../../src/apps/backend/modules/account';
import { setupScenario } from '../helpers/scenario';

describe('Login', () => {
  const credentials: CreateAccountParams = setupScenario('login');

  beforeEach(() => {
    cy.visit('/login');
  });

  it('loads the login component', () => {
    cy.get('form').should('be.visible');
  });

  it('should allow login', () => {
    cy.get('[data-testid="username"]').clear();
    cy.get('[data-testid="username"]').type(credentials.username);
    cy.get('[data-testid="password"]').clear();
    cy.get('[data-testid="password"]').type(credentials.password);
    cy.get('button[data-baseweb="button"]').click();

    cy.url().should('be.equal', `${Cypress.config('baseUrl')}/`);
  });

  it('should not allow login for removed credentials', () => {
    cy.task('scenario:cleanup', 'login');
    cy.get('[data-testid="username"]').clear();
    cy.get('[data-testid="username"]').type(credentials.username);
    cy.get('[data-testid="password"]').clear();
    cy.get('[data-testid="password"]').type(credentials.password);
    cy.get('button[data-baseweb="button"]').click();

    const toaster = () => cy.get('div[data-baseweb="toast"]');
    toaster().should(
      'contain',
      `${credentials.username} not found with provided parameters.`,
    );
  });
});
