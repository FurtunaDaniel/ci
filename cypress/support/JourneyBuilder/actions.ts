import { journeyBuilder } from 'support/JourneyBuilder.page'

class Actions {
  salesforceMenu = '[data-menu-id$="salesforce"]'
  salesforceCreateCase = '[title="Create Case"]'

  canvasPlaceholderArea = '[data-testid="placeholder--area"]'
  journeyNode = '.react-flow__node'

  get JourneyNode() {
    return cy.get(this.journeyNode)
  }

  PopulateSalesforceCreateCase() {
    cy.wait(200).get(this.salesforceMenu).click()
    cy.dragAndDrop({ subject: this.salesforceCreateCase, target: journeyBuilder.canvasPlaceholderArea })
    this.JourneyNode.last().click()
  }
}

export const actions = new Actions()
