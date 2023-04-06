import { recordCriteriaLocator } from 'support/JourneyBuilder/recordCriteriaLocator'
interface MoveCanvasProps {
  position: {
    x?: number
    y?: number
  }
}
class JourneyBuilder {
  deleteNodeBtn = '[data-testid="delete-node"]'
  modalHeading = '[data-testid="heading"]'
  modalCancelBtn = '[data-testid~="cancel-btn"]'
  modalConfirmBtn = '[data-testid~="confirm-btn"]'
  modalClose = '[data-testid="modal-close"]'
  modalMessage = '[data-testid="modal-message"]'
  actionSource = 'action-source'
  canvasPlaceholderArea = '[data-testid="placeholder--area"]'
  secondCanvasNode = '[data-testid*="node-"]'
  configPanelSaveBtn = '.segment-builder__bottom-fixed-elements > button'
  editTitleBtn = '[data-testid="edit-title-btn"]'
  journeyTitleInput = '[data-testid="journey-title-input"] .ant-input'
  segmentNode = '[data-testid="node-segment"]'
  dataSourceField = '[data-testid="menu__item"]'
  saveJourneyButton = '[data-testid~="button-primary "] > div:contains(Save journey)'

  mockIfElseData = { name: 'If / Else', description: 'If / Else', type: 'ifElse', iconName: 'ifElse', shape: 'rhomb' }
  mockWaitForTriggerData = {
    name: 'Wait for trigger',
    description: 'Wait for trigger',
    type: 'waitForTrigger',
    iconName: 'waitForTrigger',
    shape: 'rhomb',
  }
  mockTimeDelayData = {
    name: 'Time delay',
    description: 'Time delay',
    type: 'timeDelay',
    iconName: 'timeDelay',
    shape: 'rhomb',
  }
  mockLoopData = { name: 'Loop', description: 'Loop', type: 'loop', iconName: 'loop', shape: 'rhomb' }
  mockMergeData = {
    name: 'Merge',
    description: 'Merge',
    type: 'merge',
    iconName: 'merge',
    shape: 'rhomb',
  }

  dataSourceTimeDelay = `[data-testid="${this.actionSource}-${this.mockTimeDelayData.type}"]`
  dataSourceLoop = `[data-testid="${this.actionSource}-${this.mockLoopData.type}"]`
  dataSourceWaitForTrigger = `[data-testid="${this.actionSource}-${this.mockWaitForTriggerData.type}"]`
  dataSourceIfElse = `[data-testid="${this.actionSource}-${this.mockIfElseData.type}"]`
  dataSourceMerge = `[data-testid="${this.actionSource}-${this.mockMergeData.type}"]`

  nodeLoop = `[data-testid="node-${this.mockLoopData.type}"]`
  nodeTimeDelay = `[data-testid="node-${this.mockTimeDelayData.type}"]`
  nodeWaitForTrigger = `[data-testid="node-${this.mockWaitForTriggerData.type}"]`
  nodeIfElse = `[data-testid="node-${this.mockIfElseData.type}"]`
  nodeMerge = `[data-testid="node-${this.mockMergeData.type}"]`
  nodeEnd = '[data-testid="node-end"]'

  canvas = '[data-testid="canvas"]'
  activateMergeSelection = '[data-testid^="merge-target"]'
  addBranchBtn = '[data-testid*="add-branch"]'
  zoomOut = '.react-flow__controls-zoomout'
  zoomIn = '.react-flow__controls-zoomin'
  closePanel = '[data-testid="panel-close"]'
  savePanel = '[data-testid~="save-panel"]'
  FRAGMENT_X = 500
  FRAGMENT_Y = 210
  INITIAL_CLIENT_Y = 570

  get DeleteNodeBtn() {
    return cy.get(this.deleteNodeBtn)
  }

  get ModalHeading() {
    return cy.get(this.modalHeading)
  }

