describe('Journeys', () => {
  describe('whenever a user navigates to the journeys view via the navigation bar', () => {
    it('should redirect the user to the /journeys route and display the journey status table', () => {
      cy.intercept({
        method: 'GET',
        url: '*/playbooks',
      }).as('fetchPlaybooks')

      cy.loginByCognitoApi(Cypress.env('TEST_AUTOMATION_USERNAME'), Cypress.env('TEST_AUTOMATION_PASSWORD'))

      cy.visit(`${Cypress.env('environmentUrl')}/`)

      cy.get('.second-menu-item').click()

      cy.url().should('include', '/journeys')

      cy.wait('@fetchPlaybooks').then((interception) => {
        assert.isNotNull(interception.response.body, 'Playbooks API is responding and journeys are populated')
      })
    })

    it('should navigate to the journey builder view when the user clicks `new journey` button', () => {
      cy.loginByCognitoApi(Cypress.env('TEST_AUTOMATION_USERNAME'), Cypress.env('TEST_AUTOMATION_PASSWORD'))

      cy.visit(`${Cypress.env('environmentUrl')}/journeys`)

      cy.get('.automation-journeys-create-button').click()
      cy.url().should('include', '/journeys/playbook/new')
    })
  })
})
