/// <reference types="cypress" />

describe(
  'Inspectlet',
  () => {
    beforeEach(() => {
      cy.visit('/');
    });

    it('Should enable integration if key was provided', ()=>{
      window.inspectlet_key = '812310448';
      cy.visit('/?inspectlet_diagnostics=true');
      cy.get('.inspectlet_diagnostics').should('be.visible');
    })
    
    it('Should not enable integration if key was not provided', ()=>{
      window.inspectlet_key = '';
      cy.visit('/?inspectlet_diagnostics=true');
      cy.get('.inspectlet_diagnostics').should('not.exist');
    })
  }
)
