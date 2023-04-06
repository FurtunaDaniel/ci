import { accountSettings } from 'support/AccountSettings/accountSettings.page'
import { dashboard } from 'support/Dashboard/Dashboard.page'
import { insightDetails } from 'support/Dashboard/InsightsDetails.page'
import { integrations } from 'support/Integrations/integrations.page'
import { recordCriteriaLocator } from 'support/JourneyBuilder'
import { journeyBuilder } from 'support/JourneyBuilder.page'
import { journeyGoalsModal } from 'support/journeyGoalsModal'
import { journeys } from 'support/Journeys/journey.page'
import { navigationBar } from 'support/NavigationBar'

/**
 * Smoke Test #1
 *
 *    1. Log in
 *    2. Verify dashboard renders as expected, including URL, navigation bar and insights sections
 *    3. Navigate to journeys and verify journeys are loading as expected in the table
 *    4. Navigate to integrations and verify they are loading as expected, edit the first integration (SF) and ensure the metadata loads
 *    5. Navigate to account settings page, verify the profile, users and notifications all load as expected (note: users takes a while)
 *    6. Navigate back to dashboard and verify that insight details page renders as expected when clicked (URL, data load etc)
 *    7. Navigate back to dashboard and begin creating a journey, assert modal appears and fill in to create journey
 *    8. Ensure that redirect occurs to the create journey page (including URL), verify that actions load in successfully
 *    9. Begin creating the journey, add segment criteria ensuring that metadata loads as expected
 *    10. Drag action on and fill out criteria
 *    11. Save journey, verify redirect back to journeys page occurs and new journey is present on the table in draft state
 *    12. Execute the journey as a one-time run
 *    13. Verify that the journey is now marked as running
 *    14. Log out
 */
describe('Smoke Test Suite', () => {
  before(() => {
    cy.intercept('**/insights').as('insights')
    cy.intercept('**/integrations').as('integrations')
    cy.intercept('**/integrations/*').as('singleIntegration')
    cy.intercept('**/users/*').as('userProfile')
    cy.intercept('**/users').as('listUsers')
    cy.intercept('**/insights/accounts/target/**').as('churnInsight')
    cy.intercept('**/metadata/platforms/salesforce/objects/Opportunity/**').as('getSalesforceOpportunity')
    cy.intercept('**/playbooks').as('saveJourney')

    // Step 1
    cy.loginByCognitoApi(Cypress.env('TEST_AUTOMATION_USERNAME'), Cypress.env('TEST_AUTOMATION_PASSWORD'))
    cy.viewport(1920, 1080)
  })

  it('should perform general user sanity checks', () => {
    dashboard.open()

    // Step 2
    cy.url().should('include', '/dashboard')
    cy.get('.side-main-menu').contains(/Dashboard/i)
    cy.get('.side-main-menu').contains(/Journeys/i)
    cy.get('.side-main-menu').contains(/Integrations/i)

    cy.wait('@insights', { responseTimeout: 5000 })

    dashboard.WelcomeBannerContainer.should('be.visible')
    dashboard.InsightsDriversHeading.should('be.visible')

    // Step 3
    navigationBar.getJourneys.click()

    cy.url().should('include', '/journeys')
    journeys.JourneysTableRows.should('be.visible')

    // Step 4
    navigationBar.getIntegrations.click()

    cy.wait('@integrations', { responseTimeout: 5000 })

    cy.url().should('include', '/integrations')
    integrations.IntegrationCards.should('be.visible')

    integrations.FirstIntegrationCardEditButton.click()

    cy.wait('@singleIntegration', { responseTimeout: 5000 })
    integrations.IntegrationCards.should('be.visible')

    // Step 5
    navigationBar.AccountSettings.click()

    cy.wait('@userProfile', { responseTimeout: 5000 })

    cy.url().should('include', '/account-settings/profile')
    accountSettings.AccountSettingsProfileHeading.should('be.visible')

    accountSettings.AccountSettingsNavigation.click()

    cy.wait('@listUsers', { responseTimeout: 5000 })

    accountSettings.AccountSettingsUsersTable.should('be.visible')

    // Step 6
    navigationBar.Dashboard.click()
    dashboard.clickOnInsightButton(1)

    cy.wait('@churnInsight', { responseTimeout: 5000 })

    cy.url().should('include', 'insights/churn/0')
    insightDetails.getSegmentTable.should('be.visible')

    // Step 7
    navigationBar.getJourneys.click()

    journeys.CreateJourneyButton.click()
    journeyGoalsModal.JourneyNameInput.clear().type('Smoke Test #1 - Automation')
    journeyGoalsModal.ContinueBtn.click()

    // Step 8
    cy.url().should('include', 'journeys/journey/new')

    // Step 9
    journeyBuilder.SegmentNode.click()
    journeyBuilder.buildSalesforceSegmentCriteria()

    // Step 10
    recordCriteriaLocator.openSalesforceUpdateOpportunityRecordLocator()

    cy.wait('@getSalesforceOpportunity', { responseTimeout: 5000 })

    recordCriteriaLocator.dragAndDropField('Name', 0)
    recordCriteriaLocator.CriteriaOperatorOptions.eq(1).click()
    recordCriteriaLocator.ItemContainer.type('Competitor')
    recordCriteriaLocator.ConfirmBtn.click()

    journeyBuilder.SavePanel.click()

    // Step 11
    journeyBuilder.SaveJourneyButton.click()

    cy.wait('@saveJourney', { responseTimeout: 15000 })

    navigationBar.getJourneys.click()
    cy.url().should('include', 'journeys')

    // Step 12
    journeys.JourneyActionsButton.first().click()
    journeys.JourneyActionsRunButton.click()
    journeys.ExecuteJourneyModalConfirmButton.click()

    // Step 13
    journeys.JourneysTableRows.first().get('td').eq(1).should('contain.text', 'Running')

    // Step 14
    navigationBar.Logout.click()
  })
})
