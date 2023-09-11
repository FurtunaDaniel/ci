class InsightDetails {
  heading = '[data-testid="insight-details-banner-heading"]'
  driverDetail = '[data-testid="insight-details-banner-driver-detail"]'

  riskTabContainer = '[data-testid="insights-details-risk-segment-container"]'
  riskTabSelected = '[data-testid="insight-risk-tab-container-selected"]'
  riskTabUnselected = '[data-testid="insight-risk-tab-container"]'

  emptyRiskSegmentPlaceholder = '[data-testid="insight-details-metric-ranges-placeholder"]'
  histogramSection = '[data-testid="insights-details-histograph-container"]'

  segmentAccountsTable = '[data-testid="segment-accounts"]'

  footer = '[data-testid="insights-footer"]'

  get getHeading() {
    return cy.get(this.heading)
  }

  get getDriverDetail() {
    return cy.get(this.driverDetail)
  }

  get getRiskTabContainer() {
    return cy.get(this.riskTabContainer)
  }

  get getRiskTabSelected() {
    return cy.get(this.riskTabSelected)
  }

  get getRiskTabUnselected() {
    return cy.get(this.riskTabUnselected)
  }

  get getEmptyRiskSegmentPlaceholder() {
    return cy.get(this.emptyRiskSegmentPlaceholder)
  }

  get getHistogramSection() {
    return cy.get(this.histogramSection)
  }

  get getSegmentAccountsTable() {
    return cy.get(this.segmentAccountsTable)
  }

  get getInsightFooter() {
    return cy.get(this.footer)
  }

  open(driver: string = 'churn', rank: number = 0) {
    return cy.visit(`${Cypress.env('environmentUrl')}/insights/${driver}/${rank}`)
  }
}

export const insightDetails = new InsightDetails()
