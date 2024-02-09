describe('App', () => {
  it('should show not found page if requested url was not found', () => {
    cy.visit('/some_random_page', {
      failOnStatusCode: false,
    });

    cy.url().should('be.equal', `${Cypress.config('baseUrl')}/login`);
  });
});
