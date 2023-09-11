class Select {
  readonly operatorPopupContainer = '.group-container__item-container__item__select-input-range__dropdown'
  readonly selectSearchInput = '.ant-select-selection-search-input'
  readonly overflowItem = '.ant-select-selection-overflow-item'
  selector = '.ant-select-selector'
  selectItem = '.ant-select-selection-item'
  selectOption = '.ant-select-item-option'
  operatorSelect = '[data-testid="select-operator"]'

  get OperatorPopupContainer() {
    return cy.get(this.operatorPopupContainer)
  }

  get OverflwItem() {
    return cy.get(this.overflowItem)
  }

  get Select() {
    return cy.get(this.selector)
  }

  get SelectOption() {
    return cy.get(this.selectOption)
  }

  get SelectItem() {
    return cy.get(this.overflowItem)
  }

  get OperatorSelect() {
    return cy.get(this.operatorSelect)
  }
}

export const select = new Select()
