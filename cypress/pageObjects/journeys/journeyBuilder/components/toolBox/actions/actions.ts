class Actions {
  getMenuAction(platform: string) {
    return cy.get(`[data-menu-id$="${platform}"]`).should('be.visible')
  }
}

export const actions = new Actions()
