export class NavigationBar {
  logo = '.logo > a > svg'
  journeys = '.second-menu-item > svg'
  integrations = '.third-menu-item > svg'

  get getLogoSVG() {
    return cy.get(this.logo)
  }

  get getJourneys() {
    return cy.get(this.journeys)
  }

  get getIntegrations() {
    return cy.get(this.integrations)
  }
}
// TODO Daniel: Check with Pete POM vs app action design pattern
export const navigationBar = new NavigationBar()
