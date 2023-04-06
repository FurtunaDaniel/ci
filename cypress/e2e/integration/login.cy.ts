describe('Log in flow', () => {
  describe('whenever a logged in user navigates to the web application', () => {
    it('should display the dashboard page and sidebar navigation', () => {
      cy.loginByCognitoApi(Cypress.env('TEST_AUTOMATION_USERNAME'), Cypress.env('TEST_AUTOMATION_PASSWORD'))

      cy.visit(`${Cypress.env('environmentUrl')}/`)

      cy.url().should('include', '/dashboard')

      cy.get('.side-main-menu').contains(/Dashboard/i)
    })
  })
})
