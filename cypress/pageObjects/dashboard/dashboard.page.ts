import { journeyGoalsModal } from 'pageObjects/common/journeyGoalsModal/journeyGoalsModal'

class Dashboard {
  welcomeBannerContainer = '[data-testid="welcome-banner-container"]'
  insightsDriversHeading = '[data-testid="insights-drivers-heading"]'
  accountsContainer = '[data-testid="accounts-container"]'
  viewMoreBtn = '[data-testid*="view-more"]'

  insightsRowDetailedInsightsButton = '[data-testid="insights-row__secondary-btn"]'

  journeyGoalsModal = journeyGoalsModal

  get WelcomeBannerContainer() {
    return cy.get(this.welcomeBannerContainer)
  }

  get InsightsDriversHeading() {
    return cy.get(this.insightsDriversHeading)
  }

  get AccountsContainer() {
    return cy.get(this.accountsContainer)
  }

  get ViewMoreBtn() {
    return cy.get(this.viewMoreBtn)
  }

  getInsightButtonRank(rank: number) {
    return cy.get(`[data-testid="insights-row-${rank}"]`).find(this.insightsRowDetailedInsightsButton)
  }

  clickOnInsightButton(rank: number) {
    cy.get(`[data-testid="insights-row-${rank}"]`).trigger('mouseenter').trigger('mouseover')
    this.getInsightButtonRank(rank).click()
  }

  clickOnFirstDetailedInsightsButton() {
    return cy.get(this.insightsRowDetailedInsightsButton).first().click()
  }

  getHomepageInsightRow(rank: number) {
    return cy.get(`[data-testid="insights-row-${rank}"]`)
  }

  open() {
    cy.visit(`${Cypress.env('environmentUrl')}/`)
  }
}

export const dashboard = new Dashboard()
