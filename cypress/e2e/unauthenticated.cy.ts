describe('Unauthenticated user', () => {
  describe('whenever attempting to navigate to a secured route and not logged in', () => {
    it('should redirect them to the /signin route', () => {
      cy.visit(`${Cypress.env('environmentUrl')}/journeys/playbook/new`)

      cy.url().should('include', '/signin')
      cy.contains(/Sign in/i)
    })
  })
})
