export class RecordCriteriaLocator {
  updateOpportunity = '[title="Update Opportunity"]'
  salesforceMenuActions = '[data-menu-id$="salesforce"]'
  confirmBtn = '[data-testid~="apply-btn"]'
  confirmRemoveBtn = '[data-testid~="confirm-btn"]'
  cancelBtn = '[data-testid~="cancel-btn"]'
  errorMessage = '[data-testid="error-message"]'
  removeBtn = '[data-testid~="remove-btn"]'
  journeyNode = '.react-flow__node'
  addCriteria = '[data-testid="record-locator-criteria"] [data-testid~="add-btn"]'
  editCriteria = '[data-testid="record-locator-criteria"] [data-testid~="edit-btn"]'
  criteriaLabel = '[data-testid="record-locator-criteria"] > label'
  dataSourceField = '[data-testid="menu__item"]'
  displayInlineArea = '[data-testid="display-inline__area"]'
  itemContainer = '[data-testid="group-container__item-container__item"] .ant-input'
  dynamicInputContainer = '[data-testid="group-container__item-container__item"] [data-testid="dynamic-field-input"]'
  itemTitle = '[data-testid="item-title"]'
  criteriaOperatorOptions =
    '.group-container__item-container__item__select-input-range__dropdown .ant-select-item-option'
  criteriaContainer = '[data-testid="segment-builder__criteria"] > div'
  groupContainer = '[data-testid="segment-builder__criteria"] > [data-testid="group-container"]'
  segmentBuilderModal = '[data-testid="segment-builder"]'
  canvasPlaceholderArea = '[data-testid="placeholder--area"]'

  get JourneyNode() {
    return cy.get(this.journeyNode)
  }

  get AddCriteria() {
    return cy.get(this.addCriteria)
  }

  get DataSourceField() {
    return cy.get(this.dataSourceField)
  }

  get CriteriaOperatorOptions() {
    return cy.get(this.criteriaOperatorOptions)
  }

  get CriteriaContainer() {
    return cy.get(this.criteriaContainer)
  }

  get GroupContainer() {
    return cy.get(this.groupContainer)
  }

  get ConfirmBtn() {
    return cy.get(this.confirmBtn)
  }

  get CancelBtn() {
    return cy.get(this.cancelBtn)
  }

  get RemoveBtn() {
    return cy.get(this.removeBtn)
  }

  get DisplayInlineArea() {
    return cy.get(this.displayInlineArea)
  }

  get EditCriteria() {
    return cy.get(this.editCriteria)
  }

  get SegmentBuilderModal() {
    return cy.get(this.segmentBuilderModal)
  }

  get ConfirmRemoveBtn() {
    return cy.get(this.confirmRemoveBtn)
  }

  get CriteriaLabel() {
    return cy.get(this.criteriaLabel)
  }

  get ErrorMessage() {
    return cy.get(this.errorMessage)
  }

  get ItemContainer() {
    cy.get(this.criteriaContainer).then((element) => {
      if (element.find(this.itemContainer).length > 0) {
        return cy.get(this.itemContainer)
      }
    })

    return cy.get(this.dynamicInputContainer)
  }

  get ItemTitle() {
    return cy.get(this.itemTitle)
  }

  openJourneyBuilder() {
    cy.visit(`${Cypress.env('environmentUrl')}/journeys/journey/new`)
  }

  openCriteriaLocator() {
    this.openJourneyBuilder()
    cy.wait(200).get(this.salesforceMenuActions).click()
    cy.dragAndDrop({ subject: this.updateOpportunity, target: this.canvasPlaceholderArea })
    cy.wait(100)
    this.JourneyNode.last().click()
    this.AddCriteria.first().click()
  }

  openSalesforceUpdateOpportunityRecordLocator() {
    cy.wait(200).get(this.salesforceMenuActions).click()
    cy.dragAndDrop({ subject: this.updateOpportunity, target: this.canvasPlaceholderArea })
    cy.wait(100)
    this.JourneyNode.last().click()
    this.AddCriteria.first().click()
  }

  dragAndDropField(fieldName: string, group: number) {
    this.DataSourceField.contains(fieldName).trigger('dragstart')
    this.CriteriaContainer.eq(group)
      .trigger('dragenter', { force: true })
      .trigger('dragover', { force: true })
      .trigger('drop', { force: true })

    this.GroupContainer.eq(group).trigger('dragend', { force: true })
  }
}

export const recordCriteriaLocator = new RecordCriteriaLocator()
