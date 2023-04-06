import { journeyBuilderInterceptors } from 'support/JourneyBuilder'
import { journeyBuilder } from 'support/JourneyBuilder.page'
import { navigationBar } from 'support/NavigationBar'

describe('Journeys', () => {
  context('1920p resolution', () => {
    beforeEach(() => {
      // run these tests as if in a desktop (high resolution)
      cy.loginByCognitoApi(Cypress.env('TEST_AUTOMATION_USERNAME'), Cypress.env('TEST_AUTOMATION_PASSWORD'))
      journeyBuilderInterceptors.getPlatforms()
      journeyBuilder.open()
      cy.viewport(1920, 1080)
    })

    describe('whenever a user navigates to the journey builder', () => {
      it('should display the journey builder and its various sections', () => {
        cy.url().should('include', '/journeys/journey/new')
      })

      it('should display the reset modal by clicking the delete segment button, with the appropriate content', () => {
        journeyBuilder.DeleteNodeBtn.should('not.be.visible')
        // I didn't found a way to trigger the hover that changes the opacity of the button https://docs.cypress.io/api/commands/hover#Trigger Using .trigger() will only affect events in JavaScript and will not trigger any effects in CSS.
        journeyBuilder.DeleteNodeBtn.trigger('mouseover').click()
        journeyBuilder.ModalHeading.should('be.visible').contains('Reset Segment?')
        // // check the buttons
        journeyBuilder.ModalCancelBtn.should('be.visible').contains('Cancel')
        journeyBuilder.ModalConfirmBtn.should('be.visible').contains('Confirm')
        journeyBuilder.ModalMessage.should('be.visible').contains('Please note this will remove all segment criteria.')
        journeyBuilder.ModalClose.should('be.visible')

        journeyBuilder.ModalCancelBtn.click()
      })

      describe('Closing the modal using CTA buttons', () => {
        it('should close the modal by presssing Cancel btn', () => {
          journeyBuilder.DeleteNodeBtn.trigger('mouseover').click()

          journeyBuilder.ModalCancelBtn.should('be.visible')

          journeyBuilder.ModalCancelBtn.click()
          journeyBuilder.ModalCancelBtn.should('not.be.visible')
        })

        it('should close the modal by presssing Confirm btn', () => {
          journeyBuilder.DeleteNodeBtn.trigger('mouseover').click()

          journeyBuilder.ModalConfirmBtn.should('be.visible')

          journeyBuilder.ModalConfirmBtn.click()
          journeyBuilder.ModalConfirmBtn.should('not.be.visible')
        })

        it('should close the modal presssing x btn', () => {
          journeyBuilder.DeleteNodeBtn.trigger('mouseover').click()

          journeyBuilder.ModalClose.should('be.visible')

          journeyBuilder.ModalClose.click()
          journeyBuilder.ModalClose.should('not.be.visible')
        })

        it('should close the modal presssing outside of the modal', () => {
          journeyBuilder.DeleteNodeBtn.trigger('mouseover').click()

          cy.get('.ant-modal-wrap').click(15, 15)
          journeyBuilder.ModalClose.should('not.be.visible')
        })
      })

      describe('Delete merge node adding the end nodes and edges for the merged elements', () => {
        it('should add merge node and delete it without beeing linked with other elements', () => {
          journeyBuilder.createMergeScenario(1)

          journeyBuilder.DeleteNodeBtn.eq(3).click()
          journeyBuilder.ModalConfirmBtn.click()
          journeyBuilder.NodeMerge.should('not.exist')
        })

        it('should add merge node and delete it adding end node and edge for the element linked with', () => {
          journeyBuilder.createMergeScenario(1)

          // Should be one ifElse node and 2 end nodes in the canvas
          journeyBuilder.NodeIfElse.should('have.length', 1)
          journeyBuilder.NodeEnd.should('have.length', 2)

          // Merge element from NO branch
          journeyBuilder.mergeBranches(1)

          // After merging, the end node from the target should be removed
          journeyBuilder.NodeEnd.should('have.length', 1)

          // Delete merge node
          journeyBuilder.DeleteNodeBtn.eq(3).click()
          journeyBuilder.ModalConfirmBtn.click()
          journeyBuilder.NodeMerge.should('not.exist')

          // Restore end node and edge for the merged element
          journeyBuilder.NodeEnd.should('have.length', 2)
        })

        it('should add merge node and delete it adding end node and edge for the element linked with', () => {
          journeyBuilder.createMergeScenario(4)

          journeyBuilder.NodeIfElse.should('have.length', 4)
          journeyBuilder.NodeEnd.should('have.length', 5)

          journeyBuilder.moveCanvas({ position: { x: 0.8 } })

          journeyBuilder.mergeBranches(4)

          journeyBuilder.NodeEnd.should('have.length', 1)
          journeyBuilder.DeleteNodeBtn.eq(9).click()
          journeyBuilder.ModalConfirmBtn.click()
          journeyBuilder.NodeMerge.should('not.exist')
          journeyBuilder.NodeEnd.should('have.length', 5)
        })
      })
    })

    describe('Drag and drop element', () => {
      it('should Drag and drop element', () => {
        cy.dragAndDrop({
          subject: journeyBuilder.dataSourceTimeDelay,
          target: journeyBuilder.canvasPlaceholderArea,
          object: journeyBuilder.mockTimeDelayData,
        })
      })
    })

    describe('configuration panel and delete actions', () => {
      it('should open the configuration panel, drag and drop the first field of the first platform, type something and reset the segment using the panel reset modal', () => {
        cy.loginByCognitoApi(Cypress.env('TEST_AUTOMATION_USERNAME'), Cypress.env('TEST_AUTOMATION_PASSWORD'))

        // Click on segment
        cy.get('[data-testid="node-1"]').click()
        // drill first result
        cy.get('.segment-sidebar .menu > div')
          .first()
          .click()
          .then(() => {
            cy.get('.segment-sidebar .menu > div', { timeout: 6000 }).first().click()
          })
        // drag and drop first field

        cy.dragAndDrop({ subject: '.segment-sidebar .menu > div', target: '.segment-builder__criteria' })
        cy.get('.segment-builder__criteria .group-container__item-container input').should('exist')
        // select first option from dropdown
        cy.get('.ant-select-item-option').first().click()
        // type 321
        cy.get('.segment-builder__criteria .group-container__item-container input')
          .eq(1)
          .focus()
          .type('321', { force: true })
        //click on trash icon
        cy.get('[data-testid="panel-remove"]').click()
        // reset segment
        journeyBuilder.ModalConfirmBtn.should('be.visible')
        journeyBuilder.ModalConfirmBtn.click()
        cy.get('.segment-builder__criteria .group-container__item-container input').should('not.exist')
      })
    })

    describe('Save changes popup at leaving the page', () => {
      beforeEach(() => {
        cy.loginByCognitoApi(Cypress.env('TEST_AUTOMATION_USERNAME'), Cypress.env('TEST_AUTOMATION_PASSWORD'))
        journeyBuilder.open()
        cy.url().should('include', '/journeys/journey/new')
      })

      it('should display the popup when trying to leave the route after adding an element', () => {
        cy.dragAndDrop({
          subject: journeyBuilder.dataSourceTimeDelay,
          target: journeyBuilder.canvasPlaceholderArea,
          object: journeyBuilder.mockTimeDelayData,
        })
        navigationBar.getLogoSVG.click()
        cy.url().should('include', '/journeys/journey/new')
        // // check the buttons
        journeyBuilder.ModalHeading.should('be.visible').contains('Save journey?')
        journeyBuilder.ModalCancelBtn.should('be.visible').contains('Discard changes')
        journeyBuilder.ModalConfirmBtn.should('be.visible').contains('Save')
        journeyBuilder.ModalMessage.should('be.visible').contains('Do you want to save the journey as you click away?')
        journeyBuilder.ModalClose.should('be.visible')
        // close the modal without leaving the page
        journeyBuilder.ModalClose.click()
      })

      it('should display the popup when trying to leave the route after updating the segment', () => {
        // Click on segment
        cy.get('[data-testid="node-1"]').click()
        // drill first result
        cy.get('.segment-sidebar .menu > div')
          .first()
          .click()
          .then(() => {
            cy.get('.segment-sidebar .menu > div', { timeout: 6000 }).first().click()
          })
        // drag and drop first field

        cy.dragAndDrop({ subject: '.segment-sidebar .menu > div', target: '.segment-builder__criteria' })
        cy.get('.segment-builder__criteria .group-container__item-container input').should('exist')
        // select first option from dropdown
        cy.get('.ant-select-item-option').first().click()
        // type 321
        cy.get('.segment-builder__criteria .group-container__item-container input')
          .eq(1)
          .focus()
          .type('321', { force: true })
        journeyBuilder.ConfigPanelSaveBtn.click()
        navigationBar.getJourneys.click()
        journeyBuilder.ModalHeading.should('be.visible').contains('Save journey?')
        cy.url().should('include', '/journeys/journey/new')
      })

      it('should not display the popup leaving the route after adding and removing the added node', () => {
        cy.dragAndDrop({
          subject: journeyBuilder.dataSourceTimeDelay,
          target: journeyBuilder.canvasPlaceholderArea,
          object: journeyBuilder.mockTimeDelayData,
        })
        cy.wait(100)
        journeyBuilder.DeleteNodeBtn.eq(1).trigger('mouseover').click()
        journeyBuilder.ModalConfirmBtn.click()
        navigationBar.getIntegrations.click()
        cy.url().should('include', '/integrations')
      })

      it('should not display the popup leaving the route without making changes', () => {
        navigationBar.getLogoSVG.click()
        cy.url().should('include', '/dashboard')
      })

      it('should allow changing the route after the user discards his changes', () => {
        cy.dragAndDrop({
          subject: journeyBuilder.dataSourceTimeDelay,
          target: journeyBuilder.canvasPlaceholderArea,
          object: journeyBuilder.mockTimeDelayData,
        })

        navigationBar.getJourneys.click()
        cy.url().should('include', '/journeys/journey/new')

        // close the modal discarding the changes
        journeyBuilder.ModalCancelBtn.click()
        cy.url().should('include', '/journeys')

        it('should remain on the new journey page when user tries to navigate away but the title is empty', () => {
          cy.dragAndDrop({
            subject: journeyBuilder.dataSourceTimeDelay,
            target: journeyBuilder.canvasPlaceholderArea,
            object: journeyBuilder.mockTimeDelayData,
          })
          navigationBar.getJourneys.click()
          journeyBuilder.ModalConfirmBtn.click()
          cy.url().should('include', '/journeys/journey/new')
        })

        it('should change the route and save the changes when is pressed the confirm button', () => {
          cy.intercept(
            {
              method: 'POST',
              url: '*/playbooks',
            },
            { message: 'GG', playbookId: 'uuid', version: 1 },
          ).as('saveJourney')

          cy.dragAndDrop({
            subject: journeyBuilder.dataSourceTimeDelay,
            target: journeyBuilder.canvasPlaceholderArea,
            object: journeyBuilder.mockTimeDelayData,
          })
          journeyBuilder.EditTitleBtn.click()
          journeyBuilder.JourneyTitleInput.type('test journey')

          navigationBar.getJourneys.click()
          cy.url().should('include', '/journeys/journey/new')
          // close the modal discarding the changes
          journeyBuilder.ModalConfirmBtn.click()
          cy.wait('@saveJourney').then((interception) => {
            assert.isNotNull(interception.response.body, 'Save request was made')
          })
          cy.url().should('include', '/journeys')
        })
      })
    })
  })
})
