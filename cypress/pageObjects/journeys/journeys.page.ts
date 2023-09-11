import { journeyGoalsModal } from 'pageObjects/common/journeyGoalsModal/journeyGoalsModal'

class Journeys {
  journeysTableRows = 'tbody > tr'
  journeysCreateJourneyButton = '[data-testid="button-primary journeys-create-button"]'
  journeyActionsButton = '[data-testid="journey-actions-button"]'
  journeyActionMenu = '[data-testid="journey-actions-menu"]'
  journeyActionsRunButton = 'li:contains(Run)'
  journeyExecutionModalConfirmButton = 'button:contains(Confirm)'
  invalidIcon = '[data-testid="is-invalid-icon"]'
  tooltip = '.ant-tooltip'
  tooltipText = 'This journey has errors with the configuration. It can not be scheduled to run.'

  journeyGoalsModal = journeyGoalsModal

  // fixture route
  journeyWithErros = 'Journeys/journeysListWithErrors.json'

  get JourneysTableRows() {
    return cy.get(this.journeysTableRows)
  }

  get CreateJourneyButton() {
    return cy.get(this.journeysCreateJourneyButton)
  }

  get JourneyActionsButton() {
    return cy.get(this.journeyActionsButton)
  }

  get JourneyActionsRunButton() {
    return cy.get(this.journeyActionsRunButton).first()
  }

  get ExecuteJourneyModalConfirmButton() {
    return cy.get(this.journeyExecutionModalConfirmButton).first()
  }

  get Tooltip() {
    return cy.get(this.tooltip)
  }

  get JourneyActionMenu() {
    return cy.get(this.journeyActionMenu)
  }

  getInvalidIcon(position = 0) {
    return cy.get(this.invalidIcon).eq(position)
  }

  open() {
    cy.visit(`${Cypress.env('environmentUrl')}/journeys/`)
  }

  deleteJourney(journeyName) {
    this.JourneysTableRows.contains(journeyName)
      .parentsUntil('.ant-table-row')
      .parent()
      .find(journeys.journeyActionsButton)
      .click()
    cy.get('li').contains('Delete Journey').click()
  }
}

export const journeys = new Journeys()
