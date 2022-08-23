describe(
  'Inspectlet',
  () => {
    beforeEach(() => {
      cy.visit('/');
    });

    it('should enable integration if key was provided', () => {
      cy.visit('/?inspectlet_diagnostics=true', {
          onLoad (win) {
            win.inspectletKey = '812310448'
          }
        })
      cy.get('.inspectlet_diagnostics').should('be.visible');
    })

    it('should enable integration if key was provided', () => {
      cy.visit('/?inspectlet_diagnostics=true', {
          onLoad (win) {
            win.inspectletKey = ''
          }
        })
      cy.get('.inspectlet_diagnostics').should('not.exist');
    })
  }
)
