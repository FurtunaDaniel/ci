describe('Home page', () => {
  describe('whenever a logged in user signs in', () => {
    it('should display the homepage and its various sections', () => {
      cy.loginByCognitoApi(Cypress.env('TEST_AUTOMATION_USERNAME'), Cypress.env('TEST_AUTOMATION_PASSWORD'))

      cy.visit(`${Cypress.env('environmentUrl')}/`)

      cy.get('.welcome-banner-container').should('be.visible')
      cy.get('.account-statistics-container').should('be.visible')
      cy.get('.insights-drivers-heading').should('be.visible')
      cy.get('.accounts-container').should('be.visible')
    })
  })
})
