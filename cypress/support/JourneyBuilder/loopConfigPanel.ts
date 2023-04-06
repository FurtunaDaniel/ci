import { ConfigPanel } from 'support/JourneyBuilder/configPanel'

class LoopPanel extends ConfigPanel {
  containerLoopToAction = '[data-testid="loop-to-action-container"]'
  loopToAction = '[data-testid="loop-to-action"]'
  removeActionBtn = '[data-testid="remove-action"]'

  get LoopToActionContainer() {
    return cy.get(this.containerLoopToAction)
  }

  get LoopToAction() {
    return cy.get(this.loopToAction)
  }

  get RemoveAction() {
    return cy.get(this.removeActionBtn)
  }

  clickOnLoopToAction() {
    this.LoopToAction.click()
  }

  clickOnRemoveAction() {
    this.RemoveAction.invoke('show').click()
  }
}

export const loopPanel = new LoopPanel()
