import { recordCriteriaLocator } from '../../support/JourneyBuilder'

context('Record locator criteria for update actions', () => {
  beforeEach(() => {
    cy.viewport(1920, 1080)
    cy.loginByCognitoApi(Cypress.env('TEST_AUTOMATION_USERNAME'), Cypress.env('TEST_AUTOMATION_PASSWORD'))
  })

  describe('record locator criteria for update action', () => {
    beforeEach('open criteria locator modal and drop a field', () => {
      recordCriteriaLocator.openCriteriaLocator()
      recordCriteriaLocator.dragAndDropField(1, 0)
      recordCriteriaLocator.getCriteriaOperatorOptions.eq(1).click()
    })

    it('should close the modal without applying the criteria', () => {
      recordCriteriaLocator.getItemContainer.type('Competitor')
      recordCriteriaLocator.getCancelBtn.click()
      recordCriteriaLocator.getSegmentBuilderModal.should('not.be.visible')
      recordCriteriaLocator.getDisplayInlineArea.should('not.exist')
    })

    it('should apply the criteria locator and display the inline criteria', () => {
      recordCriteriaLocator.getItemContainer.type('Competitor')
      recordCriteriaLocator.getConfirmBtn.click()
      recordCriteriaLocator.getSegmentBuilderModal.should('not.be.visible')
      recordCriteriaLocator.getCriteriaLabel.should('contain.text', 'Record locator criteriaEdit')
      recordCriteriaLocator.getDisplayInlineArea.should('contain.text', 'Main Competitor(s)EqualsCompetitor')
    })

    it('should apply the criteria locator and display error message', () => {
      recordCriteriaLocator.getConfirmBtn.click()
      recordCriteriaLocator.getErrorMessage.should('be.visible')
      recordCriteriaLocator.getErrorMessage.should('contain.text', 'You cannot apply criteria without a value.')
    })

    it('should display an error message and remove it after after a few seconds', () => {
      recordCriteriaLocator.getConfirmBtn.click()
      recordCriteriaLocator.getErrorMessage.should('be.visible')
      recordCriteriaLocator.getErrorMessage.should('contain.text', 'You cannot apply criteria without a value.')
      cy.wait(2000)
      recordCriteriaLocator.getErrorMessage.should('not.exist')
    })

    it("should display error message when the field does't have a value, add a value in the input and apply the criteria", () => {
      recordCriteriaLocator.getConfirmBtn.click()
      recordCriteriaLocator.getErrorMessage.should('be.visible')
      recordCriteriaLocator.getItemContainer.type('MAIN')
      recordCriteriaLocator.getConfirmBtn.click()
      recordCriteriaLocator.getDisplayInlineArea.should('contain.text', 'Main Competitor(s)EqualsMAIN')
    })

    it('should apply the criteria locator and open the modal again with the same criteria', () => {
      recordCriteriaLocator.getItemContainer.type('Competitor')
      recordCriteriaLocator.getConfirmBtn.click()
      recordCriteriaLocator.getSegmentBuilderModal.should('not.be.visible')
      recordCriteriaLocator.getEditCriteria.click()
      recordCriteriaLocator.getSegmentBuilderModal.should('be.visible')
      recordCriteriaLocator.getItemTitle.should('contain.text', 'Main Competitor(s)')
    })

    it('should apply the criteria locator, open the modal again, add a new criteria and apply them', () => {
      recordCriteriaLocator.getItemContainer.type('Competitor')
      recordCriteriaLocator.getConfirmBtn.click()
      recordCriteriaLocator.getEditCriteria.click()
      recordCriteriaLocator.dragAndDropField(5, 1)
      recordCriteriaLocator.getItemContainer.eq(1).type('1')
      recordCriteriaLocator.getConfirmBtn.click()
      recordCriteriaLocator.getDisplayInlineArea.should(
        'contain.text',
        '(Main Competitor(s)EqualsCompetitor)OR(Account IDContains1)',
      )
    })

    it('should apply the criteria locator and then remove it', () => {
      recordCriteriaLocator.getItemContainer.type('Competitor')
      recordCriteriaLocator.getConfirmBtn.click()
      recordCriteriaLocator.getSegmentBuilderModal.should('not.be.visible')
      recordCriteriaLocator.getEditCriteria.click()
      recordCriteriaLocator.getRemoveBtn.first().click()
      recordCriteriaLocator.getConfirmRemoveBtn.click()
      recordCriteriaLocator.getSegmentBuilderModal.should('not.be.visible')
      recordCriteriaLocator.getDisplayInlineArea.should('not.exist')
    })
  })
})
