import { timeDelay } from '../../support/JourneyBuilder'

context('Time delay configuration modal', () => {
  beforeEach(() => {
    cy.viewport(1920, 1080)
    cy.loginByCognitoApi(Cypress.env('TEST_AUTOMATION_USERNAME'), Cypress.env('TEST_AUTOMATION_PASSWORD'))
  })

  describe('time delay configuration', () => {
    beforeEach('open the time delay rule', () => {
      timeDelay.openCriteriaLocator()
    })

    it('should increment the input number three times', () => {
      timeDelay.getTimeDelayContainer.should('be.visible')
      for (let i = 0; i < 3; i++) {
        timeDelay.getInputUpIcon.click()
      }
      timeDelay.getInputNumber.should('have.value', 3)
    })

    it('should increment and then decrement the input number', () => {
      timeDelay.getInputUpIcon.click()
      timeDelay.getInputDownIcon.click()
      timeDelay.getInputNumber.should('have.value', 0)
    })

    it('should type "3" into the input number', () => {
      timeDelay.getInputNumber.clear().type('11')
      timeDelay.getInputNumber.should('have.value', 11)
    })

    it('should change the units to "Days"', () => {
      timeDelay.getSelectUnits.click().wait(50)
      timeDelay.getDays.click()
      timeDelay.getSelectedItem.should('contain.text', 'Days')
    })
  })
})
