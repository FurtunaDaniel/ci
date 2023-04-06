import { loopPanel } from 'support/JourneyBuilder/loopConfigPanel'
import { journeyBuilder } from 'support/JourneyBuilder.page'

describe('loop configuration panel features', () => {
  beforeEach(() => {
    cy.loginByCognitoApi(Cypress.env('TEST_AUTOMATION_USERNAME'), Cypress.env('TEST_AUTOMATION_PASSWORD'))
    journeyBuilder.open()
    cy.viewport(1920, 1080)
  })

  it('should select targets and display its name consistently even when are more loops configured', () => {
    //  drop set of time delay and loop
    cy.dragAndDrop({
      subject: journeyBuilder.dataSourceTimeDelay,
      target: journeyBuilder.canvasPlaceholderArea,
      object: journeyBuilder.mockTimeDelayData,
    })

    cy.dragAndDrop({
      subject: journeyBuilder.dataSourceLoop,
      target: journeyBuilder.canvasPlaceholderArea,
      object: journeyBuilder.mockTimeDelayData,
      targetPosition: 1,
    })

    //  Select time delay as target
    journeyBuilder.clickOnNodeLoop()
    loopPanel.clickOnLoopToAction()
    loopPanel.LoopToAction.contains('Choose an action from the canvas').should('be.visible')
    journeyBuilder.clickOnNodeTimeDelay(0)
    loopPanel.clickOnSave()

    //  End Select target
    journeyBuilder.clickOnNodeLoop()
    loopPanel.LoopToAction.contains(journeyBuilder.mockTimeDelayData.name).should('be.visible')

    //  drop set of wait for trigger and loop
    cy.dragAndDrop({
      subject: journeyBuilder.dataSourceLoop,
      target: journeyBuilder.canvasPlaceholderArea,
      object: journeyBuilder.mockTimeDelayData,
      targetPosition: 2,
    })
    cy.dragAndDrop({
      subject: journeyBuilder.dataSourceWaitForTrigger,
      target: journeyBuilder.canvasPlaceholderArea,
      object: journeyBuilder.mockWaitForTriggerData,
      targetPosition: 3,
    })

    journeyBuilder.clickOnNodeLoop(1)
    loopPanel.clickOnLoopToAction()
    journeyBuilder.clickOnNodeWaitForTrigger(0)
    loopPanel.clickOnSave()
    journeyBuilder.clickOnNodeLoop(1)
    loopPanel.LoopToAction.contains(journeyBuilder.mockWaitForTriggerData.name).should('be.visible')
    loopPanel.clickOnClose()

    //  Recheck initial loop target name
    journeyBuilder.clickOnNodeLoop(0)
    loopPanel.LoopToAction.contains(journeyBuilder.mockTimeDelayData.name).should('be.visible')
  })

  it('should select and deselect target', () => {
    //  drop set of time delay and loop
    cy.dragAndDrop({
      subject: journeyBuilder.dataSourceTimeDelay,
      target: journeyBuilder.canvasPlaceholderArea,
      object: journeyBuilder.mockTimeDelayData,
    })

    cy.dragAndDrop({
      subject: journeyBuilder.dataSourceLoop,
      target: journeyBuilder.canvasPlaceholderArea,
      object: journeyBuilder.mockTimeDelayData,
      targetPosition: 1,
    })

    //  Select time delay as target
    journeyBuilder.clickOnNodeLoop()
    loopPanel.clickOnLoopToAction()
    loopPanel.LoopToAction.contains('Choose an action from the canvas').should('be.visible')
    journeyBuilder.clickOnNodeTimeDelay(0)
    loopPanel.clickOnSave()

    //  End Select target
    journeyBuilder.clickOnNodeLoop()
    loopPanel.LoopToAction.contains(journeyBuilder.mockTimeDelayData.name).should('be.visible')

    //  Remove action
    loopPanel.clickOnRemoveAction()
    loopPanel.clickOnSave()
    journeyBuilder.clickOnNodeLoop()
    loopPanel.LoopToAction.should('have.text', '')
    loopPanel.clickOnClose()
  })

  it('should not be able to drop a loop or if/else inner another loop', () => {
    //  drop set of time delay and loop
    cy.dragAndDrop({
      subject: journeyBuilder.dataSourceTimeDelay,
      target: journeyBuilder.canvasPlaceholderArea,
      object: journeyBuilder.mockTimeDelayData,
    })

    //  drop loop
    cy.dragAndDrop({
      subject: journeyBuilder.dataSourceLoop,
      target: journeyBuilder.canvasPlaceholderArea,
      object: journeyBuilder.mockTimeDelayData,
      targetPosition: 1,
    })
    journeyBuilder.Canvas.find(journeyBuilder.nodeLoop).should('have.length', 1)

    //  Select time delay as target
    journeyBuilder.clickOnNodeLoop()
    loopPanel.clickOnLoopToAction()
    loopPanel.LoopToAction.contains('Choose an action from the canvas').should('be.visible')
    journeyBuilder.clickOnNodeTimeDelay(0)
    loopPanel.clickOnSave()

    cy.dragAndDrop({
      subject: journeyBuilder.dataSourceLoop,
      target: journeyBuilder.canvasPlaceholderArea,
      object: journeyBuilder.mockLoopData,
      targetPosition: 1,
    })

    //  after trying to drop a loop inner another loop, the amount of loops elements should be the same as previous
    journeyBuilder.Canvas.find(journeyBuilder.nodeLoop).should('have.length', 1)

    cy.dragAndDrop({
      subject: journeyBuilder.dataSourceIfElse,
      target: journeyBuilder.canvasPlaceholderArea,
      object: journeyBuilder.mockIfElseData,
      targetPosition: 1,
    })

    //  after trying to drop an if/else inner another loop, the amount of if/else elements should be the same as previous
    journeyBuilder.Canvas.find(journeyBuilder.nodeIfElse).should('have.length', 0)

    cy.dragAndDrop({
      subject: journeyBuilder.dataSourceLoop,
      target: journeyBuilder.canvasPlaceholderArea,
      object: journeyBuilder.mockLoopData,
      targetPosition: 2,
    })

    //  dropping a loop outside of a loop should be possibe and should increase the number of loops
    journeyBuilder.Canvas.find(journeyBuilder.nodeLoop).should('have.length', 2)

    cy.dragAndDrop({
      subject: journeyBuilder.dataSourceIfElse,
      target: journeyBuilder.canvasPlaceholderArea,
      object: journeyBuilder.mockIfElseData,
      targetPosition: 2,
    })

    //  dropping an if/else outside of a loop should be possibe and should increase the number of if/else
    journeyBuilder.Canvas.find(journeyBuilder.nodeIfElse).should('have.length', 1)
  })

  it('should be able to drop a loop or if/else inner another loop only after it was unneconfigured', () => {
    //  drop set of time delay and loop
    cy.dragAndDrop({
      subject: journeyBuilder.dataSourceTimeDelay,
      target: journeyBuilder.canvasPlaceholderArea,
      object: journeyBuilder.mockTimeDelayData,
    })

    //  drop loop
    cy.dragAndDrop({
      subject: journeyBuilder.dataSourceLoop,
      target: journeyBuilder.canvasPlaceholderArea,
      object: journeyBuilder.mockTimeDelayData,
      targetPosition: 1,
    })
    journeyBuilder.Canvas.find(journeyBuilder.nodeLoop).should('have.length', 1)

    //  Select time delay as target
    journeyBuilder.clickOnNodeLoop()
    loopPanel.clickOnLoopToAction()
    loopPanel.LoopToAction.contains('Choose an action from the canvas').should('be.visible')
    journeyBuilder.clickOnNodeTimeDelay(0)
    loopPanel.clickOnSave()

    cy.dragAndDrop({
      subject: journeyBuilder.dataSourceLoop,
      target: journeyBuilder.canvasPlaceholderArea,
      object: journeyBuilder.mockLoopData,
      targetPosition: 1,
    })

    //  after trying to drop a loop inner another loop, the amount of loops elements should be the same as previous
    journeyBuilder.Canvas.find(journeyBuilder.nodeLoop).should('have.length', 1)

    cy.dragAndDrop({
      subject: journeyBuilder.dataSourceIfElse,
      target: journeyBuilder.canvasPlaceholderArea,
      object: journeyBuilder.mockIfElseData,
      targetPosition: 1,
    })

    //  after trying to drop an if/else inner another loop, the amount of if/else elements should be the same as previous
    journeyBuilder.Canvas.find(journeyBuilder.nodeIfElse).should('have.length', 0)

    //  Remove loop action
    journeyBuilder.clickOnNodeLoop()
    loopPanel.clickOnRemoveAction()
    loopPanel.clickOnSave()

    cy.dragAndDrop({
      subject: journeyBuilder.dataSourceLoop,
      target: journeyBuilder.canvasPlaceholderArea,
      object: journeyBuilder.mockLoopData,
      targetPosition: 1,
    })

    cy.dragAndDrop({
      subject: journeyBuilder.dataSourceIfElse,
      target: journeyBuilder.canvasPlaceholderArea,
      object: journeyBuilder.mockIfElseData,
      targetPosition: 1,
    })

    //  after dropping a loop where it was configured another loop, the amount of loops elements should increase with 1 and be 2
    journeyBuilder.Canvas.find(journeyBuilder.nodeLoop).should('have.length', 2)
    //  after dropping an if/else where it was configured a loop, the amount of if/else elements should increase with 1 and be 1
    journeyBuilder.Canvas.find(journeyBuilder.nodeIfElse).should('have.length', 1)
  })
})
