describe(
  'To test inspectlet integration',
  () => {
    it('injection of code according to wid', ()=>{
      cy.visit('/');
      cy.window().then(win => {
        let inspectlet_key = win.inspectlet_key;
        cy.visit('/?inspectlet_diagnostics=true');
        if (inspectlet_key) {
          cy.get('.inspectlet_diagnostics').should('be.visible');
        } else {
          cy.get('.inspectlet_diagnostics').should('not.exist');
        }
      })
    })
  }
)
