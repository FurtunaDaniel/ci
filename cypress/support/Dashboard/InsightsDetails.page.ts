class InsightsDetails {
  heading = '[data-testid="heading"]'
  driverList = '[data-testid="driver-list"]'
  segmentTable = '[data-testid="segment-table"]'
  segmentAccountTable = '[data-testid="segment-account-table"]'
  checkbox = '[data-testid="checkbox"]'
  search = '[data-testid="search"]'
  selectAllCheckbox = '.ant-table-selection > .ant-checkbox-wrapper'
  segmentAccountSection = '[data-testid="segment-accounts"]'
  segmentAccountCheckbox = '.ant-checkbox'

  get getHeading() {
    return cy.get(this.heading)
  }

  get getDriverList() {
    return cy.get(this.driverList)
  }

  get getSegmentTable() {
    return cy.get(this.segmentTable)
  }

  get getSegmentAccountTable() {
    return cy.get(this.segmentAccountTable)
  }

  get getSegmentAccount() {
    return cy.get(this.segmentAccountSection)
  }

  // segment table
  getSegmentTableRow(row: number) {
    return cy.get(`${this.segmentTable} tbody`).find('tr').eq(row)
  }

  getSegmentTableCheckboxRow(row: number) {
    return this.getSegmentTableRow(row).find(this.checkbox)
  }

  clickOnSegmenRow(row: number) {
    this.getSegmentTableRow(row).click()
    return new InsightsDetails()
  }

  withSegmentRow(row: number, fct: ($element: JQuery<HTMLElement>) => void) {
    this.getSegmentTableRow(row).then(fct)
    return this
  }

  // segment Account table
  getSegmentAccountTableRow(row: number) {
    return cy.get(`${this.segmentAccountTable} tbody`).find('tr').eq(row)
  }

  getSegmentAccountTableCheckboxRow(row: number) {
    this.getSegmentAccountTableRow(row).find(`${this.checkbox}`)
    return this.getSegmentAccountTableRow(row).find(this.checkbox)
  }

  clickOnSegmenAccountRow(row: number) {
    this.getSegmentAccountTableRow(row).click()
    return new InsightsDetails()
  }

  withSegmentAccountRow(row: number, fct: ($element: JQuery<HTMLElement>) => void) {
    this.getSegmentAccountTableRow(row).then(fct)
    return this
  }

  openInsight(target: string, rank: number) {
    cy.visit(`${Cypress.env('environmentUrl')}/insights/${target}/${rank}`)
  }
}

export const insightDetails = new InsightsDetails()
