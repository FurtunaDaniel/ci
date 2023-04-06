describe('User log out functionality', () => {
  describe('whenever a logged in user requests to sign out from the web application', () => {
    it('should log them out and destroy their session and not allow them to visit a private route', () => {
      cy.loginByCognitoApi(Cypress.env('TEST_AUTOMATION_USERNAME'), Cypress.env('TEST_AUTOMATION_PASSWORD'))

      cy.visit(`${Cypress.env('environmentUrl')}/`)

      cy.get('.dropdown-menu').trigger('mouseover').get('#sign-out-button').click()

      cy.url().should('include', '/signin')

      cy.visit(`${Cypress.env('environmentUrl')}/journeys/journey/new`)

      cy.url().should('include', '/signin')
    })
  })
})
