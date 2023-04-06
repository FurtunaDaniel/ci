import { journeyGoalsModal } from 'support/journeyGoalsModal'

context('Journey Goal Modal', () => {
  beforeEach(() => {
    cy.viewport(1920, 1080)
    cy.loginByCognitoApi(Cypress.env('TEST_AUTOMATION_USERNAME'), Cypress.env('TEST_AUTOMATION_PASSWORD'))
    journeyGoalsModal.open()
  })

  describe('use modal buttons', () => {
    it('should display the journey goal modal', () => {
      journeyGoalsModal.JourneyGoalBody.should('be.visible')
    })

    it('should close the journey goal modal', () => {
      journeyGoalsModal.CloseBtn.click()
      journeyGoalsModal.JourneyGoalBody.should('not.be.visible')
    })

    it('should cancel the journey goal modal', () => {
      journeyGoalsModal.CancelBtn.click()
      journeyGoalsModal.JourneyGoalBody.should('not.be.visible')
    })

    it('should display an error message when the journey name is empty', () => {
      journeyGoalsModal.ContinueBtn.click()
      journeyGoalsModal.JourneyNameError.should('be.visible')
    })

    it('should redirect the user to the journey page', () => {
      journeyGoalsModal.JourneyNameInput.clear().type('Magnify: Journey Test Name')
      journeyGoalsModal.ContinueBtn.click()
      cy.url().should('eq', `${Cypress.env('environmentUrl')}/journeys/journey/new`)
    })
  })

  describe('journey title and description', () => {
    it('should display the default journey name', () => {
      journeyGoalsModal.JourneyNameInput.should('not.have.value')
    })

    it('should set the journey name to "Magnify: Journey Test Name"', () => {
      journeyGoalsModal.JourneyNameInput.clear().type('Magnify: Journey Test Name')
      journeyGoalsModal.JourneyNameInput.should('have.value', 'Magnify: Journey Test Name')
    })

    it('should display empty description', () => {
      journeyGoalsModal.JourneyNameInput.should('not.have.value')
    })

    it('should set the journey description to "Magnify: Journey Test Name"', () => {
      journeyGoalsModal.JourneyDescriptionInput.clear().type('Accelerate customer adoption')
      journeyGoalsModal.JourneyDescriptionInput.should('have.value', 'Accelerate customer adoption')
    })
  })

  describe('track journey goals', () => {
    it('should not have any goal selected', () => {
      journeyGoalsModal.getGoalContainer(0).should('not.have.class', journeyGoalsModal.activeGoal)
      journeyGoalsModal.getGoalContainer(1).should('not.have.class', journeyGoalsModal.activeGoal)
      journeyGoalsModal.getGoalContainer(2).should('not.have.class', journeyGoalsModal.activeGoal)
    })

    it('should select the first goal', () => {
      journeyGoalsModal.getGoalContainer(0).click()
      journeyGoalsModal.getGoalContainer(0).should('have.class', journeyGoalsModal.activeGoal)
    })

    it('should select the second goal', () => {
      journeyGoalsModal.getGoalContainer(1).click()
      journeyGoalsModal.getGoalContainer(1).should('have.class', journeyGoalsModal.activeGoal)
    })

    it('should unselect an selected goal', () => {
      journeyGoalsModal.getGoalContainer(0).click()
      journeyGoalsModal.getGoalContainer(0).should('have.class', journeyGoalsModal.activeGoal)

      journeyGoalsModal.getGoalContainer(0).click()
      journeyGoalsModal.getGoalContainer(0).should('not.have.class', journeyGoalsModal.activeGoal)
    })

    describe('set goal probability', () => {
      beforeEach(() => {
        journeyGoalsModal.getGoalContainer(0).click()
      })

      it('should have the probability by default "0%"', () => {
        journeyGoalsModal.TrackGoalTarget.should('have.value', '0%')
      })

      it('should increase the probability with 5% on each click on the up arrow', () => {
        journeyGoalsModal.TrackGoalTargetUpArrow.click()
        journeyGoalsModal.TrackGoalTarget.should('have.value', '5%')
      })

      it('should decrease the probability with 5% on each click on the down arrow', () => {
        for (let i = 0; i < 10; i++) {
          journeyGoalsModal.TrackGoalTargetUpArrow.click()
        }
        journeyGoalsModal.TrackGoalTargetDownArrow.click()
        journeyGoalsModal.TrackGoalTarget.should('have.value', '45%')
      })

      it('should type on the probability input "20"', () => {
        journeyGoalsModal.TrackGoalTarget.clear().type('20')
        journeyGoalsModal.TrackGoalTarget.should('have.value', '20%')
      })
    })
  })

  describe('track journey metrics', () => {
    describe('table header', () => {
      it('should display the table headers', () => {
        journeyGoalsModal.MetricsTable.contains('th', 'Select a data field')
        journeyGoalsModal.MetricsTable.contains('th', 'Aggregation')
        journeyGoalsModal.MetricsTable.contains('th', 'Time span')
        journeyGoalsModal.MetricsTable.contains('th', 'Trend')
        journeyGoalsModal.MetricsTable.contains('th', 'Set a target')
      })
    })

    describe('table body', () => {
      it('should display one empty metric by default', () => {
        journeyGoalsModal.MetricTableRow.should('have.length', 1)
      })

      it('should not display the trash can when there is only one table row', () => {
        journeyGoalsModal.DeleteMetricBtn.should('not.exist')
      })

      it('should add one more metric in the table', () => {
        journeyGoalsModal.AddMetricBtn.click()
        journeyGoalsModal.MetricTableRow.should('have.length', 2)
      })

      it('should display the trash can for both rows', () => {
        journeyGoalsModal.AddMetricBtn.click()
        journeyGoalsModal.DeleteMetricBtn.should('have.length', 2)
      })

      it('should hide the "Add metric" button when there are three rows in the table', () => {
        journeyGoalsModal.AddMetricBtn.click().click()
        journeyGoalsModal.AddMetricBtn.should('not.exist')
      })

      it('should display maximum there three rows in the table', () => {
        journeyGoalsModal.AddMetricBtn.click().click()
        journeyGoalsModal.MetricTableRow.should('have.length', 3)
      })
    })

    describe('set journey metrics', () => {
      it('should open the data field popover', () => {
        journeyGoalsModal.getMetricDataFieldContainer(0).click()
        journeyGoalsModal.DataFieldPopover.should('be.visible')
      })

      it('should open the data field popover and select the salesforce opportunity first field', () => {
        cy.intercept('/v1/core/metadata/metadataObject', () => {
          journeyGoalsModal.getMetricDataFieldContainer(0).click()
          journeyGoalsModal.getMenuItem('salesforce').click()
          journeyGoalsModal.getMenuItem('Opportunity').click()
          journeyGoalsModal.getField(0).click()
          journeyGoalsModal.SelectedDataField.should('be.visible')
          journeyGoalsModal.MetricDataFieldPlatform.should('have.attr', 'alt').then((altText) => {
            expect(altText).to.be.equal('salesforce')
          })
        })
      })

      it('should open the data field popover and select the salesforce opportunity first field', () => {
        cy.intercept('/v1/core/metadata/metadataObject', () => {
          journeyGoalsModal.getMetricDataFieldContainer(0).click()
          journeyGoalsModal.getMenuItem('salesforce').click()
          journeyGoalsModal.getMenuItem('Opportunity').click()
          journeyGoalsModal.getField(0).click()
          journeyGoalsModal.getMetricDataFieldContainer(0).children().should('have.length', 2)
        })
      })

      it('should display the aggregation field as disabled if there is not field selected', () => {
        journeyGoalsModal.Aggregation.should('have.class', 'ant-select-disabled')
      })

      it('should display the aggregation field as enabled when there is a field selected', () => {
        cy.intercept('/v1/core/metadata/metadataObject', () => {
          journeyGoalsModal.getMetricDataFieldContainer(0).click()
          journeyGoalsModal.getMenuItem('salesforce').click()
          journeyGoalsModal.getMenuItem('Opportunity').click()
          journeyGoalsModal.getField(0).click()
          journeyGoalsModal.Aggregation.should('not.have.class', 'ant-select-disabled')
        })
      })
    })
  })
})
