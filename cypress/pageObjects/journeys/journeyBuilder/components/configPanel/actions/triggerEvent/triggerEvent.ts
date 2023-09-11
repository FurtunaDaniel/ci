import Action from 'pageObjects/journeys/journeyBuilder/components/configPanel/actions/action'

class TriggerEvent extends Action {
  actionInputs = '[data-testid="action-inputs"]'
  subtitle = '[data-testid="subtitle"]'
  editBtn = '[data-testid~="edit-btn"]'
  loadBtn = '[data-testid~="load-btn"]'
  payloadTextarea = '.ant-form-item textarea'
  errorMessage = '[data-testid="error-message"]'

  get ActionsInputs() {
    return cy.get(this.actionInputs)
  }

  get EditBtn() {
    return cy.get(this.editBtn)
  }

  get LoadBtn() {
    return cy.get(this.loadBtn)
  }

  get Subtitle() {
    return cy.get(this.subtitle)
  }

  get ErrorMessage() {
    return cy.get(this.errorMessage)
  }

  get PayloadTextarea() {
    return cy.get(this.payloadTextarea)
  }
}

export const triggerEvent = new TriggerEvent()
