import { accountSettings } from 'pageObjects/accountSettings/accountSettings.page'
import { navigationBar } from 'pageObjects/common/navigationBar/navigationBar'
import { dashboard } from 'pageObjects/dashboard/dashboard.page'
import { integrations } from 'pageObjects/integrations/integrations.page'
import { journeyBuilder } from 'pageObjects/journeys/journeyBuilder/journeyBuilder.page'
import { journeys } from 'pageObjects/journeys/journeys.page'

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
 *    9. Begin creating the journey, add segment criteria ensuring that metadata loads as expected and add fields for each data type and operator
 *    10. Drag action on and fill out criteria
 *    11. Save journey, verify redirect back to journeys page occurs and new journey is present on the table in draft state
 *    12. Check the fields added in step 9 and execute the journey as a one-time run
 *    13. Delete the journey
 *    14. Log out
 */

const AUTOMATIN_JOURNEY_NAME = 'Smoke Test #1 - Automation'

describe('Smoke Test Suite', () => {
  beforeEach(() => {
    cy.intercept('**/insights').as('insights')
    cy.intercept('**/integrations').as('integrations')
    cy.intercept('**/integrations/*').as('singleIntegration')
    cy.intercept('**/users/*').as('userProfile')
    cy.intercept('**/users').as('listUsers')
    cy.intercept('**/insights/accounts/target/**').as('churnInsight')
    cy.intercept('**/metadata/platforms/salesforce/objects/Opportunity/**').as('getSalesforceOpportunity')
    cy.intercept('**/journeys').as('saveJourney')
    cy.intercept('**/journeys/**/**').as('getJourney')

    // Step 1
    cy.loginByCognitoApi(Cypress.env('TEST_AUTOMATION_USERNAME'), Cypress.env('TEST_AUTOMATION_PASSWORD'))
  })

  it('should perform general user sanity checks', () => {
    dashboard.open()

    // Step 2
    cy.url().should('include', '/dashboard')
    cy.get('.side-main-menu').contains(/Dashboard/i)
    cy.get('.side-main-menu').contains(/Journeys/i)
    cy.get('.side-main-menu').contains(/Integrations/i)

    cy.wait('@insights', { responseTimeout: 15000 })

    dashboard.WelcomeBannerContainer.should('be.visible')
    dashboard.InsightsDriversHeading.should('be.visible')

    // Step 3
    navigationBar.getJourneys.click()

    cy.url().should('include', '/journeys')
    journeys.JourneysTableRows.should('be.visible')

    // Step 4
    navigationBar.getIntegrations.click()

    cy.wait('@integrations', { responseTimeout: 15000 })

    cy.url().should('include', '/integrations')
    integrations.IntegrationCards.should('be.visible')

    integrations.FirstIntegrationCardEditButton.click()

    cy.wait('@singleIntegration', { responseTimeout: 15000 })
    integrations.IntegrationCards.should('be.visible')

    // Step 5
    navigationBar.AccountSettings.click()

    cy.wait('@userProfile', { responseTimeout: 15000 })

    cy.url().should('include', '/account-settings/profile')
    accountSettings.AccountSettingsProfileHeading.should('be.visible')

    accountSettings.AccountSettingsNavigation.click()

    cy.wait('@listUsers', { responseTimeout: 15000 })

    accountSettings.AccountSettingsUsersTable.should('be.visible')

    // Step 6
    navigationBar.Dashboard.click()
    dashboard.clickOnInsightButton(1)

    cy.wait('@churnInsight', { responseTimeout: 15000 })

    cy.url().should('include', 'insights/churn/0')

    // Step 7
    navigationBar.getJourneys.click()

    journeys.CreateJourneyButton.click()
    journeys.journeyGoalsModal.JourneyNameInput.clear().type(AUTOMATIN_JOURNEY_NAME)
    journeys.journeyGoalsModal.ContinueBtn.click()

    // Step 8
    cy.url().should('include', 'journeys/journey/new')

    // Step 9
    journeyBuilder.canvas.JourneyGoalPopoverBtn.should('be.visible')
    journeyBuilder.canvas.JourneyGoalPopoverBtn.click()

    journeyBuilder.canvas.SegmentNode.click()
    journeyBuilder.buildSalesforceSegmentCriteria()

    // Step 10
    journeyBuilder.toolbox.actions.getMenuAction('salesforce').click()
    journeyBuilder.dropActionNode('Update Opportunity')
    journeyBuilder.canvas.JourneyNode.filter((_index: number, elt: any) => {
      return elt.innerText.match(/^Update Opportunity$/)
    })
      .eq(0)
      .click()
    journeyBuilder.updateOpportunity.AddCriteria.first().click()
    journeyBuilder.updateOpportunity.recordCriteriaLocator.dragAndDropField('Name', 0)
    journeyBuilder.updateOpportunity.recordCriteriaLocator.queryBuilder.select.OperatorPopupContainer.contains(
      'Contains',
    ).click()
    journeyBuilder.updateOpportunity.recordCriteriaLocator.ItemContainer.type('Competitor')
    journeyBuilder.updateOpportunity.recordCriteriaLocator.ConfirmBtn.click()
    journeyBuilder.updateOpportunity.numberInput.NumericInput.first().type('1')

    // Fill in required fields
    journeyBuilder.updateOpportunity.FormField.first().type('Name')
    journeyBuilder.updateOpportunity.datePicker.Datepicker.first().click()
    journeyBuilder.updateOpportunity.datePicker.DatePickerPanel.first().contains('Today').click()
    journeyBuilder.updateOpportunity.select.Select.first().click()
    journeyBuilder.updateOpportunity.select.SelectOption.contains('Prospecting').click({ force: true })

    cy.get('[title="checkbox_fieldname"]').scrollIntoView()
    journeyBuilder.updateOpportunity.select.Select.eq(6).click()
    journeyBuilder.updateOpportunity.select.SelectOption.contains('True').click({ force: true })

    journeyBuilder.updateOpportunity.SaveBtn.click()

    // Step 11
    journeyBuilder.topSection.SaveJourneyButton.click()

    cy.wait('@saveJourney', { responseTimeout: 15000 })

    navigationBar.getJourneys.click()
    cy.url().should('include', 'journeys')

    // Step 12
    journeys.JourneysTableRows.contains(AUTOMATIN_JOURNEY_NAME).first().click()
    cy.wait('@getJourney', { responseTimeout: 15000 })

    journeyBuilder.canvas.SegmentNode.click()
    journeyBuilder.segment.ExpandButton.click({ force: true })
    cy.wait(1000)
    journeyBuilder.checkSalesforceSegmentCriteria()

    journeyBuilder.topSection.CloseJourneyBtn.click()

    cy.url().should('include', 'journeys')

    // Step 13
    journeys.deleteJourney(AUTOMATIN_JOURNEY_NAME)

    // Step 14
    navigationBar.Logout.click()
  })
})
