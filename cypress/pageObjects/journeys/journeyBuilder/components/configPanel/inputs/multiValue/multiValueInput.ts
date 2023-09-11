import { select } from 'pageObjects/journeys/journeyBuilder/components/configPanel/inputs/select/select'

class MultiValueInput {
  selectItemOption = select.selectOption
  multiValue = '[data-testid="multi-value"]'
  tag = `${this.multiValue} .ant-select-selection-item-content`
  removeTag = '.ant-select-selection-item-remove'
  multiValuePopup = `.multi-value-popup ${this.selectItemOption}`

  get MultiValue() {
    return cy.get(this.multiValue)
  }

  get Tag() {
    return cy.get(this.tag)
  }

  get RemoveTag() {
    return cy.get(this.removeTag)
  }

  get MultiValuePopup() {
    return cy.get(this.multiValuePopup)
  }
}

export const multiValueInput = new MultiValueInput()
