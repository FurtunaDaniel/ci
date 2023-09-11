class DateRangePicker {
  rangeDatePicker = '[data-testid="criteria-input-field-datepicker-range"]'
  rangeDateToday = '.ant-picker-cell-today'
  dateFieldStartDate = '[placeholder="Start date"]'
  dateFieldEndDate = '[placeholder="End date"]'

  get RangeDatePicker() {
    return cy.get(this.rangeDatePicker)
  }

  get RangeDateToday() {
    return cy.get(this.rangeDateToday)
  }
}

export const dateRangePicker = new DateRangePicker()
