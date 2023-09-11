class AccountSettings {
  accountSettingsProfileHeading = '[data-testid="heading"]'
  accountSettingsNavigationUsers = 'Users'
  accountSettingsUsersTableRows = 'tr'

  get AccountSettingsProfileHeading() {
    return cy.get(this.accountSettingsProfileHeading)
  }

  get AccountSettingsNavigation() {
    return cy.get('li').contains(this.accountSettingsNavigationUsers)
  }

  get AccountSettingsUsersTable() {
    return cy.get(this.accountSettingsUsersTableRows)
  }
}

export const accountSettings = new AccountSettings()
