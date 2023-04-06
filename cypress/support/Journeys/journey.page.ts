class Journeys {
  journeysTableRows = 'tbody > tr'
  journeysCreateJourneyButton = '[data-testid="button-primary journeys-create-button"]'
  journeyActionsButton = '[data-testid="journey-actions-button"]'
  journeyActionsRunButton = 'li:contains(Run)'
  journeyExecutionModalConfirmButton = 'button:contains(Confirm)'

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
}

export const journeys = new Journeys()
