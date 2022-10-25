import { journeyBuilder } from '../support/JourneyBuilder.page'
import { navigationBar } from '../support/NavigationBar'
// TODO Daniel: Check with Pete

describe('Journeys', () => {
  context('1920p resolution', () => {
    beforeEach(() => {
      // run these tests as if in a desktop (high resolution)
      cy.viewport(1920, 1080)
    })

    describe('whenever a user navigates to the journey builder', () => {
      it('should display the journey builder and its various sections', () => {
        cy.loginByCognitoApi(Cypress.env('TEST_AUTOMATION_USERNAME'), Cypress.env('TEST_AUTOMATION_PASSWORD'))
        journeyBuilder.open()
        cy.url().should('include', '/journeys/playbook/new')
      })

      it('should display the reset modal by clicking the delete segment button, with the appropriate content', () => {
        journeyBuilder.getDeleteNodeBtn.should('not.be.visible')
        // I didn't found a way to trigger the hover that changes the opacity of the button https://docs.cypress.io/api/commands/hover#Trigger Using .trigger() will only affect events in JavaScript and will not trigger any effects in CSS.
        journeyBuilder.getDeleteNodeBtn.trigger('mouseover').click()
        journeyBuilder.getModalHeading.should('be.visible').contains('Reset Segment?')
        // // check the buttons
        journeyBuilder.getModalCancelBtn.should('be.visible').contains('Cancel')
        journeyBuilder.getModalConfirmBtn.should('be.visible').contains('Confirm')
        journeyBuilder.getModalMessage
          .should('be.visible')
          .contains('Please note this will remove all segment criteria.')
        journeyBuilder.getModalClose.should('be.visible')

        journeyBuilder.getModalCancelBtn.click()
      })

      describe('Closing the modal using CTA buttons', () => {
        it('should close the modal by presssing Cancel btn', () => {
          journeyBuilder.getDeleteNodeBtn.trigger('mouseover').click()

          journeyBuilder.getModalCancelBtn.should('be.visible')

          journeyBuilder.getModalCancelBtn.click()
          journeyBuilder.getModalCancelBtn.should('not.be.visible')
        })

        it('should close the modal by presssing Confirm btn', () => {
          journeyBuilder.getDeleteNodeBtn.trigger('mouseover').click()

          journeyBuilder.getModalConfirmBtn.should('be.visible')

          journeyBuilder.getModalConfirmBtn.click()
          journeyBuilder.getModalConfirmBtn.should('not.be.visible')
        })

        it('should close the modal presssing x btn', () => {
          journeyBuilder.getDeleteNodeBtn.trigger('mouseover').click()

          journeyBuilder.getModalClose.should('be.visible')

          journeyBuilder.getModalClose.click()
          journeyBuilder.getModalClose.should('not.be.visible')
        })

        it('should close the modal presssing outside of the modal', () => {
          journeyBuilder.getDeleteNodeBtn.trigger('mouseover').click()

          cy.get('.ant-modal-wrap').click(15, 15)
          journeyBuilder.getModalClose.should('not.be.visible')
        })
      })

      describe('Drag and drop element', () => {
        it('should Drag and drop element', () => {
          cy.dragAndDrop(
            journeyBuilder.dataSourceTimeDelay,
            journeyBuilder.canvasPlaceholderArea,
            journeyBuilder.mockTimeDelayData,
          )
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
          cy.dragAndDrop('.segment-sidebar .menu > div', '.segment-builder__criteria')
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
          journeyBuilder.getModalConfirmBtn.should('be.visible')
          journeyBuilder.getModalConfirmBtn.click()
          cy.get('.segment-builder__criteria .group-container__item-container input').should('not.exist')
        })
      })

      describe('Save changes popup at leaving the page', () => {
        beforeEach(() => {
          cy.loginByCognitoApi(Cypress.env('TEST_AUTOMATION_USERNAME'), Cypress.env('TEST_AUTOMATION_PASSWORD'))
          journeyBuilder.open()
          cy.url().should('include', '/journeys/playbook/new')
        })

        it('should display the popup when trying to leave the route after adding an element', () => {
          cy.dragAndDrop(
            journeyBuilder.dataSourceTimeDelay,
            journeyBuilder.canvasPlaceholderArea,
            journeyBuilder.mockTimeDelayData,
          )
          navigationBar.getLogoSVG.click()
          cy.url().should('include', '/journeys/playbook/new')
          // // check the buttons
          journeyBuilder.getModalHeading.should('be.visible').contains('Save journey?')
          journeyBuilder.getModalCancelBtn.should('be.visible').contains('Discard Changes')
          journeyBuilder.getModalConfirmBtn.should('be.visible').contains('Save')
          journeyBuilder.getModalMessage
            .should('be.visible')
            .contains('Do you want to save the journey as you click away?')
          journeyBuilder.getModalClose.should('be.visible')
          // close the modal without leaving the page
          journeyBuilder.getModalClose.click()
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
          cy.dragAndDrop('.segment-sidebar .menu > div', '.segment-builder__criteria')
          cy.get('.segment-builder__criteria .group-container__item-container input').should('exist')
          // select first option from dropdown
          cy.get('.ant-select-item-option').first().click()
          // type 321
          cy.get('.segment-builder__criteria .group-container__item-container input')
            .eq(1)
            .focus()
            .type('321', { force: true })
          journeyBuilder.getConfigPanelSaveBtn.click()
          navigationBar.getJourneys.click()
          journeyBuilder.getModalHeading.should('be.visible').contains('Save journey?')
          cy.url().should('include', '/journeys/playbook/new')
        })

        it('should not display the popup leaving the route after adding and removing the added node', () => {
          cy.dragAndDrop(
            journeyBuilder.dataSourceTimeDelay,
            journeyBuilder.canvasPlaceholderArea,
            journeyBuilder.mockTimeDelayData,
          )
          cy.wait(100)
          journeyBuilder.getDeleteNodeBtn.eq(1).trigger('mouseover').click()
          journeyBuilder.getModalConfirmBtn.click()
          navigationBar.getIntegrations.click()
          cy.url().should('include', '/integrations')
        })

        it('should not display the popup leaving the route without making changes', () => {
          navigationBar.getLogoSVG.click()
          cy.url().should('include', '/home')
        })

        it('should allow changing the route after the user discards his changes', () => {
          cy.dragAndDrop(
            journeyBuilder.dataSourceTimeDelay,
            journeyBuilder.canvasPlaceholderArea,
            journeyBuilder.mockTimeDelayData,
          )

          navigationBar.getJourneys.click()
          cy.url().should('include', '/journeys/playbook/new')

          // close the modal discarding the changes
          journeyBuilder.getModalCancelBtn.click()
          cy.url().should('include', '/journeys')
        })

        it('should change the route and save the changes when is pressed the confirm button', () => {
          cy.intercept(
            {
              method: 'POST',
              url: '*/playbooks',
            },
            { message: 'GG' },
          ).as('savePlaybook')

          cy.dragAndDrop(
            journeyBuilder.dataSourceTimeDelay,
            journeyBuilder.canvasPlaceholderArea,
            journeyBuilder.mockTimeDelayData,
          )
          navigationBar.getJourneys.click()
          cy.url().should('include', '/journeys/playbook/new')

          // close the modal discarding the changes
          journeyBuilder.getModalConfirmBtn.click()
          cy.wait('@savePlaybook').then((interception) => {
            assert.isNotNull(interception.response.body, 'Save request was made')
          })
          cy.url().should('include', '/journeys')
        })
      })
    })
  })
})