  get ModalCancelBtn() {
    return cy.get(this.modalCancelBtn)
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

  get ConfigPanelSaveBtn() {
    return cy.get(this.configPanelSaveBtn)
  }

  get EditTitleBtn() {
    return cy.get(this.editTitleBtn)
  }

  get JourneyTitleInput() {
    return cy.get(this.journeyTitleInput)
  }

  get Canvas() {
    return cy.get(this.canvas)
  }

  get NodeMerge() {
    return cy.get(this.nodeMerge)
  }

  get ActivateMergeSelection() {
    return cy.get(this.activateMergeSelection)
  }

  get NodeTimeDelay() {
    return cy.get(this.nodeTimeDelay)
  }

  get NodeIfElse() {
    return cy.get(this.nodeIfElse)
  }

  get NodeEnd() {
    return cy.get(this.nodeEnd)
  }

  get ClosePanel() {
    return cy.get(this.closePanel)
  }

  get SavePanel() {
    return cy.get(this.savePanel)
  }

  get SegmentNode() {
    return cy.get(this.segmentNode)
  }

  get DataSourceField() {
    return cy.get(this.dataSourceField)
  }

  get SaveJourneyButton() {
    return cy.get(this.saveJourneyButton).first()
  }

  getNodeLoop(position = 0) {
    return cy.get(this.nodeLoop).eq(position)
  }

  getNodeTimeDelay(position = 0) {
    return cy.get(this.nodeTimeDelay).eq(position)
  }

  getNodeWaitForTrigger(position = 0) {
    return cy.get(this.nodeWaitForTrigger).eq(position)
  }

  getNodeMerge(position = 0) {
    return cy.get(this.nodeMerge).eq(position)
  }

  open() {
    cy.visit(`${Cypress.env('environmentUrl')}/journeys/journey/new`)
  }

  clickOnNodeLoop(position = 0) {
    this.getNodeLoop(position).click()
  }

  clickOnNodeTimeDelay(position = 0) {
    this.getNodeTimeDelay(position).click()
  }

  clickOnNodeWaitForTrigger(position = 0) {
    this.getNodeWaitForTrigger(position).click()
  }

  clickOnNodeMerge(position = 0) {
    this.getNodeMerge(position).click()
  }

  createMergeScenario(nrOfPotentialMerge = 1) {
    let counter = 0

    for (let i = 0; i < nrOfPotentialMerge; i++) {
      cy.get(this.zoomOut).click()

      cy.dragAndDrop({
        subject: this.dataSourceIfElse,
        target: this.canvasPlaceholderArea,
        object: this.mockIfElseData,
      })

      cy.dragAndDrop({
        subject: this.dataSourceTimeDelay,
        target: this.canvasPlaceholderArea,
        object: this.mockTimeDelayData,
        targetPosition: 2 + counter,
      })

      counter += 3
    }

    cy.dragAndDrop({
      subject: this.dataSourceMerge,
      target: this.canvasPlaceholderArea,
      object: this.mockMergeData,
      targetPosition: nrOfPotentialMerge,
    })
  }

  mergeBranches(nrOfBrnahcesToBeMerged = 1) {
    this.NodeMerge.click()
    cy.get(this.zoomOut)
    for (let index = 0; index < nrOfBrnahcesToBeMerged; index++) {
      this.ActivateMergeSelection.eq(index).click()
      this.NodeTimeDelay.eq(0).click()
      this.NodeMerge.click()
      cy.get(this.zoomOut)

      if (index + 1 === nrOfBrnahcesToBeMerged) {
        this.SavePanel.click()
        break
      } else {
        cy.get(this.addBranchBtn).click()
      }
    }
  }

  buildSalesforceSegmentCriteria() {
    this.SegmentNode.click()
    this.DataSourceField.contains('salesforce').click()
    this.DataSourceField.contains('Opportunity').click()

    recordCriteriaLocator.dragAndDropField('Account ID', 0)
    recordCriteriaLocator.ItemContainer.type('Competitor')

    this.SavePanel.click()
  }

  moveCanvas({ position }: MoveCanvasProps = { position: {} }) {
    const amountToMoveX = (position.x || 0) * this.FRAGMENT_X
    const amountToMoveY = (position.y || 0) * this.FRAGMENT_Y

    cy.window().then((win) => {
      this.SegmentNode.then(($target) => {
        const segmentPosition = $target[0].getBoundingClientRect()
        this.Canvas.trigger('mousedown', {
          view: win,
        })
          .trigger('mousemove', {
            clientX: win.innerWidth - segmentPosition.right - amountToMoveX,
            clientY: this.INITIAL_CLIENT_Y - amountToMoveY,
            force: true,
          })
          .trigger('mouseup', {
            force: true,
            view: win,
          })
      })
    })
  }
}

export const journeyBuilder = new JourneyBuilder()
