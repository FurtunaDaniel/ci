class NumberInput {
  rangeNumberMin = '.range-number-input-min'
  rangeNumberMax = '.range-number-input-max'
  numericInput = '.ant-input-number-input'

  get NumericInput() {
    return cy.get(this.numericInput)
  }
}
export const numberInput = new NumberInput()
