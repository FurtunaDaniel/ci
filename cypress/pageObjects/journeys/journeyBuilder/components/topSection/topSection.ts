class TopSection {
  editTitleBtn = '[data-testid="edit-title-btn"]'
  journeyTitleInput = '[data-testid="journey__title__input"] .ant-input'
  errorsIcon = '[data-testid*="errors-icon"]'
  errorsNo = '[data-testid*="errors-no"]'
  errorsList = '[data-testid*="errors-list"]'
  closeErrorsBtn = '.ant-notification-notice-close'
  closeJourney = '[data-testid*="close-journey"]'
  saveJourneyButton = '[data-testid="button-primary save-journey"]'

  get EditTitleBtn() {
    return cy.get(this.editTitleBtn)
  }

  get JourneyTitleInput() {
    return cy.get(this.journeyTitleInput)
  }

  get ErrorsIcon() {
    return cy.get(this.errorsIcon)
  }

  get ErrorsNo() {
    return cy.get(this.errorsNo)
  }

  get ErrorsList() {
    return cy.get(this.errorsList)
  }

  get CloseErrorsBtn() {
    return cy.get(this.closeErrorsBtn)
  }

  get CloseJourneyBtn() {
    return cy.get(this.closeJourney)
  }

  get SaveJourneyButton() {
    return cy.get(this.saveJourneyButton)
  }

  openErrorPopUp() {
    this.ErrorsIcon.click()
  }

  closeErrorPopUp() {
    this.CloseErrorsBtn.click()
  }
}

export const topSection = new TopSection()
