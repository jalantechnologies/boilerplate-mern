describe('application serving', () => {
  let credentials;

  beforeEach(() => {
    // SETUP THE LOGIN SCENARIO
    cy.task('scenario:setup', 'login').then((creds) => {
      credentials = creds;
    });
    cy.visit('/');
  });

  it('loads the homepage', () => {
    cy.get('h1').should('be.visible').should('have.text', 'Home');
  });

  it('loads the login component', () => {
    cy.get('form').should('be.visible');
  });

  it('should allow login', () => {
    cy.get('#username').clear().type('notTheActualValue');
    cy.get('#password').clear().type('notTheActualValue');
    cy.get('button').click();

    cy.wait(500);

    cy.get('#success').should('be.visible').should('have.text', 'SUCCESS!');
  });

  it('should not allow login for removed credentials', () => {
    cy.task('scenario:cleanup', 'login');
    cy.get('#username').clear().type(credentials.username);
    cy.get('#password').clear().type(credentials.password);
    cy.get('button').click();

    cy.get('#error').should('be.visible').should('have.text', 'ERROR!');
  });

  afterEach(() => {
    // CLEAN UP THE LOGIN SCENARIO
    credentials = null;
    cy.task('scenario:cleanup', 'login');
  });
});
