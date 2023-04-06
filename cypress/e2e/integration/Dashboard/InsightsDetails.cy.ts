import { dashboard } from 'support/Dashboard/Dashboard.page'
import { insightDetails } from 'support/Dashboard/InsightsDetails.page'

describe(' Insights details page', () => {
  beforeEach(() => {
    cy.loginByCognitoApi(Cypress.env('TEST_AUTOMATION_USERNAME'), Cypress.env('TEST_AUTOMATION_PASSWORD'))
    cy.viewport(1920, 1080)
    cy.intercept(
      {
        method: 'GET',
        url: '**/segment/**',
      },
      {
        insights: {
          tableColumns: [
            {
              title: 'Conversion Probability',
              key: 'level',
              type: 'prediction', // or something else that means "low, medium, high"
            },
            {
              title: 'Accounts',
              key: 'accounts',
              type: 'number', // in order to know to display commas eg 1,683
            },
            {
              title: 'Users',
              key: 'users',
              type: 'number',
            },
            {
              title: '7 day increase in avg daily logins',
              key: 'driver1',
              type: 'range',
            },
            {
              title: '7 day increase in session time',
              key: 'driver2',
              type: 'range',
            },
            {
              title: '7 day increase in service usage time',
              key: 'driver3',
              type: 'range',
            },
          ],
          tableRows: [
            {
              id: 1,
              level: 2,
              accounts: 439,
              users: 821,
              driver1: [16, 35],
              driver2: [60, 160],
              driver3: [10, 50],
            },
            {
              id: 2,
              level: 1,
              accounts: 827,
              users: 1683,
              driver1: [9, 15],
              driver2: [2, 59],
              driver3: [-10, 9],
            },
            {
              id: 3,
              level: 0,
              accounts: 186,
              users: 399,
              driver1: [0, 8],
              driver2: [-150, 1],
              driver3: [-100, -11],
            },
          ],
          impact: 'positive',
        },
      },
    ).as('getSegment')
    dashboard.open()
  })

  describe('Insights details navigation', () => {
    it('should display the Insights details page from Dashboard', () => {
      dashboard.clickOnInsightButton(2)
      cy.url().should('include', 'insights/churn/1')
    })

    it('should display the Insights details page directly typing the url', () => {
      insightDetails.openInsight('churn', 3)
      cy.url().should('include', 'insights/churn/3')
    })
  })

  describe('Insights details sections display ', () => {
    beforeEach(() => {
      dashboard.clickOnInsightButton(1)
    })

    it('should display the Insights details page sections', () => {
      insightDetails.getHeading.should('be.visible')
      insightDetails.getDriverList.should('be.visible')
      insightDetails.getSegmentTable.should('be.visible')
      insightDetails.getSegmentAccount.find(insightDetails.heading).should('be.visible')
      insightDetails.getSegmentAccount.find(insightDetails.search).should('be.visible')
      insightDetails.getSegmentAccountTable.should('be.visible')
    })

    it('should be checked the first segment row of Segment table and the checkbox should be checked and disabled', () => {
      insightDetails.getSegmentTableRow(1).should('have.class', 'row--selected')
      insightDetails.getSegmentTableCheckboxRow(1).should('be.checked')
      insightDetails.getSegmentTableCheckboxRow(1).should('be.disabled')
    })

    it('should be checked all the rows for Accounts table initially', () => {
      insightDetails.getSegmentAccountTable
        .find(insightDetails.selectAllCheckbox)
        .should('have.class', 'ant-checkbox-wrapper-checked')
    })
  })

  describe('Insights details Segment table interaction', () => {
    beforeEach(() => {
      dashboard.clickOnInsightButton(1)
    })

    it('should be able to click on the second row making the third row enable to click and keeping the first row unchecked. while unchecking the first row all the other rows should have the right state', () => {
      insightDetails
        .clickOnSegmenRow(2)
        // after clicking on row 2
        .withSegmentRow(3, ($thirdRow) => {
          cy.wrap($thirdRow).should('not.have.class', 'row--selected')
          cy.wrap($thirdRow).find(insightDetails.checkbox).should('not.be.checked')
          cy.wrap($thirdRow).find(insightDetails.checkbox).should('not.be.disabled')
        })
        .withSegmentRow(2, ($secondRow) => {
          cy.wrap($secondRow).should('have.class', 'row--selected')
          cy.wrap($secondRow).find(insightDetails.checkbox).should('be.checked')
          cy.wrap($secondRow).find(insightDetails.checkbox).should('not.be.disabled')
        })
        .withSegmentRow(1, ($firstRow) => {
          cy.wrap($firstRow).should('have.class', 'row--selected')
          cy.wrap($firstRow).find(insightDetails.checkbox).should('be.checked')
          cy.wrap($firstRow).find(insightDetails.checkbox).should('not.be.disabled')
        })
        .clickOnSegmenRow(1)
        // after clicking on row 1
        .withSegmentRow(1, ($firstRow) => {
          cy.wrap($firstRow).should('not.have.class', 'row--selected')
          cy.wrap($firstRow).find(insightDetails.checkbox).should('not.be.checked')
          cy.wrap($firstRow).find(insightDetails.checkbox).should('not.be.disabled')
        })
        .withSegmentRow(2, ($secondRow) => {
          cy.wrap($secondRow).should('have.class', 'row--selected')
          cy.wrap($secondRow).find(insightDetails.checkbox).should('be.checked')
          cy.wrap($secondRow).find(insightDetails.checkbox).should('be.disabled')
        })
        .withSegmentRow(3, ($thirdRow) => {
          cy.wrap($thirdRow).should('not.have.class', 'row--selected')
          cy.wrap($thirdRow).find(insightDetails.checkbox).should('not.be.checked')
          cy.wrap($thirdRow).find(insightDetails.checkbox).should('not.be.disabled')
        })
    })

    it('should update the Accounts table main heading based on the segment selection', () => {
      cy.wait('@getSegment').then(() => {
        // The request response was mocked because depending on what type will be the target the below assets returns false nagative
        insightDetails.getSegmentAccount.find(insightDetails.heading).contains('Accounts in segment (High)')
        insightDetails.clickOnSegmenRow(2)
        insightDetails.getSegmentAccount.find(insightDetails.heading).contains('Accounts in segment (High, Medium)')
        insightDetails.clickOnSegmenRow(1)
        insightDetails.getSegmentAccount.find(insightDetails.heading).contains('Accounts in segment (Medium)')
        insightDetails.clickOnSegmenRow(1)
        insightDetails.getSegmentAccount.find(insightDetails.heading).contains('Accounts in segment (Medium, High)')
        insightDetails.clickOnSegmenRow(3)
        insightDetails.getSegmentAccount
          .find(insightDetails.heading)
          .contains('Accounts in segment (Medium, High, Low)')
        insightDetails.clickOnSegmenRow(3)
        insightDetails.clickOnSegmenRow(2)
        insightDetails.getSegmentAccount.find(insightDetails.heading).contains('Accounts in segment (High)')
        insightDetails.clickOnSegmenRow(1).withSegmentRow(1, ($firstRow) => {
          cy.wrap($firstRow).should('have.class', 'row--selected')
          cy.wrap($firstRow).find(insightDetails.checkbox).should('be.checked')
          cy.wrap($firstRow).find(insightDetails.checkbox).should('be.disabled')
        })
        insightDetails.getSegmentAccount.find(insightDetails.heading).contains('Accounts in segment (High)')
      })
    })
  })
})
