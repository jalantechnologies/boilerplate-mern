import set from 'lodash/set';

xdescribe('Inspectlet', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('should enable integration if key was provided', () => {
    cy.visit('/?inspectlet_diagnostics=true', {
      onLoad(window) {
        set(window, 'Config.inspectLetKey', '812310448');
      },
    });
    cy.get('.inspectlet_diagnostics').should('be.visible');
  });

  it('should disable integration if key was not provided', () => {
    cy.visit('/?inspectlet_diagnostics=true', {
      onLoad(window) {
        set(window, 'Config.inspectLetKey', '');
      },
    });
    cy.get('.inspectlet_diagnostics').should('not.exist');
  });
});
