class JourneyGoalsModal {
  /* Interaction buttons */
  createJoruneyBtn = '[data-testid~="welcome-banner-button-cta"]'
  closeBtn = '[data-testid="modal-close"]'
  cancelBtn = '[data-testid~="cancel-btn"]'
  continueBtn = '[data-testid~="continue-btn"'

  /* Content */
  journeyGoalBody = '[data-testid="modal__journey-goals--body"]'

  /* Input fields */
  journeyNameInput = '[data-testid="journey-name"] input'
  journeyNameError = '[data-testid="error-message"]'
  journeyDescriptionInput = '[data-testid="journey-description"] input'

  /* Goal */
  goalContainer = '[data-testid="track-goal"] [data-testid="goal-container"]'
  trackGoalTarget = '[data-testid="track-goal__target"] input'
  trackGoalTargetUpArrow = '[data-testid="track-goal__target"] .ant-input-number-handler-up'
  trackGoalTargetDownArrow = '[data-testid="track-goal__target"] .ant-input-number-handler-down'
  activeGoal = 'goal-container--active'

  /* Metrics */
  metricsContainer = '[data-testid="track-metrics"]'
  metricsTable = '[data-testid="track-metrics__table"]'
  metricTableRow = '[data-testid="track-metrics__table--row"]'
  aggregation = '[data-testid="aggregation"] > div'
  timespan = '[data-testid="timespan"]'
  operator = '[data-testid="operator"]'
  target = '[data-testid="target"]'
  deleteMetricBtn = '[data-testid~="delete-metric"]'
  addMetricBtn = '[data-testid~="add-metric"]'
  metricDataFieldContainer = '[data-testid="data-field__container"]'
  dataFieldPopover = '.data-field__popover'
  menuItem = '[data-testid="menu__item"]'
  selectedDataField = '[data-testid="selected-data-field"]'
  metricDataFieldPlatform = '[data-testid="data-field__container"] [alt="salesforce"]'

  get CreateJoruneyBtn() {
    return cy.get(this.createJoruneyBtn)
  }

  get CloseBtn() {
    return cy.get(this.closeBtn)
  }

  get CancelBtn() {
    return cy.get(this.cancelBtn)
  }

  get ContinueBtn() {
    return cy.get(this.continueBtn)
  }

  get JourneyGoalBody() {
    return cy.get(this.journeyGoalBody)
  }

  get JourneyNameInput() {
    return cy.get(this.journeyNameInput)
  }

  get JourneyNameError() {
    return cy.get(this.journeyNameError)
  }

  get JourneyDescriptionInput() {
    return cy.get(this.journeyDescriptionInput)
  }

  get TrackGoalTarget() {
    return cy.get(this.trackGoalTarget)
  }

  get TrackGoalTargetUpArrow() {
    return cy.get(this.trackGoalTargetUpArrow)
  }

  get TrackGoalTargetDownArrow() {
    return cy.get(this.trackGoalTargetDownArrow)
  }

  get MetricsContainer() {
    return cy.get(this.metricsContainer)
  }

  get MetricsTable() {
    return cy.get(this.metricsTable)
  }

  get MetricTableRow() {
    return cy.get(this.metricTableRow)
  }

  get Aggregation() {
    return cy.get(this.aggregation)
  }

  get Timespan() {
    return cy.get(this.timespan)
  }

  get Operator() {
    return cy.get(this.operator)
  }

  get Target() {
    return cy.get(this.target)
  }

  get DeleteMetricBtn() {
    return cy.get(this.deleteMetricBtn)
  }

  get AddMetricBtn() {
    return cy.get(this.addMetricBtn)
  }

  get DataFieldPopover() {
    return cy.get(this.dataFieldPopover)
  }

  get SelectedDataField() {
    return cy.get(this.selectedDataField)
  }

  get MetricDataFieldPlatform() {
    return cy.get(this.metricDataFieldPlatform)
  }

  getMetricDataFieldContainer(index: number) {
    return cy.get(this.metricDataFieldContainer).eq(index)
  }

  getMenuItem(name: string) {
    return cy.get(this.menuItem).contains(name, { matchCase: false })
  }

  getField(index: number) {
    return cy.get(this.menuItem).eq(index)
  }

  getGoalContainer(index: number) {
    return cy.get(this.goalContainer).eq(index)
  }

  open() {
    cy.visit(`${Cypress.env('environmentUrl')}/dashboard`)
    this.CreateJoruneyBtn.click()
  }
}

export const journeyGoalsModal = new JourneyGoalsModal()
