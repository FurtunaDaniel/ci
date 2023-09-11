import PanelWithBuilder from 'pageObjects/journeys/journeyBuilder/components/configPanel/rules/common/panelWithBuilder'

class RecordCriteriaLocator extends PanelWithBuilder {
  confirmBtn = '[data-testid~="apply-btn"]'
  cancelBtn = '[data-testid~="cancel-btn"]'
  errorMessage = '[data-testid="error-message"]'
  removeBtn = '[data-testid~="remove-btn"]'
  segmentBuilderModal = '[data-testid="segment-builder"]'
  displayInlineArea = '[data-testid="display-inline__area"]'
  criteriaLabel = '[data-testid="record-locator-criteria"] > label'
  editCriteria = '[data-testid="record-locator-criteria"] [data-testid~="edit-btn"]'
  confirmRemoveBtn = '[data-testid~="confirm-btn"]'
  emptyMenu = '[data-testid="segment-builder"] [data-testid="menu__empty"]'
  criteriaContainer = '[data-testid="segment-builder__criteria"] > div'
  itemContainer = '[data-testid="group-container__item-container__item"] .ant-input'
  dynamicInputContainer = '[data-testid="group-container__item-container__item"] [data-testid="dynamic-field-input"]'

  get ConfirmBtn() {
    return cy.get(this.confirmBtn)
  }

  get CancelBtn() {
    return cy.get(this.cancelBtn)
  }

  get RemoveBtn() {
    return cy.get(this.removeBtn)
  }

  get SegmentBuilderModal() {
    return cy.get(this.segmentBuilderModal)
  }

  get DisplayInlineArea() {
    return cy.get(this.displayInlineArea)
  }

  get CriteriaLabel() {
    return cy.get(this.criteriaLabel)
  }

  get ErrorMessage() {
    return cy.get(this.errorMessage)
  }

  get EditCriteria() {
    return cy.get(this.editCriteria)
  }

  get ConfirmRemoveBtn() {
    return cy.get(this.confirmRemoveBtn)
  }

  get EmptyMenu() {
    return cy.get(this.emptyMenu)
  }

  get ItemContainer() {
    cy.get(this.criteriaContainer).then((element) => {
      if (element.find(this.itemContainer).length > 0) {
        return cy.get(this.itemContainer)
      }
    })

    return cy.get(this.dynamicInputContainer)
  }
}

export const recordCriteriaLocator = new RecordCriteriaLocator()
