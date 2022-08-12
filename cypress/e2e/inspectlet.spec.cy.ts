describe(
  'To test Inspectlet integration',
  () => {
    beforeEach(() => {
      cy.visit('/');
    });

    it('Should enable integration if key was provided', ()=>{
      cy.window().then(win => {
        let inspectlet_key = win.inspectlet_key;
        cy.visit('/?inspectlet_diagnostics=true');
        if (inspectlet_key) {
          cy.get('.inspectlet_diagnostics').should('be.visible');
        }
      })
    })
    
    it('Should not enable integration if key was not provided', ()=>{
      cy.window().then(win => {
        let inspectlet_key = win.inspectlet_key;
        cy.visit('/?inspectlet_diagnostics=true');
        if (!inspectlet_key) {
          cy.get('.inspectlet_diagnostics').should('not.exist');
        }
      })
    })
  }
)
