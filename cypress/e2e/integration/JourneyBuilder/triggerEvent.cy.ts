import { triggerEvent } from 'support/JourneyBuilder/index'

context('TriggerEvent component', () => {
  beforeEach(() => {
    cy.viewport(1920, 1080)
    cy.loginByCognitoApi(Cypress.env('TEST_AUTOMATION_USERNAME'), Cypress.env('TEST_AUTOMATION_PASSWORD'))
    triggerEvent.openConfigPanel()
  })

  describe('configuraion panel', () => {
    it('should open the triggerEvent config panel', () => {
      triggerEvent.Subtitle.should('contain.text', 'gainsight Trigger Event Inputs')
    })

    it('should display the default fields', () => {
      triggerEvent.ActionsInputs.should('contain.text', 'Topic')
        .and('contain.text', 'Event')
        .and('contain.text', 'Version')
        .and('contain.text', 'Payload Structure')
    })

    it('should display the "Load field structure" button', () => {
      triggerEvent.LoadBtn.should('be.visible')
    })

    it('should load the payload structure without any value and throw an error', () => {
      triggerEvent.LoadBtn.click()
      triggerEvent.ErrorMessage.should('be.visible')
    })

    it('should load an empty object as payload structure and throw an error', () => {
      triggerEvent.PayloadTextarea.type('{}')
      triggerEvent.LoadBtn.click()
      triggerEvent.ErrorMessage.should('be.visible')
    })

    it('should load a payload structure where the field name is "Test Numeric Field"', () => {
      triggerEvent.PayloadTextarea.type('{"Test Numeric Field": "number"}', { parseSpecialCharSequences: false })
      triggerEvent.LoadBtn.click()
      triggerEvent.ActionsInputs.should('contain.text', 'Test Numeric Field')
    })

    it('should change the button type once the payload structure is loaded successfully', () => {
      triggerEvent.PayloadTextarea.type('{"Test": "string"}', { parseSpecialCharSequences: false })
      triggerEvent.LoadBtn.click()
      triggerEvent.LoadBtn.should('not.exist')
      triggerEvent.EditBtn.should('be.visible')
    })

    it('should disable the payload structure textarea once the payload is loaded successfully', () => {
      triggerEvent.PayloadTextarea.type('{"Test": "string"}', { parseSpecialCharSequences: false })
      triggerEvent.LoadBtn.click()
      triggerEvent.PayloadTextarea.should('have.attr', 'disabled')
    })

    it('should change the button type once the "Edit payload structure" button is clicked', () => {
      triggerEvent.PayloadTextarea.type('{"Test": "string"}', { parseSpecialCharSequences: false })
      triggerEvent.LoadBtn.click()
      triggerEvent.EditBtn.click()
      triggerEvent.LoadBtn.should('be.visible')
    })

    it('should change remove the disabled attribute from textarea once the "Edit payload structure" button is clicked', () => {
      triggerEvent.PayloadTextarea.type('{"Test": "string"}', { parseSpecialCharSequences: false })
      triggerEvent.LoadBtn.click()
      triggerEvent.EditBtn.click()
      triggerEvent.PayloadTextarea.should('not.have.attr', 'disabled')
    })
  })
})
