import { journeyGoalsModal } from 'support/journeyGoalsModal'

describe('Journeys', () => {
  describe('whenever a user navigates to the journeys view via the navigation bar', () => {
    it('should redirect the user to the /journeys route and display the journey status table', () => {
      cy.intercept({
        method: 'GET',
        pathname: '/v1/core/journeys',
      }).as('fetchJourneys')

      cy.loginByCognitoApi(Cypress.env('TEST_AUTOMATION_USERNAME'), Cypress.env('TEST_AUTOMATION_PASSWORD'))

      cy.visit(`${Cypress.env('environmentUrl')}/`)

      cy.get('.second-menu-item').click()

      cy.url().should('include', '/journeys')

      cy.wait('@fetchJourneys').then((interception) => {
        assert.isNotNull(interception.response.body, 'Journeys API is responding and journeys are populated')
      })
    })

    it('should open the journey goals modal when the user clicks `new journey` button', () => {
      cy.loginByCognitoApi(Cypress.env('TEST_AUTOMATION_USERNAME'), Cypress.env('TEST_AUTOMATION_PASSWORD'))

      cy.visit(`${Cypress.env('environmentUrl')}/journeys`)

      cy.get('[data-testid~="journeys-create-button"').click()
      journeyGoalsModal.JourneyGoalBody.should('be.visible')
    })
  })
})
