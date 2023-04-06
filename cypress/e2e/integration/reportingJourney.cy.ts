import { reportingJourney } from 'support/Journeys/reportingJourney.page'

describe('Reporting journey page', () => {
  beforeEach(() => {
    reportingJourney.intercept()

    cy.loginByCognitoApi(Cypress.env('TEST_AUTOMATION_USERNAME'), Cypress.env('TEST_AUTOMATION_PASSWORD'))

    reportingJourney.open()

    cy.viewport(1920, 1080)
  })

  it('should display the loading skeleton for each section', () => {
    reportingJourney.loadingHeaderContainer.should('be.visible')
    reportingJourney.loadingGoalMetricsContainer.should('be.visible')
    reportingJourney.loadingMachineLearningMetricsContainer.should('be.visible')
    reportingJourney.loadingAccountListContainer.should('be.visible')
    // reset delay for following tests
    reportingJourney.delay = 0
  })

  it('should display the header with appropriate data', () => {
    cy.fixture(reportingJourney.journeyFixture).then((journey: { title: string }) => {
      cy.contains(journey.title).should('be.visible')
      cy.contains(/running/i).should('be.visible')
      cy.contains(/view journey/i).should('be.visible')
    })
  })

  it('should redirect to journey builder if "view journey" button is pressed', () => {
    cy.get('button')
      .contains(/view journey/i)
      .click()
    cy.url().should('not.include', /details/i)
  })

  it('should redirect to journeys list is x is pressed', () => {
    cy.get('button').last().click({ force: true })

    cy.url().should('match', /journeys/i)
  })

  it('should scroll to appropriate element when tab is clicked', () => {
    reportingJourney.testTabScrollPosition(1)
    // reset scroll position
    cy.scrollTo('top')
    reportingJourney.testTabScrollPosition(2) // scroll to account list
  })

  it('should trigger a new request if time frame is changed', () => {
    cy.intercept(reportingJourney.machineLearningMetricsPath).as('getMachineLearningMetricsChangedTimeFrame')
    cy.get(reportingJourney.timeFrameDropdown).click()
    cy.contains(/20 weeks/i).click()

    cy.wait('@getMachineLearningMetricsChangedTimeFrame').then((interception) => {
      expect(interception.request.url).to.contain('20')
    })
  })

  it('should filter account list table', () => {
    cy.fixture(reportingJourney.accountListFixture).then((accountList) => {
      cy.get(reportingJourney.accountListTableBody).children().should('have.length', accountList.rows.length)
      cy.get(reportingJourney.accountListTableBody)
        .children()
        .first()
        .contains(accountList.rows[0].account)
        .should('be.visible')
      cy.get(reportingJourney.accountListSearch).type(accountList.rows[accountList.rows.length - 1].account)
      cy.get(reportingJourney.accountListTableBody)
        .children()
        .first()
        .should('not.contain', accountList.rows[0].account)
      cy.get(reportingJourney.accountListTableBody)
        .children()
        .first()
        .contains(accountList.rows[accountList.rows.length - 1].account)
        .should('be.visible')
    })
  })
})
