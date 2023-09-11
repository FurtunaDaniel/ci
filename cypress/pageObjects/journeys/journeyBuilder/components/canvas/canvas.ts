import { rules } from 'pageObjects/journeys/journeyBuilder/components/toolBox/rules/rules'

interface MoveCanvasProps {
  position: {
    x?: number
    y?: number
  }
}

class Canvas {
  segmentNode = '[data-testid="node-segment"]'
  deleteNodeBtn = '[data-testid="delete-node"]'
  zoomOut = '.react-flow__controls-zoomout'
  canvasPlaceholderArea = '[data-testid="placeholder--area"]'
  canvas = '[data-testid="canvas"]'
  journeyGoalBtn = '[data-testid~="goals-btn"]'
  journeyGoalPopupButton = '[data-testid~="journey-goal-popover-btn"]'

  nodeMerge = `[data-testid="node-${rules.mockMergeData.type}"]`
  nodeLoop = `[data-testid="node-${rules.mockLoopData.type}"]`
  nodeTimeDelay = `[data-testid="node-${rules.mockTimeDelayData.type}"]`
  nodeWaitForTrigger = `[data-testid="node-${rules.mockWaitForTriggerData.type}"]`
  nodeIfElse = `[data-testid="node-${rules.mockIfElseData.type}"]`
  nodeEnd = '[data-testid="node-end"]'

  activateMergeSelection = '[data-testid^="merge-target"]'

  FRAGMENT_X = 500
  FRAGMENT_Y = 210
  INITIAL_CLIENT_Y = 570

  journeyNode = '.react-flow__node'

  get SegmentNode() {
    return cy.get(this.segmentNode)
  }

  get DeleteNodeBtn() {
    return cy.get(this.deleteNodeBtn)
  }

  get ZoomOut() {
    return cy.get(this.zoomOut)
  }

  get NodeMerge() {
    return cy.get(this.nodeMerge)
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

  get ActivateMergeSelection() {
    return cy.get(this.activateMergeSelection)
  }

  get Canvas() {
    return cy.get(this.canvas)
  }

  get JourneyGoalBtn() {
    return cy.get(this.journeyGoalBtn)
  }

  get JourneyGoalPopoverBtn() {
    return cy.get(this.journeyGoalPopupButton)
  }

  get JourneyNode() {
    return cy.get(this.journeyNode)
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
}
export const canvas = new Canvas()
