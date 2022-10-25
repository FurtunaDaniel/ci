export class JourneyBuilder {
  deleteNodeBtn = '[data-testid="delete-node"]'
  modalHeading = '[data-testid="heading"]'
  modalCancelBtn = '[data-testid="cancel-btn"]'
  modalConfirmBtn = '[data-testid="confirm-btn"]'
  modalClose = '[data-testid="modal-close"]'
  modalMessage = '[data-testid="modal-message"]'
  dataSourceTimeDelay = '[data-testid="action-source-2"]'
  canvasPlaceholderArea = '.placeholder--area'
  secondCanvasNode = '[data-testid*="node-"]'
  configPanelSaveBtn = '.segment-builder__bottom-fixed-elements > button'
  mockTimeDelayData = {
    name: 'Time delay',
    description: 'Time delay',
    type: 'timeDelay',
    iconName: 'timeDelay',
    shape: 'rhomb',
  }

  get getDeleteNodeBtn() {
    return cy.get(this.deleteNodeBtn)
  }

  get getModalHeading() {
    return cy.get(this.modalHeading)
  }

  get getModalCancelBtn() {
    return cy.get(this.modalCancelBtn)
  }

  get getModalConfirmBtn() {
    return cy.get(this.modalConfirmBtn)
  }

  get getModalClose() {
    return cy.get(this.modalClose)
  }

  get getModalMessage() {
    return cy.get(this.modalMessage)
  }

  get getSecondCanvasNode() {
    return cy.get(this.secondCanvasNode)
  }

  get getConfigPanelSaveBtn() {
    return cy.get(this.configPanelSaveBtn)
  }

  open() {
    cy.visit(`${Cypress.env('environmentUrl')}/journeys/playbook/new`)
  }
}
// TODO Daniel: Check with Pete POM vs app action design pattern
export const journeyBuilder = new JourneyBuilder()
