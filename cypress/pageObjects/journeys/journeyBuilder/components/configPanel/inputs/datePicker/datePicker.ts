class DatePicker {
  datepicker = '[data-testid="criteria-input-field-datepicker"]'
  datePickerPanel = '.ant-picker-panel'
  dateFieldSelectDate = '[placeholder="Select date"]'

  get Datepicker() {
    return cy.get(this.datepicker)
  }

  get DatePickerPanel() {
    return cy.get(this.datePickerPanel)
  }
}

export const datePicker = new DatePicker()
