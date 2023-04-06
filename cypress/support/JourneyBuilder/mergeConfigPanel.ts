import { ConfigPanel } from 'support/JourneyBuilder/configPanel'
import { journeyBuilder } from 'support/JourneyBuilder.page'

class MergePanel extends ConfigPanel {
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

  get AddNewBranch() {
    return cy.get(this.addNewBranch)
  }

  clickOnTargetBtn(row: number = 0) {
    this.TargetBtn.eq(row).click()
  }

  dropMinumumRequiredForMerge() {
    cy.dragAndDrop({
      subject: journeyBuilder.dataSourceIfElse,
      target: journeyBuilder.canvasPlaceholderArea,
      object: journeyBuilder.mockIfElseData,
    })

    cy.dragAndDrop({
      subject: journeyBuilder.dataSourceTimeDelay,
      target: journeyBuilder.canvasPlaceholderArea,
      object: journeyBuilder.mockTimeDelayData,
      targetPosition: 2,
    })

    cy.dragAndDrop({
      subject: journeyBuilder.dataSourceMerge,
      target: journeyBuilder.canvasPlaceholderArea,
      object: journeyBuilder.mockMergeData,
      targetPosition: 1,
    })
  }

  clickOnRemoveAction(row: number = 0) {
    this.ClearTarget.eq(row).invoke('show').click()
  }
}
export const mergePanel = new MergePanel()
