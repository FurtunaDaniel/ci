describe('Log in flow', () => {
  describe('whenever a logged in user navigates to the web application', () => {
    it('should display the home page and sidebar navigation', () => {
      console.log('zzz', Cypress.env('TEST_AUTOMATION_USERNAME'))
      cy.loginByCognitoApi(Cypress.env('TEST_AUTOMATION_USERNAME'), Cypress.env('TEST_AUTOMATION_PASSWORD'))

      cy.visit(`${Cypress.env('environmentUrl')}/`)

      cy.url().should('include', '/home')

      cy.get('.side-main-menu').contains(/Home/i)
    })
  })
})
