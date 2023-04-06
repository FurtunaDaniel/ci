export class NavigationBar {
  logo = '.logo > a > svg'
  dashboard = '.first-menu-item > svg'
  journeys = '.second-menu-item > svg'
  integrations = '.third-menu-item > svg'
  userProfile = '.bottom__profile-user-info'
  userProfileAccountSettings = '#account-settings-button'
  userProfileLogout = '#sign-out-button'

  get getLogoSVG() {
    return cy.get(this.logo)
  }

  get Dashboard() {
    return cy.get(this.dashboard)
  }

  get getJourneys() {
    return cy.get(this.journeys)
  }

  get getIntegrations() {
    return cy.get(this.integrations)
  }

  get UserProfile() {
    return cy.get(this.userProfile)
  }

  get AccountSettings() {
    return this.UserProfile.trigger('mouseover').get(this.userProfileAccountSettings)
  }

  get Logout() {
    return this.UserProfile.trigger('mouseover').get(this.userProfileLogout)
  }
}
// TODO Daniel: Check with Pete POM vs app action design pattern
export const navigationBar = new NavigationBar()
