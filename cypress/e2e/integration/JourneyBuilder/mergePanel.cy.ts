import { mergePanel } from 'support/JourneyBuilder/mergeConfigPanel'
import { journeyBuilder } from 'support/JourneyBuilder.page'

describe('merge configuration panel features', () => {
  beforeEach(() => {
    cy.loginByCognitoApi(Cypress.env('TEST_AUTOMATION_USERNAME'), Cypress.env('TEST_AUTOMATION_PASSWORD'))
    journeyBuilder.open()
    cy.viewport(1920, 1080)
  })

  it('should select a single merge target and config panel should be responsive based on what was selected', () => {
    mergePanel.dropMinumumRequiredForMerge()

    journeyBuilder.clickOnNodeMerge()
    mergePanel.clickOnTargetBtn()
    mergePanel.MergeTarget.contains('Choose a branch end point').should('be.visible')
    journeyBuilder.NodeTimeDelay.should('have.class', 'target--valid')
    journeyBuilder.NodeIfElse.should('have.class', 'target--invalid')
    journeyBuilder.NodeEnd.should('have.length', 2)

    // select time delay as merge target
    journeyBuilder.clickOnNodeTimeDelay()
    journeyBuilder.NodeEnd.should('have.length', 1)
    journeyBuilder.NodeTimeDelay.should('have.class', 'target--undefined')
    journeyBuilder.NodeIfElse.should('have.class', 'target--undefined')
    mergePanel.MergeTarget.contains('Time delay').should('be.visible')

    // check the state of merge node panel
    mergePanel.clickOnSave()
    journeyBuilder.clickOnNodeMerge()
    mergePanel.MergeTarget.contains('Time delay').should('be.visible')
    mergePanel.clickOnRemoveAction()
    journeyBuilder.NodeEnd.should('have.length', 2)
    mergePanel.MergeTarget.should('not.contain', 'Time delay')
  })

  // Reset "select merge target" scenarios
  it('should reset the nodes state while selecting a merge target -> the panel is closed', () => {
    mergePanel.dropMinumumRequiredForMerge()

    journeyBuilder.clickOnNodeMerge()
    mergePanel.clickOnTargetBtn()
    journeyBuilder.NodeTimeDelay.should('have.class', 'target--valid')
    journeyBuilder.NodeIfElse.should('have.class', 'target--invalid')
    journeyBuilder.NodeEnd.should('have.length', 2)

    mergePanel.clickOnClose()
    journeyBuilder.NodeEnd.should('have.length', 2)
    journeyBuilder.NodeTimeDelay.should('have.class', 'target--undefined')
    journeyBuilder.NodeIfElse.should('have.class', 'target--undefined')
  })

  it('should reset the nodes state while selecting a merge target -> is clicked save without selecting anything', () => {
    mergePanel.dropMinumumRequiredForMerge()

    journeyBuilder.clickOnNodeMerge()
    mergePanel.clickOnTargetBtn()
    journeyBuilder.NodeTimeDelay.should('have.class', 'target--valid')
    journeyBuilder.NodeIfElse.should('have.class', 'target--invalid')

    mergePanel.clickOnSave()
    journeyBuilder.NodeTimeDelay.should('have.class', 'target--undefined')
    journeyBuilder.NodeIfElse.should('have.class', 'target--undefined')
  })

  it('should reset the nodes state while selecting a merge target -> the node is removed using the panel trash icon', () => {
    mergePanel.dropMinumumRequiredForMerge()

    journeyBuilder.clickOnNodeMerge()
    mergePanel.clickOnTargetBtn()
    journeyBuilder.NodeTimeDelay.should('have.class', 'target--valid')
    journeyBuilder.NodeIfElse.should('have.class', 'target--invalid')

    mergePanel.clickOnDeleteBtn()
    journeyBuilder.ModalConfirmBtn.click()
    journeyBuilder.NodeTimeDelay.should('have.class', 'target--undefined')
    journeyBuilder.NodeIfElse.should('have.class', 'target--undefined')
  })

  it('should reset the nodes state while selecting a merge target -> the node is removed using the node trash icon', () => {
    mergePanel.dropMinumumRequiredForMerge()

    journeyBuilder.clickOnNodeMerge()
    mergePanel.clickOnTargetBtn()
    journeyBuilder.NodeTimeDelay.should('have.class', 'target--valid')
    journeyBuilder.NodeIfElse.should('have.class', 'target--invalid')

    journeyBuilder.getNodeMerge().parent().find(journeyBuilder.deleteNodeBtn).click()
    journeyBuilder.ModalConfirmBtn.click()
    journeyBuilder.NodeTimeDelay.should('have.class', 'target--undefined')
    journeyBuilder.NodeIfElse.should('have.class', 'target--undefined')
  })
})
