describe('application serving', () => {
  // before(() => {});

  it('loads the homepage', () => {
    cy.visit('localhost:8080');

    cy.get('h1').should('be.visible').should('have.text', 'Home');
  });
});
