import { CreateAccountParamsByUsernameAndPassword } from '../../src/apps/backend/modules/account';

describe('Login', () => {
  beforeEach(() => {
    // Set up the scenario and alias the credentials
    cy.task('scenario:setup', { name: 'login' }).as('credentials');
    cy.visit('/login');
  });

  it('loads the login component', () => {
    cy.get('form').should('be.visible');
  });

  it('should allow login', () => {
    // Use the alias to access credentials
    cy.get<CreateAccountParamsByUsernameAndPassword>('@credentials').then(
      (credentials) => {
        cy.get('input[name="username"]').clear();
        cy.get('input[name="username"]').type(credentials.username);
        cy.get('input[name="password"]').clear();
        cy.get('input[name="password"]').type(credentials.password);
        cy.get('button[type="submit"]').click();

        cy.url().should('be.equal', `${Cypress.config('baseUrl')}/`);
      }
    );
  });

  it('should not allow login for removed credentials', () => {
    cy.get<CreateAccountParamsByUsernameAndPassword>('@credentials').then(
      (credentials) => {
        // First remove the account and then try to login
        cy.task('scenario:cleanup', { name: 'login' }).then(() => {
          cy.get('input[name="username"]').clear();
          cy.get('input[name="username"]').type(credentials.username);
          cy.get('input[name="password"]').clear();
          cy.get('input[name="password"]').type(credentials.password);
          cy.get('button[type="submit"]').click();

          cy.contains(
            'div',
            `System is unable to find an account with id: ${credentials.username}`
          ).should('be.visible');
        });
      }
    );
  });
});
