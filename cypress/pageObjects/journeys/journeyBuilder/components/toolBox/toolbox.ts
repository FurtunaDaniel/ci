import { actions } from 'pageObjects/journeys/journeyBuilder/components/toolBox/actions/actions'
import { rules } from 'pageObjects/journeys/journeyBuilder/components/toolBox/rules/rules'

class ToolBox {
  rules = rules
  actions = actions
  journeyHeader = '[data-testid="journey-header"]'

  get JourneyHeader() {
    return cy.get(this.journeyHeader)
  }
}

export const toolbox = new ToolBox()
