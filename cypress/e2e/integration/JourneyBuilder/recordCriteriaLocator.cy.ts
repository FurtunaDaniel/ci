import { journeyBuilderInterceptors, recordCriteriaLocator } from 'support/JourneyBuilder'

context('Record locator criteria for update actions', () => {
  beforeEach(() => {
    cy.viewport(1920, 1080)
    cy.loginByCognitoApi(Cypress.env('TEST_AUTOMATION_USERNAME'), Cypress.env('TEST_AUTOMATION_PASSWORD'))
    journeyBuilderInterceptors.salesforceOpportunity()
  })

  describe('record locator criteria for update action', () => {
    beforeEach('open criteria locator modal and drop a field', () => {
      recordCriteriaLocator.openCriteriaLocator()

      cy.wait('@getSalesforceOpportunity').then(() => {
        recordCriteriaLocator.dragAndDropField('Name', 0)
        recordCriteriaLocator.CriteriaOperatorOptions.eq(1).click()
      })
    })

    it('should close the modal without applying the criteria', () => {
      recordCriteriaLocator.ItemContainer.type('Competitor')
      recordCriteriaLocator.CancelBtn.click()
      recordCriteriaLocator.SegmentBuilderModal.should('not.be.visible')
      recordCriteriaLocator.DisplayInlineArea.should('not.exist')
    })

    it('should apply the criteria locator and display the inline criteria', () => {
      recordCriteriaLocator.ItemContainer.type('Competitor')
      recordCriteriaLocator.ConfirmBtn.click()
      recordCriteriaLocator.SegmentBuilderModal.should('not.be.visible')
      recordCriteriaLocator.CriteriaLabel.should('contain.text', 'Record locator criteria Edit')
      recordCriteriaLocator.DisplayInlineArea.should('contain.text', 'NameEqualsCompetitor')
    })

    it('should apply the criteria locator and display error message', () => {
      recordCriteriaLocator.ConfirmBtn.click()
      recordCriteriaLocator.ErrorMessage.should('be.visible')
      recordCriteriaLocator.ErrorMessage.should('contain.text', 'You cannot apply criteria without a value.')
    })

    it('should display an error message and remove it after after a few seconds', () => {
      recordCriteriaLocator.ConfirmBtn.click()
      recordCriteriaLocator.ErrorMessage.should('be.visible')
      recordCriteriaLocator.ErrorMessage.should('contain.text', 'You cannot apply criteria without a value.')
      cy.wait(2000)
      recordCriteriaLocator.ErrorMessage.should('not.exist')
    })

    it("should display error message when the field does't have a value, add a value in the input and apply the criteria", () => {
      recordCriteriaLocator.ConfirmBtn.click()
      recordCriteriaLocator.ErrorMessage.should('be.visible')
      recordCriteriaLocator.ItemContainer.type('MAIN')
      recordCriteriaLocator.ConfirmBtn.click()
      recordCriteriaLocator.DisplayInlineArea.should('contain.text', 'NameEqualsMAIN')
    })

    it('should apply the criteria locator and open the modal again with the same criteria', () => {
      recordCriteriaLocator.ItemContainer.type('Competitor')
      recordCriteriaLocator.ConfirmBtn.click()
      recordCriteriaLocator.SegmentBuilderModal.should('not.be.visible')
      recordCriteriaLocator.EditCriteria.click()
      recordCriteriaLocator.SegmentBuilderModal.should('be.visible')
      recordCriteriaLocator.ItemTitle.should('contain.text', 'Name')
    })

    it('should apply the criteria locator, open the modal again, add a new criteria and apply them', () => {
      recordCriteriaLocator.ItemContainer.type('Competitor')
      recordCriteriaLocator.ConfirmBtn.click()
      recordCriteriaLocator.EditCriteria.click()
      recordCriteriaLocator.dragAndDropField('Account ID', 1)
      recordCriteriaLocator.ItemContainer.eq(1).type('1')
      recordCriteriaLocator.ConfirmBtn.click()
      recordCriteriaLocator.DisplayInlineArea.should('contain.text', '(NameEqualsCompetitor)OR(Account IDContains1)')
    })

    it('should apply the criteria locator and then remove it', () => {
      recordCriteriaLocator.ItemContainer.type('Competitor')
      recordCriteriaLocator.ConfirmBtn.click()
      recordCriteriaLocator.SegmentBuilderModal.should('not.be.visible')
      recordCriteriaLocator.EditCriteria.click()
      recordCriteriaLocator.RemoveBtn.first().click()
      recordCriteriaLocator.ConfirmRemoveBtn.click()
      recordCriteriaLocator.SegmentBuilderModal.should('not.be.visible')
      recordCriteriaLocator.DisplayInlineArea.should('not.exist')
    })
  })
})
