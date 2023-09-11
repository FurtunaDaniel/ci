class Integrations {
  integrationCard = '.integrations-main-card'
  integrationCardEditButton = '[data-testid="button-secondary "]'

  get IntegrationCards() {
    return cy.get(this.integrationCard)
  }

  get FirstIntegrationCardEditButton() {
    return cy.get(this.integrationCard).first().get(this.integrationCardEditButton).first()
  }
}

export const integrations = new Integrations()
