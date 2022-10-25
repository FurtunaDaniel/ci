describe('Integrations', () => {
  describe('whenever a logged in user signs in and navigates to integrations', () => {
    it('should redirect the user to the /integrations route and display the integrations panel', () => {
      cy.loginByCognitoApi(Cypress.env('TEST_AUTOMATION_USERNAME'), Cypress.env('TEST_AUTOMATION_PASSWORD'))

      cy.visit(`${Cypress.env('environmentUrl')}/`)

      cy.get('.third-menu-item').click()

      cy.url().should('include', '/integrations')
      cy.get('.integrations-main').should('be.visible')
    })
  })
})
