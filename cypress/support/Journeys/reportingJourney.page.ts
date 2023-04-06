class ReportingJourney {
  delay = 5000
  // paths
  quartileDistributionPath = '**/get_quartile_distribution/**'
  averageMetricPath = '**/get_average_metric_value/**'
  machineLearningMetricsPath = '**/get_machine_distribution/**'
  accountListPath = '**/accounts/*'
  // fixtures
  journeyFixture = 'reporting/journey.json'
  goalMetricsQuartileDistributionFixture = 'reporting/goalMetricsQuartileDistribution.json'
  goalMetricsAveragesFixture = 'reporting/goalMetricsAverages.json'
  machineLearningMetricsFixture = 'reporting/machineLearningMetrics.json'
  accountListFixture = 'reporting/accountList.json'
  // elements
  tabElementsSelector = '.tabs-container li'
  timeFrameDropdown = '.machine-learning-metric-heading-select'
  accountListSearch = '[data-testid="search"]'
  accountListTableBody = '.ant-table-tbody'

  // loading
  get loadingAccountListContainer() {
    return cy.get('.loading-account-list-container')
  }

  get loadingGoalMetricsContainer() {
    return cy.get('.loading-goal-metrics-container')
  }

  get loadingHeaderContainer() {
    return cy.get('.loading-header-container')
  }

  get loadingMachineLearningMetricsContainer() {
    return cy.get('.loading-machine-learning-metrics-container')
  }

  testTabScrollPosition(tabIndex: number) {
    cy.get(this.tabElementsSelector).eq(tabIndex).click()
    cy.window().its('scrollY').should('not.equal', 0)
  }

  intercept() {
    cy.fixture(this.journeyFixture).then((journey: { playbookId: string; version: string }) => {
      cy.intercept('GET', `**/journeys/${journey.playbookId}/${journey.version}`, (req) =>
        req.reply({ body: { data: journey }, delay: this.delay }),
      ).as('getJourney')
    })
    cy.intercept('GET', this.quartileDistributionPath, (req) =>
      req.reply({
        fixture: this.goalMetricsQuartileDistributionFixture,
        delay: this.delay,
      }),
    ).as('getQuartileDistribution')
    cy.intercept('GET', this.averageMetricPath, (req) =>
      req.reply({ fixture: this.goalMetricsAveragesFixture, delay: this.delay }),
    ).as('getAverages')
    cy.intercept('GET', this.machineLearningMetricsPath, (req) =>
      req.reply({ fixture: this.machineLearningMetricsFixture, delay: this.delay }),
    ).as('getMachineLearningMetrics')
    cy.intercept('GET', this.accountListPath, (req) =>
      req.reply({ fixture: this.accountListFixture, delay: this.delay }),
    ).as('getAccountList')
  }

  open() {
    cy.fixture(this.journeyFixture).then((journey: { playbookId: string; version: string }) => {
      cy.visit(`${Cypress.env('environmentUrl')}/journeys/journey/${journey.playbookId}/${journey.version}/details`)
    })
  }
}

export const reportingJourney = new ReportingJourney()
