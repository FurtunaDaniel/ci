import { journeyBuilder } from 'support/JourneyBuilder.page'

class TimeDelay {
  timeDelayContainer = '[data-testid="timeDelay"]'
  iputUpIcon = '[data-testid="inputUpIcon"'
  iputDownIcon = '[data-testid="inputDownIcon"'
  days = '.group-container__item-container__item__select-input-range__dropdown [data-testid="days"]'
  journeyNode = '.react-flow__node'
  inputNumber = '[data-testid="timeDelay"] .ant-input-number-input'
  selectUnits = '[data-testid="timeDelay"] .ant-select-selector'
  selectedItem = '[data-testid="timeDelay"] .ant-select-selection-item'

  get JourneyNode() {
    return cy.get(this.journeyNode, { timeout: 2000 })
  }

  get TimeDelayContainer() {
    return cy.get(this.timeDelayContainer)
  }

  get InputUpIcon() {
    return cy.get(this.iputUpIcon)
  }

  get InputNumber() {
    return cy.get(this.inputNumber)
  }

  get InputDownIcon() {
    return cy.get(this.iputDownIcon)
  }

  get Days() {
    return cy.get(this.days)
  }

  get SelectUnits() {
    return cy.get(this.selectUnits)
  }

  get SelectedItem() {
    return cy.get(this.selectedItem)
  }

  openCriteriaLocator() {
    journeyBuilder.open()
    cy.dragAndDrop({ subject: journeyBuilder.dataSourceTimeDelay, target: journeyBuilder.canvasPlaceholderArea })
    this.JourneyNode.last().click()
  }
}

export const timeDelay = new TimeDelay()
