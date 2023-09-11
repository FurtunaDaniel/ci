import { journeys } from 'pageObjects/journeys/journeys.page'

describe('Journeys', () => {
  describe('whenever a user navigates to the journeys view via the navigation bar', () => {
    beforeEach(() => {
      cy.loginByCognitoApi(Cypress.env('TEST_AUTOMATION_USERNAME'), Cypress.env('TEST_AUTOMATION_PASSWORD'))
    })

    it('should redirect the user to the /journeys route and display the journey status table', () => {
      cy.intercept({
        method: 'GET',
        pathname: '/v1/core/journeys',
      }).as('fetchJourneys')

      cy.visit(`${Cypress.env('environmentUrl')}/`)

      cy.get('.second-menu-item').click()

      cy.url().should('include', '/journeys')

      cy.wait('@fetchJourneys').then((interception) => {
        assert.isNotNull(interception.response.body, 'Journeys API is responding and journeys are populated')
      })
    })

 

    it('should display the error icon when the journey is not valid', () => {
      cy.intercept('GET', '**/journeys?limit=*', (req) => {
        req.reply({
          fixture: journeys.journeyWithErros,
        })
      }).as('JourneysWithoutErrors')
      journeys.open()

      cy.wait('@JourneysWithoutErrors')
      // tooltip check
      journeys.getInvalidIcon(0).should('be.visible').trigger('mouseover')
      journeys.Tooltip.should('be.visible').contains(journeys.tooltipText)
      journeys.getInvalidIcon(0).trigger('mouseout')
      journeys.Tooltip.should('not.be.visible')
      // dropdown check
      journeys.JourneyActionsButton.eq(4).click()
      journeys.JourneyActionMenu.should('not.contain', 'Run')

      journeys.getInvalidIcon(1).should('be.visible').trigger('mouseover')
      journeys.Tooltip.should('be.visible').contains(journeys.tooltipText)
      journeys.getInvalidIcon(1).trigger('mouseout')
      // dropdown check
      journeys.JourneyActionsButton.eq(6).click({ force: true })
      journeys.JourneyActionMenu.should('not.contain', 'Run')
      // dropdown check valid draft journey
      journeys.JourneyActionsButton.eq(2).click()
      journeys.JourneyActionMenu.should('contain', 'Run')

      journeys.getInvalidIcon(2).should('not.exist')
    })
  })
})
