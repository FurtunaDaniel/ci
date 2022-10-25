import { journeyBuilder } from '../JourneyBuilder.page'

class TimeDelay {
  timeDelayContainer = '[data-testid="timeDelay"]'
  iputUpIcon = '[data-testid="inputUpIcon"'
  iputDownIcon = '[data-testid="inputDownIcon"'
  days = '.group-container__item-container__item__select-input-range__dropdown [data-testid="days"]'
  playbookNode = '.react-flow__node'
  inputNumber = '[data-testid="timeDelay"] .ant-input-number-input'
  selectUnits = '[data-testid="timeDelay"] .ant-select-selector'
  selectedItem = '[data-testid="timeDelay"] .ant-select-selection-item'

  get getPlaybookNode() {
    return cy.get(this.playbookNode)
  }

  get getTimeDelayContainer() {
    return cy.get(this.timeDelayContainer)
  }

  get getInputUpIcon() {
    return cy.get(this.iputUpIcon)
  }

  get getInputNumber() {
    return cy.get(this.inputNumber)
  }

  get getInputDownIcon() {
    return cy.get(this.iputDownIcon)
  }

  get getDays() {
    return cy.get(this.days)
  }

  get getSelectUnits() {
    return cy.get(this.selectUnits)
  }

  get getSelectedItem() {
    return cy.get(this.selectedItem)
  }

  openCriteriaLocator() {
    journeyBuilder.open()
    cy.dragAndDrop(journeyBuilder.dataSourceTimeDelay, journeyBuilder.canvasPlaceholderArea)
    cy.wait(100)
    this.getPlaybookNode.last().click()
    cy.wait(100)
  }
}

export const timeDelay = new TimeDelay()
