import { timeDelay } from 'support/JourneyBuilder/index'
import { journeyBuilder } from 'support/JourneyBuilder.page'

class TriggerEvent {
  action = '[title="Trigger Event"]'
  gainsightMenuActions = '[data-menu-id$="gainsight"]'
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

  openConfigPanel() {
    journeyBuilder.open()
    cy.get(this.gainsightMenuActions, { timeout: 2000 }).click()
    cy.dragAndDrop({ subject: this.action, target: journeyBuilder.canvasPlaceholderArea })
    timeDelay.JourneyNode.last().click()
  }
}

export const triggerEvent = new TriggerEvent()
