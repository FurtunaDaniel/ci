import { dashboard } from 'support/Dashboard/Dashboard.page'

describe('Dashboard page', () => {
  beforeEach(() => {
    cy.loginByCognitoApi(Cypress.env('TEST_AUTOMATION_USERNAME'), Cypress.env('TEST_AUTOMATION_PASSWORD'))
    dashboard.open()
    cy.viewport(1920, 1080)
  })

  describe('whenever a logged in user signs in', () => {
    it('should display the Dashboard and its various sections', () => {
      dashboard.WelcomeBannerContainer.should('be.visible')
      dashboard.InsightsDriversHeading.should('be.visible')
      dashboard.AccountsContainer.should('be.visible')
      dashboard.clickOnInsightButton(2)
    })
  })

  describe('Insight details navigation', () => {
    it('should navigate to the first insight and open the insight details page using the insights button', () => {
      dashboard.clickOnInsightButton(1)
      cy.url().should('include', 'insights/churn/0')
    })

    it('should navigate to the second insight and open the insight details page using the insights button', () => {
      dashboard.clickOnInsightButton(2)
      cy.url().should('include', 'insights/churn/1')
    })

    it('should navigate to the third insight and open the insight details page clicking on the row', () => {
      dashboard.clickOnInsightRow(3)
      cy.url().should('include', 'insights/churn/2')
    })
  })

  describe('Insights states', () => {
    it('should be able to expand the dashboard insights is the button is visible', () => {
      if (dashboard.ViewMoreBtn) {
        dashboard.getInsightRow(4).should('not.exist')
        dashboard.ViewMoreBtn.click()
        dashboard.getInsightRow(4).should('be.visible')
        dashboard.ViewMoreBtn.click()
        dashboard.getInsightRow(4).should('not.exist')
      }
    })
  })
})
