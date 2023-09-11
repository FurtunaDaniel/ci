class SideBar {
  // search specifics
  searchInput = '[data-testid="search"]'
  btnSearch = '[data-testid="btnSearch"]'
  searchItem = '[data-testid="search__item"]'
  searchName = '[data-testid="search__name"]'
  searchPath = '[data-testid="search__path"]'

  // sidebar generics
  sideMenu = '[data-testid="menu"]'
  sidebarDataSource = '[data-testid="segment-sidebar"]'
  dataSourceItems = `${this.sidebarDataSource} ${this.sideMenu} > div`
  menuItem = '[data-testid="menu__item"]'
  breadcrumb = '[data-testid="breadcrumb"]'
  dataSourceField = '[data-testid="menu__item"]'
  breadcrumbItem = '[data-testid="breadcrumb-item"]'

  FIELD_STRING = 'Account ID'
  FIELD_SELECT = 'Delivery/Installation Status'
  FIELD_NUMBER = 'Amount'
  FIELD_DATE = 'Close Date'
  deliveryStatuses = ['In progress', 'Yet to begin', 'Completed']

  get SearchInput() {
    return cy.get(this.searchInput).eq(1)
  }

  get BtnSearch() {
    return cy.get(this.btnSearch)
  }

  get SearchName() {
    return cy.get(this.searchName)
  }

  get SearchItem() {
    return cy.get(this.searchItem)
  }

  get SearchPath() {
    return cy.get(this.searchPath)
  }

  get SideMenu() {
    return cy.get(this.sideMenu)
  }

  get DataSourceItems() {
    return cy.get(this.dataSourceItems)
  }

  get MenuItem() {
    return cy.get(this.menuItem)
  }

  get Breadcrumb() {
    return cy.get(this.breadcrumb)
  }

  get DataSourceField() {
    return cy.get(this.dataSourceField)
  }

  get BreadcrumbItem() {
    return cy.get(this.breadcrumbItem)
  }
}

export const sidebar = new SideBar()
