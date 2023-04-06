export class ConfigPanel {
  closeBtn = '[data-testid="panel-close"]'
  saveBtn = '[data-testid*="save-panel"]'
  deleteNodeBtn = '[data-testid="panel-remove"]'

  get CloseConfig() {
    return cy.get(this.closeBtn)
  }

  get SaveConfig() {
    return cy.get(this.saveBtn)
  }

  get DeleteNodeBtn() {
    return cy.get(this.deleteNodeBtn)
  }

  clickOnClose() {
    this.CloseConfig.click()
  }

  clickOnSave() {
    this.SaveConfig.click()
  }

  clickOnDeleteBtn() {
    this.DeleteNodeBtn.click()
  }
}
