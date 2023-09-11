class DeleteNodeModal {
  readonly modalHeading = '[data-testid="heading"]'
  readonly modalConfirmBtn = '[data-testid~="confirm-btn"]'
  readonly modalClose = '[data-testid="modal-close"]'
  readonly modalMessage = '[data-testid="modal-message"]'
  readonly modalCancelBtn = '[data-testid~="cancel-btn"]'
  readonly modalBackLayout = '.ant-modal-wrap'

  get ModalHeading() {
    return cy.get(this.modalHeading)
  }

  get ModalConfirmBtn() {
    return cy.get(this.modalConfirmBtn)
  }

  get ModalClose() {
    return cy.get(this.modalClose)
  }

  get ModalMessage() {
    return cy.get(this.modalMessage)
  }

  get ModalCancelBtn() {
    return cy.get(this.modalCancelBtn)
  }
}

export const deleteNodeModal = new DeleteNodeModal()
