import { sidebar } from 'pageObjects/journeys/journeyBuilder/components/configPanel/sideBar/sideBar'

class DynamicInput {
  readonly container = '[data-testid="dynamic-field-input"]'
  openPopoverBtn = '[data-testid="dynamic-field-popup-btn"]'
  popoverMenu = '[data-testid="popover-menu"]'
  apiErrorContainer = '[data-testid="api-error-container"]'
  dataSourceContainer = '[data-testid="data-source-container"]'
  selectedField = '[data-testid="selected-data-field"]'
  dynamicInputContainer = '[data-testid="editable-area"]'
  tagField = '[data-testid="tag-field"]'
  tagFieldName = '[data-testid="tag-field__name"]'
  removeTag = '[data-testid="tag-field"] [data-testid="remove-btn"]'
  itemName = '[data-testid="menu__name"]'
  searchInput = `${this.dataSourceContainer} ${sidebar.searchInput}`
  btnSearch = `${this.dataSourceContainer} ${sidebar.btnSearch}`
  emptyList = '[data-testid="empty-list"]'
  searchItem = `${this.dataSourceContainer} ${sidebar.searchItem}`

  get PopoverMenu() {
    return cy.get(this.popoverMenu)
  }

  get OpenPopoverBtn() {
    return cy.get(this.openPopoverBtn)
  }

  get ApiErrorContainer() {
    return cy.get(this.apiErrorContainer)
  }

  get Breadcrumb() {
    return cy.get(this.dataSourceContainer).find(sidebar.breadcrumb)
  }

  get MenuItem() {
    return cy.get(`${this.popoverMenu} ${sidebar.menuItem}`)
  }

  get SelectedField() {
    return cy.get(this.selectedField)
  }

  get DynamicInputContainer() {
    return cy.get(this.dynamicInputContainer)
  }

  get TagField() {
    return cy.get(this.tagField)
  }

  get TagFieldName() {
    return cy.get(this.tagFieldName)
  }

  get RemoveTag() {
    return cy.get(this.removeTag)
  }

  get SearchInput() {
    return cy.get(this.searchInput)
  }

  get SearchItem() {
    return cy.get(this.searchItem)
  }

  get BtnSearch() {
    return cy.get(this.btnSearch)
  }

  get EmptyList() {
    return cy.get(this.emptyList)
  }

  drillInPlatform(platform: string = 'salesforce') {
    this.MenuItem.contains(platform).click()
    return this
  }

  drillInObject(oject: string = 'Case') {
    this.MenuItem.contains(oject).click()
    return this
  }

  getField(field: string = 'Account ID') {
    return this.MenuItem.contains(field)
  }

  selectMenuItems() {
    this.drillInPlatform('salesforce').drillInObject('Account')
  }

  getItemName(index) {
    return cy.get(this.itemName).eq(index)
  }

  getNotFoundDynamicInputsFixture() {
    return cy.fixture('JourneyBuilder/Interceptors/notFoundDynamicInputs.json')
  }

  getBadRequestDynamicInputsFixture() {
    return cy.fixture('JourneyBuilder/Interceptors/badRequestDynamicInputs.json')
  }
}

export const dynamicInput = new DynamicInput()
