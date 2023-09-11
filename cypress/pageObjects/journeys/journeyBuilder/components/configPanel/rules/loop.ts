import ConfigPanel from 'pageObjects/journeys/journeyBuilder/components/configPanel/configPanel'

class Loop extends ConfigPanel {
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

  clickOnRemoveAction() {
    this.RemoveAction.invoke('show').click()
  }
}

export const loop = new Loop()
