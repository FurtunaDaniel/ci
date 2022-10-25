import { journeyBuilder } from '../JourneyBuilder.page'

export class RecordCriteriaLocator {
  updateOpportunity = '[title="Update Opportunity"]'
  salesforceMenuActions = '[data-menu-id$="salesforce"]'
  confirmBtn = '[data-testid="apply-btn"]'
  confirmRemoveBtn = '[data-testid="confirm-btn"]'
  cancelBtn = '[data-testid="cancel-btn"]'
  errorMessage = '[data-testid="error-message"]'
  removeBtn = '[data-testid="btn__remove"]'
  playbookNode = '.react-flow__node'
  addCriteria = '[data-testid="record-locator-criteria"] [data-testid="add-btn"]'
  editCriteria = '[data-testid="record-locator-criteria"] [data-testid="edit-btn"]'
  criteriaLabel = '[data-testid="record-locator-criteria"] > label'
  dataSourceField = '[data-testid="menu__item"]'
  displayInlineArea = '[data-testid="display-inline__area"]'
  itemContainer = '[data-testid="group-container__item-container__item"] .ant-input'
  itemTitle = '[data-testid="item-title"]'
  criteriaOperatorOptions =
    '.group-container__item-container__item__select-input-range__dropdown .ant-select-item-option'
  criteriaContainer = '[data-testid="segment-builder__criteria"] > div'
  groupContainer = '[data-testid="segment-builder__criteria"] > [data-testid="group-container"]'
  segmentBuilderModal = '[data-testid="segment-builder"]'

  get getPlaybookNode() {
    return cy.get(this.playbookNode)
  }

  get getAddCriteria() {
    return cy.get(this.addCriteria)
  }

  get getDataSourceField() {
    return cy.get(this.dataSourceField)
  }

  get getCriteriaOperatorOptions() {
    return cy.get(this.criteriaOperatorOptions)
  }

  get getCriteriaContainer() {
    return cy.get(this.criteriaContainer)
  }

  get getGroupContainer() {
    return cy.get(this.groupContainer)
  }

  get getConfirmBtn() {
    return cy.get(this.confirmBtn)
  }

  get getCancelBtn() {
    return cy.get(this.cancelBtn)
  }

  get getRemoveBtn() {
    return cy.get(this.removeBtn)
  }

  get getDisplayInlineArea() {
    return cy.get(this.displayInlineArea)
  }

  get getEditCriteria() {
    return cy.get(this.editCriteria)
  }

  get getSegmentBuilderModal() {
    return cy.get(this.segmentBuilderModal)
  }

  get getConfirmRemoveBtn() {
    return cy.get(this.confirmRemoveBtn)
  }

  get getCriteriaLabel() {
    return cy.get(this.criteriaLabel)
  }

  get getErrorMessage() {
    return cy.get(this.errorMessage)
  }

  get getItemContainer() {
    return cy.get(this.itemContainer)
  }

  get getItemTitle() {
    return cy.get(this.itemTitle)
  }

  openCriteriaLocator() {
    journeyBuilder.open()
    cy.wait(200).get(this.salesforceMenuActions).click()
    cy.dragAndDrop(this.updateOpportunity, journeyBuilder.canvasPlaceholderArea)
    cy.wait(100)
    this.getPlaybookNode.last().click()
    this.getAddCriteria.first().click()
    cy.wait(100)
  }

  dragAndDropField(index: number, group: number) {
    this.getDataSourceField.eq(index).trigger('dragstart')
    this.getCriteriaContainer
      .eq(group)
      .trigger('dragenter', { force: true })
      .trigger('dragover', { force: true })
      .trigger('drop', { force: true })

    this.getGroupContainer.eq(group).trigger('dragend', { force: true })
  }
}

export const recordCriteriaLocator = new RecordCriteriaLocator()
