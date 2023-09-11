abstract class ConfigPanel {
  readonly closeBtn = '[data-testid="panel-close"]'
  readonly saveBtn = '[data-testid*="save-panel"]'
  readonly deleteNodeBtn = '[data-testid="panel-remove"]'
  readonly panelName = '[data-testid="panel-name"]'
  readonly editDescription = '[data-testid="edit-description"]'
  readonly expandButton = '[data-testid="expand__btn"]'

  get CloseBtn() {
    return cy.get(this.closeBtn)
  }

  get SaveBtn() {
    return cy.get(this.saveBtn)
  }

  get DeleteNodeBtn() {
    return cy.get(this.deleteNodeBtn)
  }

  get PanelName() {
    return cy.get(this.panelName)
  }

  get EditDescription() {
    return cy.get(this.editDescription)
  }

  get ExpandButton() {
    return cy.get(this.expandButton)
  }
}

export default ConfigPanel
