/// <reference types="cypress" />

describe(
  'Inspectlet',
  () => {
    beforeEach(() => {
      cy.visit('/');
    });

    it('should enable integration if key was provided', () => {
      window.inspectletKey = '812310448';
      cy.visit('/?inspectlet_diagnostics=true');
      cy.get('.inspectlet_diagnostics').should('be.visible');
    })
    
    it('should not enable integration if key was not provided', () => {
      window.inspectletKey = '';
      cy.visit('/?inspectlet_diagnostics=true');
      cy.get('.inspectlet_diagnostics').should('not.exist');
    })
  }
)
