import Action from 'pageObjects/journeys/journeyBuilder/components/configPanel/actions/action'
import { recordCriteriaLocator } from 'pageObjects/journeys/journeyBuilder/components/configPanel/actions/updateOpportunity/recordCriteriaLocator/recordCriteriaLocator'
import { datePicker } from 'pageObjects/journeys/journeyBuilder/components/configPanel/inputs/datePicker/datePicker'
import { select } from 'pageObjects/journeys/journeyBuilder/components/configPanel/inputs/select/select'

class UpdateOpportunity extends Action {
  recordCriteriaLocator = recordCriteriaLocator
  datePicker = datePicker
  select = select

  addCriteria = '[data-testid="record-locator-criteria"] [data-testid~="add-btn"]'

  get AddCriteria() {
    return cy.get(this.addCriteria)
  }

  get FormField() {
    return cy.get('[data-testid="dynamic-field-input"]')
  }
}

export const updateOpportunity = new UpdateOpportunity()
