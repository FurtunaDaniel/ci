import { numberInput } from 'pageObjects/journeys/journeyBuilder/components/configPanel/inputs/number/numberInput'
import { select } from 'pageObjects/journeys/journeyBuilder/components/configPanel/inputs/select/select'

class TimeDelay {
  timeDelayContainer = '[data-testid="timeDelay"]'
  iputUpIcon = '[data-testid="inputUpIcon"'
  iputDownIcon = '[data-testid="inputDownIcon"'
  inputNumber = `${this.timeDelayContainer} ${numberInput.numericInput}`
  selectUnits = `${this.timeDelayContainer} ${select.selector}`
  selectedItem = `${this.timeDelayContainer} ${select.selectItem}`
  days = `${select.operatorPopupContainer} [data-testid="days"]`

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

  get SelectUnits() {
    return cy.get(this.selectUnits)
  }

  get SelectedItem() {
    return cy.get(this.selectedItem)
  }

  get Days() {
    return cy.get(this.days)
  }
}

export const timeDelay = new TimeDelay()
