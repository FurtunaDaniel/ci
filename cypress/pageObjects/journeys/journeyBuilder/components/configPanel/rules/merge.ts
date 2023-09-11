import ConfigPanel from 'pageObjects/journeys/journeyBuilder/components/configPanel/configPanel'

class Merge extends ConfigPanel {
  addBranchBtn = '[data-testid*="add-branch"]'
  mergeTargetContainer = '[data-testid="merge-container"]'
  targetBtn = '[data-testid="merge-target"]'
  clearTargetBtn = '[data-testid="remove-action"]'
  deleteTarget = '[data-testid="delete-target"]'
  addNewBranch = '[data-testid="add-branch"]'

  get MergeTarget() {
    return cy.get(this.mergeTargetContainer)
  }

  get TargetBtn() {
    return cy.get(this.targetBtn)
  }

  get ClearTarget() {
    return cy.get(this.clearTargetBtn)
  }

  get DeleteTarget() {
    return cy.get(this.deleteTarget)
  }

  get AddBranchBtn() {
    return cy.get(this.addBranchBtn)
  }

  clickOnTargetBtn(row: number = 0) {
    this.TargetBtn.eq(row).click()
  }

  clickOnRemoveAction(row: number = 0) {
    this.ClearTarget.eq(row).invoke('show').click()
  }
}

export const merge = new Merge()
