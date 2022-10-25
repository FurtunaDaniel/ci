describe('User account page', () => {
  describe('whenever a logged in user navigates to their user settings page', () => {
    it('should display their user account information', () => {
      cy.loginByCognitoApi(Cypress.env('TEST_AUTOMATION_USERNAME'), Cypress.env('TEST_AUTOMATION_PASSWORD'))

      cy.visit(`${Cypress.env('environmentUrl')}/`)

      cy.get('.dropdown-menu').trigger('mouseover').get('#account-settings-button').click()

      cy.get('.profile').should('be.visible')
    })
  })
})
