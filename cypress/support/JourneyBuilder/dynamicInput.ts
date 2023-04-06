class DynamicInputs {
  popoverMenu = '[data-testid="popover-menu"]'
  openPopoverBtn = '[data-testid="dynamic-field-popup-btn"]'
  segmentNode = '[data-testid="node-1"]'
  sidebarDataSource = '[data-testid="segment-sidebar"]'
  segmentBuilderCriteria = '[data-testid="segment-builder__criteria"]'
  groupContainer = '[data-testid="group-container"]'
  menu = '[data-testid="menu"]'
  menuItem = '[data-testid="menu__item"]'
  itemName = '[data-testid="menu__name"]'
  dataSourceItems = `${this.sidebarDataSource} ${this.menu} > div`
  breadcrumb = '[data-testid="dynamic-inputs__breadcrumb"]'
  breadcrumbItem = '[data-testid="dynamic-inputs__breadcrumb--item"]'
  selectedField = '[data-testid="selected-data-field"]'
  dynamicInputContainer = '[data-testid="editable-area"]'
  tagField = '[data-testid="tag-field"]'
  tagFieldName = '[data-testid="tag-field__name"]'
  removeTag = '[data-testid="tag-field"] [data-testid="remove-btn"]'
  nonStringField = '[data-testid="group-container__item-container__item"] .ant-picker-input'
  searchInput = '[data-testid="search"]'
  searchItem = '[data-testid="search__item"]'
  btnSearch = '[data-testid="btnSearch"]'
  emptyList = '[data-testid="empty-list"]'

  get PopoverMenu() {
    return cy.get(this.popoverMenu)
  }

  get OpenPopoverBtn() {
    return cy.get(this.openPopoverBtn)
  }

  get SegmentNode() {
    return cy.get(this.segmentNode)
  }

  get DataSourceItems() {
    return cy.get(this.dataSourceItems)
  }

  get MenuItem() {
    return cy.get(`${this.popoverMenu} ${this.menuItem}`)
  }

  get Breadcrumb() {
    return cy.get(this.breadcrumb)
  }

  get BreadcrumbItem() {
    return cy.get(this.breadcrumbItem)
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

  get NonStringField() {
    return cy.get(this.nonStringField)
  }

  get SearchItem() {
    return cy.get(this.searchItem)
  }

  get SearchInput() {
    return cy.get(this.searchInput).eq(2)
  }

  get BtnSearch() {
    return cy.get(this.btnSearch)
  }

  get EmptyList() {
    return cy.get(this.emptyList)
  }

  getItemName(index) {
    return cy.get(this.itemName).eq(index)
  }

  selectMenuItems() {
    ;[...Array(2)].forEach((_) => {
      this.MenuItem.eq(0).click()
    })
  }

  addCriteria({ platformIndex, objectIndex, fieldIndex, groupIndex }) {
    this.DataSourceItems.eq(platformIndex)
      .click()
      .then(() => {
        this.DataSourceItems.eq(objectIndex).click()
      })

    this.DataSourceItems.eq(fieldIndex).trigger('dragstart')
    cy.get(`${this.segmentBuilderCriteria} > div`)
      .eq(groupIndex)
      .trigger('dragenter', { force: true })
      .trigger('dragover', { force: true })
      .trigger('drop', { force: true })

    cy.get(`${this.segmentBuilderCriteria} ${this.groupContainer}`).eq(groupIndex).trigger('dragend', { force: true })
  }
}

export const dynamicInputs = new DynamicInputs()
