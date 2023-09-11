import { select } from 'pageObjects/journeys/journeyBuilder/components/configPanel/inputs/select/select'
import PanelWithBuilder from 'pageObjects/journeys/journeyBuilder/components/configPanel/rules/common/panelWithBuilder'
class Aggregation extends PanelWithBuilder {
  tabs = '[data-testid="sidebar-tabs"]'
  tabBtn = '.ant-tabs-tab-btn'
  aggregationMenuItem = '[data-testid="aggregation__menu-item"]'
  sidebarMenuTab = '.ant-tabs-nav .ant-tabs-tab'
  continueBtn = '.aggregations-data-modal [data-testid~="continue-btn"]'

  sidebarDataSource = '.ant-tabs .ant-tabs-tabpane-active'
  segmentBuilderCriteria = '[data-testid="segment-builder__criteria"]'
  groupContainer = '[data-testid="group-container"]'
  menu = '[data-testid="menu"]'
  menuItemFunction = '[data-testid="menu__item--function"]'
  dataSourceItems = `${this.sidebarDataSource} ${this.menu} > div`
  continueRemoveBtn = '.remove-aggregations-data-modal [data-testid~="continue-btn"]'
  criteriaInputField = '[data-testid="aggregations-data-modal__inputs--name"] [data-testid="criteria-input-field-text"]'
  breadcrumbTagField = '[data-testid="breadcrumb-tag"] [data-testid="breadcrumb-tag__field"]'
  breadcrumbTagObjectName = '[data-testid="breadcrumb-tag__object"]'
  aggregationModalBody = '[data-testid="aggregations-data__modal-body"]'
  removeAggregationBtn = '[data-testid~="menu__item--remove-action"]'
  removeAggregationModalBody = '[data-testid="aggregations-data__remove-modal-body"]'
  aggregationField = `[data-testid~="aggregations-data-modal__inputs--aggregation"] ${select.selectItem}`
  aggregationLevelField = `[data-testid~="aggregations-data-modal__inputs--aggregation-level"] ${select.selectItem}`
  aggregationDataSourceItem = `${this.aggregationModalBody} [data-testid="segment-sidebar"]`
  aggregationInputContainer = `${this.aggregationModalBody} [data-testid="segment-builder__criteria"] [data-testid="dynamic-field-input"] [data-testid="editable-area"]`
  filtersObject = '[data-testid="filters-object"]'
  editAggregation = '[data-testid~="menu__item--edit-action"]'

  get DataSourceItems() {
    return cy.get(this.dataSourceItems)
  }

  get ContinueBtn() {
    return cy.get(this.continueBtn)
  }

  get ContinueRemoveBtn() {
    return cy.get(this.continueRemoveBtn)
  }

  get AggregationMenuItem() {
    return cy.get(this.aggregationMenuItem)
  }

  get CriteriaGroups() {
    return cy.get(`${this.segmentBuilderCriteria} ${this.groupContainer}`)
  }

  get RemoveAggregationModalBody() {
    return cy.get(this.removeAggregationModalBody)
  }

  get AggregationModalBody() {
    return cy.get(this.aggregationModalBody)
  }

  get CriteriaInputField() {
    return cy.get(this.criteriaInputField)
  }

  get BreadcrumbTagField() {
    return cy.get(this.breadcrumbTagField)
  }

  get BreadcrumbTagObjectName() {
    return cy.get(this.breadcrumbTagObjectName)
  }

  get FiltersObject() {
    return cy.get(this.filtersObject)
  }

  get AggregationField() {
    return cy.get(this.aggregationField)
  }

  get AggregationLevelField() {
    return cy.get(this.aggregationLevelField)
  }

  get AggregationDataSourceItem() {
    return cy.get(this.aggregationDataSourceItem)
  }

  get AggregationInputContainer() {
    return cy.get(this.aggregationInputContainer)
  }

  get AggregationSegmentBuilder() {
    return cy.get(`${this.aggregationModalBody} ${this.segmentBuilderCriteria}`)
  }

  get EditAggregation() {
    return cy.get(this.editAggregation)
  }

  get MenuItemFunction() {
    return cy.get(this.menuItemFunction)
  }

  getSidebarMenuTab(index) {
    return cy.get(this.sidebarMenuTab).eq(index)
  }

  clickOnMenuItemFunction(filedName) {
    this.sideBar.DataSourceItems.contains(filedName)
      .parent()
      .within(($el) => {
        cy.wrap($el).find(this.menuItemFunction).click({ force: true })
      })
  }

  getRemoveAggregationBtn(index) {
    return cy.get(this.removeAggregationBtn).eq(index)
  }

  addCriteria({ fieldIndex, groupIndex }) {
    this.DataSourceItems.eq(fieldIndex).trigger('dragstart')
    cy.get(`${this.segmentBuilderCriteria} > div`)
      .eq(groupIndex)
      .trigger('dragenter', { force: true })
      .trigger('dragover', { force: true })
      .trigger('drop', { force: true })

    cy.get(`${this.segmentBuilderCriteria} ${this.groupContainer}`).eq(groupIndex).trigger('dragend', { force: true })
  }

  dragAndDropField(fieldName: string, groupIndex: number) {
    this.AggregationDataSourceItem.contains(fieldName).trigger('dragstart')
    cy.get(`${this.aggregationModalBody} ${this.segmentBuilderCriteria} > div`)
      .trigger('dragenter', { force: true })
      .trigger('dragover', { force: true })
      .trigger('drop', { force: true })

    this.AggregationSegmentBuilder.eq(groupIndex).trigger('dragend', { force: true })
  }
}

export const aggregation = new Aggregation()
