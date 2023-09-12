import { journeyGoalsModal } from 'pageObjects/common/journeyGoalsModal/journeyGoalsModal'
import { navigationBar } from 'pageObjects/common/navigationBar/navigationBar'
import { canvas } from 'pageObjects/journeys/journeyBuilder/components/canvas/canvas'
import { triggerEvent } from 'pageObjects/journeys/journeyBuilder/components/configPanel/actions/triggerEvent/triggerEvent'
import { updateOpportunity } from 'pageObjects/journeys/journeyBuilder/components/configPanel/actions/updateOpportunity/updateOpportunity'
import { ifElse } from 'pageObjects/journeys/journeyBuilder/components/configPanel/rules/ifElse'
import { loop } from 'pageObjects/journeys/journeyBuilder/components/configPanel/rules/loop'
import { merge } from 'pageObjects/journeys/journeyBuilder/components/configPanel/rules/merge'
import { segment } from 'pageObjects/journeys/journeyBuilder/components/configPanel/rules/segment'
import { timeDelay } from 'pageObjects/journeys/journeyBuilder/components/configPanel/rules/timeDelay'
import { deleteNodeModal } from 'pageObjects/journeys/journeyBuilder/components/deleteNodeModal/deleteNodeModal'
import { toolbox } from 'pageObjects/journeys/journeyBuilder/components/toolBox/toolbox'
import { topSection } from 'pageObjects/journeys/journeyBuilder/components/topSection/topSection'

interface AddCriteriaProps {
  platform: string
  object?: string
  field?: string
  groupIndex?: number
}

interface CreateCalculatedDataProps {
  platform?: string
  object?: string
  field?: string
}

interface CheckOperatorAndValue {
  operator: string
  value1: string | number
  value2: string | number
}

class JourneyBuilder {
  // rules
  segment = segment
  ifElse = ifElse
  merge = merge
  loop = loop
  timeDelay = timeDelay
  triggerEvent = triggerEvent

  // actions
  updateOpportunity = updateOpportunity

  // other sections
  canvas = canvas
  deleteNodeModal = deleteNodeModal
  toolbox = toolbox
  topSection = topSection
  journeyGoalsModal = journeyGoalsModal
  navigationBar = navigationBar

  mockJourneyPath = '/journeys/journey/mockId/1'
  // fixtures
  journeyWithErrors = 'JourneyBuilder/journeyWithErrors.json'
  journeyWithoutErrors = 'JourneyBuilder/journeyWithoutErrors.json'
  journeyExecuted = 'JourneyBuilder/journeyExecuted.json'

  // actions that combines more components

  open() {
    cy.visit(`${Cypress.env('environmentUrl')}/journeys/journey/new`)
  }

  dropActionNode(action: string) {
    cy.dragAndDrop({ subject: `[title="${action}"] `, target: this.canvas.canvasPlaceholderArea })
  }

  dropRuleNode(rule: 'ifElse' | 'timeDelay' | 'loop' | 'merge' | 'waitForTrigger', position?: number) {
    cy.dragAndDrop({
      subject: journeyBuilder.toolbox.rules[rule].locator,
      target: journeyBuilder.canvas.canvasPlaceholderArea,
      object: journeyBuilder.toolbox.rules[rule].data,
      ...(position && { targetPosition: position }),
    })
  }

  createMergeScenario(nrOfPotentialMerge = 1) {
    let counter = 0

    for (let i = 0; i < nrOfPotentialMerge; i++) {
      this.canvas.ZoomOut.click()

      cy.dragAndDrop({
        subject: this.toolbox.rules.dataSourceIfElse,
        target: this.canvas.canvasPlaceholderArea,
        object: this.toolbox.rules.mockIfElseData,
      })

      cy.dragAndDrop({
        subject: this.toolbox.rules.dataSourceTimeDelay,
        target: this.canvas.canvasPlaceholderArea,
        object: this.toolbox.rules.mockTimeDelayData,
        targetPosition: 2 + counter,
      })

      counter += 3
    }

    cy.dragAndDrop({
      subject: this.toolbox.rules.dataSourceMerge,
      target: this.canvas.canvasPlaceholderArea,
      object: this.toolbox.rules.mockMergeData,
      targetPosition: nrOfPotentialMerge,
    })
  }

  mergeBranches(nrOfBrnahcesToBeMerged = 1) {
    this.canvas.NodeMerge.click()
    cy.get(this.canvas.zoomOut)
    for (let index = 0; index < nrOfBrnahcesToBeMerged; index++) {
      this.canvas.ActivateMergeSelection.eq(index).click()
      this.canvas.NodeTimeDelay.eq(0).click()
      this.canvas.NodeMerge.click()
      cy.get(this.canvas.zoomOut)

      if (index + 1 === nrOfBrnahcesToBeMerged) {
        this.merge.SaveBtn.click()
        break
      } else {
        this.merge.AddBranchBtn.click()
      }
    }
  }

  openMockJourney() {
    cy.visit(`${Cypress.env('environmentUrl')}${this.mockJourneyPath}`)
  }

  addStringOperatorsFields(fieldName: string) {
    cy.log('Start adding string operators')
    Object.keys(this.segment.STRING_OPERATORS).forEach((operator) => {
      this.segment.dragAndDropField(fieldName, 0)

      const stringOperator = this.segment.STRING_OPERATORS[operator]
      this.segment.queryBuilder.select.OperatorPopupContainer.last().contains(stringOperator).click()

      if (this.isMultiValue(stringOperator)) {
        // is multi value select
        this.segment.queryBuilder.multiValueInput.MultiValue.last()
          .click()
          .type(`${this.segment.STRING_1} ${stringOperator}{enter}${this.segment.STRING_2} ${stringOperator}{enter}`)
      } else {
        this.segment.queryBuilder.ItemContainer.last()
          .type(`${this.segment.STRING_OPERATORS[operator]} ${this.segment.STRING_1}`)
          .trigger('focusout')
      }
    })
  }

  addSelectOperatorsFields(fieldName: string) {
    cy.log('Start adding select operators')
    Object.keys(this.segment.SELECT_OPERATORS).forEach((operator, operatorIndex) => {
      this.segment.dragAndDropField(fieldName, 0)

      const currentOperator = this.segment.SELECT_OPERATORS[operator]
      let statusIndex = operatorIndex

      // select the operator
      this.segment.queryBuilder.select.OperatorPopupContainer.last()
        .find(this.segment.queryBuilder.multiValueInput.selectItemOption)
        .contains(currentOperator)
        .click()

      // select 2 options from the drop down
      cy.get(this.segment.queryBuilder.select.selectSearchInput).last().click()
      for (let index = 0; index < 2; index++) {
        this.segment.queryBuilder.select.OperatorPopupContainer.last()
          .find(this.segment.queryBuilder.multiValueInput.selectItemOption)
          .contains(this.segment.sideBar.deliveryStatuses[statusIndex++])
          .click()
      }
    })
  }

  addNumericOperatorsFields(fieldName: string) {
    cy.log('Start adding number operators')
    Object.keys(this.segment.NUMBER_OPERATORS).forEach((operator, operatorIndex) => {
      this.segment.dragAndDropField(fieldName, 0)

      const currentOperator: string = this.segment.NUMBER_OPERATORS[operator]
      this.segment.queryBuilder.select.OperatorPopupContainer.last()
        .find(this.segment.queryBuilder.multiValueInput.selectItemOption)
        .contains(new RegExp(`^${currentOperator}$`))
        .click({ force: true })

      switch (currentOperator) {
        case this.segment.NUMBER_OPERATORS.Between:
          cy.get(this.segment.queryBuilder.numberInput.rangeNumberMin)
            .last()
            .find(this.segment.queryBuilder.numberInput.numericInput)
            .type(this.segment.NUMBER_1, { force: true })
          cy.get(this.segment.queryBuilder.numberInput.rangeNumberMax)
            .last()
            .find(this.segment.queryBuilder.numberInput.numericInput)
            .type(this.segment.NUMBER_2, { force: true })
          break

        case this.segment.NUMBER_OPERATORS.IsOneOf:
        case this.segment.NUMBER_OPERATORS.IsNotOneOf:
          this.segment.queryBuilder.multiValueInput.MultiValue.last()
            .click()
            .type(`${this.segment.NUMBER_1}{enter}${this.segment.NUMBER_2}{enter}`)
          break

        default:
          this.segment.queryBuilder.numberInput.NumericInput.last()
            .click()
            .type(`${this.segment.NUMERIC_PREFIX_VALUE}${operatorIndex}`)
          break
      }
    })
  }

  addDateOperatorsFields(fieldName: string) {
    cy.log('Start adding date operators')
    Object.keys(this.segment.DATE_OPERATORS).forEach((operator, operatorIndex) => {
      this.segment.dragAndDropField(fieldName, 0)

      const currentOperator = this.segment.DATE_OPERATORS[operator]
      this.segment.queryBuilder.select.OperatorPopupContainer.last().contains(currentOperator).click()

      switch (currentOperator) {
        case this.segment.DATE_OPERATORS.Between:
          this.segment.queryBuilder.dateRangePicker.RangeDatePicker.last().click()
          this.segment.queryBuilder.dateRangePicker.RangeDateToday.last().click()
          this.segment.queryBuilder.dateRangePicker.RangeDateToday.last().click()
          break

        case this.segment.DATE_OPERATORS.WithinNext:
        case this.segment.DATE_OPERATORS.WithinLast:
          this.segment.queryBuilder.numberInput.NumericInput.last()
            .click()
            .type(`${this.segment.NUMERIC_PREFIX_VALUE}${operatorIndex}`)
          break

        default:
          this.segment.queryBuilder.datePicker.Datepicker.last().click()
          this.segment.queryBuilder.datePicker.DatePickerPanel.last().contains('Today').click()
          break
      }
    })
  }

  buildSalesforceSegmentCriteria() {
    this.segment.sideBar.DataSourceField.contains('salesforce').click()
    this.segment.sideBar.DataSourceField.contains('Opportunity').click()
    // drop string fields
    this.addStringOperatorsFields(this.segment.sideBar.FIELD_STRING)
    // drop select fields
    this.addSelectOperatorsFields(this.segment.sideBar.FIELD_SELECT)
    // // drop number fields
    this.addNumericOperatorsFields(this.segment.sideBar.FIELD_NUMBER)
    // // drop date fields
    this.addDateOperatorsFields(this.segment.sideBar.FIELD_DATE)
    this.segment.SaveBtn.click()
  }

  checkSalesforceSegmentCriteria() {
    cy.wait(1000)
    // this function depends on buildSalesforceSegmentCriteria tasks
    this.checkStringOperatorsFields(this.segment.sideBar.FIELD_STRING)
    this.checkSelectOperatorsFields(this.segment.sideBar.FIELD_SELECT)
    this.checkNumericOperatorsFields(this.segment.sideBar.FIELD_NUMBER)
    this.checkDateOperatorsFields(this.segment.sideBar.FIELD_DATE)
    this.segment.CloseBtn.click()
  }

  checkStringOperatorsFields(fieldName: string) {
    cy.log('Start checking string operators and values')
    Object.keys(this.segment.STRING_OPERATORS).forEach((operator, operatorIndex) => {
      const currentOperator = this.segment.STRING_OPERATORS[operator]

      this.segment.queryBuilder.GroupContainer.find(this.segment.queryBuilder.criteriaBuilderItemTitle)
        .filter((_index: number, elt: any) => {
          return elt.innerText.match(new RegExp(fieldName))
        })
        .eq(operatorIndex)
        .parent()
        .parent()
        .as('currentGroup')

      cy.get('@currentGroup').find(this.segment.queryBuilder.select.operatorSelect).contains(currentOperator)

      if (this.isMultiValue(currentOperator)) {
        // is multi value select
        ;[this.segment.STRING_1, this.segment.STRING_2].forEach((string) => {
          cy.get('@currentGroup')
            .find(this.segment.queryBuilder.multiValueInput.multiValue)
            .last()
            .find(this.segment.queryBuilder.select.overflowItem)
            .contains(`${string} ${currentOperator}`)
        })
      } else {
        cy.get('@currentGroup')
          .find(this.segment.queryBuilder.itemContainer)
          .last()
          .contains(`${this.segment.STRING_OPERATORS[operator]} ${this.segment.STRING_1}`)
      }
    })
  }

  checkSelectOperatorsFields(fieldName: string) {
    cy.log('Start checking select operators and values')
    Object.keys(this.segment.SELECT_OPERATORS).forEach((operator, operatorsIndex) => {
      const currentOperator = this.segment.SELECT_OPERATORS[operator]
      let statusIndex = operatorsIndex
      this.segment.queryBuilder.GroupContainer.find(this.segment.queryBuilder.criteriaBuilderItemTitle)
        .filter((_index: number, $el: any) => {
          return $el.innerText.match(new RegExp(fieldName))
        })
        .eq(operatorsIndex)
        .parent()
        .parent()
        .as('currentGroup')

      // check the operator
      cy.get('@currentGroup').find(this.segment.queryBuilder.select.operatorSelect).contains(currentOperator)

      // check the value
      cy.get('@currentGroup')
        .find(this.segment.queryBuilder.pickkist.multipleSelect)
        .last()
        .find(this.segment.queryBuilder.select.overflowItem)
        .filter((_index: number, $el: any) => {
          return $el.className.match(/^ant-select-selection-overflow-item$/)
        })
        .each(($selectItem) => {
          cy.wrap($selectItem).contains(`${this.segment.sideBar.deliveryStatuses[statusIndex++]}`)
        })
    })
  }

  checkNumericOperatorsFields(fieldName: string) {
    cy.log('Start checking number operators and values')
    Object.keys(this.segment.NUMBER_OPERATORS).forEach((operator, operatorsIndex) => {
      const currentOperator = this.segment.NUMBER_OPERATORS[operator]

      this.segment.queryBuilder.GroupContainer.find(this.segment.queryBuilder.criteriaBuilderItemTitle)
        .filter((_index: number, $el: any) => {
          return $el.innerText.match(new RegExp(fieldName))
        })
        .eq(operatorsIndex)
        .parent()
        .parent()
        .as('currentGroup')

      cy.get('@currentGroup').find(this.segment.queryBuilder.select.operatorSelect).contains(currentOperator)
      switch (currentOperator) {
        case this.segment.NUMBER_OPERATORS.Between:
          cy.get('@currentGroup')
            .find(this.segment.queryBuilder.numberInput.rangeNumberMin)
            .last()
            .find(this.segment.queryBuilder.numberInput.numericInput)
            .should('have.value', this.segment.NUMBER_1)

          cy.get('@currentGroup')
            .find(this.segment.queryBuilder.numberInput.rangeNumberMax)
            .last()
            .find(this.segment.queryBuilder.numberInput.numericInput)
            .should('have.value', this.segment.NUMBER_2)
          break

        case this.segment.STRING_OPERATORS.IsOneOf:
        case this.segment.STRING_OPERATORS.IsNotOneOf:
          ;[this.segment.NUMBER_1, this.segment.NUMBER_1].forEach((number) => {
            cy.get('@currentGroup')
              .find(this.segment.queryBuilder.multiValueInput.multiValue)
              .last()
              .find(this.segment.queryBuilder.select.overflowItem)
              .filter((_index: number, $el: any) => {
                return $el.className.match(/^ant-select-selection-overflow-item$/)
              })
              .contains(`${number}`)
          })

          break

        default:
          cy.get('@currentGroup')
            .find(this.segment.queryBuilder.numberInput.numericInput)
            .should('have.value', `${this.segment.NUMERIC_PREFIX_VALUE}${operatorsIndex}`)

          break
      }
    })
  }

  checkDateOperatorsFields(fieldName: string) {
    cy.log('Start checking date operators and values')
    Object.keys(this.segment.DATE_OPERATORS).forEach((operator, operatorsIndex) => {
      const currentOperator = this.segment.DATE_OPERATORS[operator]
      this.segment.queryBuilder.GroupContainer.find(this.segment.queryBuilder.criteriaBuilderItemTitle)
        .filter((_index: number, $el: any) => {
          return $el.innerText.match(new RegExp(fieldName))
        })
        .eq(operatorsIndex)
        .parent()
        .parent()
        .as('currentGroup')

      cy.get('@currentGroup').find(this.segment.queryBuilder.select.operatorSelect).contains(currentOperator)

      const currentDate = new Date().toISOString().substring(0, 10)
      switch (currentOperator) {
        case this.segment.DATE_OPERATORS.Between:
          this.segment.queryBuilder.dateRangePicker.RangeDatePicker.find(
            this.segment.queryBuilder.dateRangePicker.dateFieldStartDate,
          ).should('have.value', currentDate)
          this.segment.queryBuilder.dateRangePicker.RangeDatePicker.find(
            this.segment.queryBuilder.dateRangePicker.dateFieldEndDate,
          ).should('have.value', currentDate)

          break

        case this.segment.DATE_OPERATORS.WithinNext:
        case this.segment.DATE_OPERATORS.WithinLast:
          cy.get('@currentGroup')
            .find(this.segment.queryBuilder.numberInput.numericInput)
            .should('have.value', `${this.segment.NUMERIC_PREFIX_VALUE}${operatorsIndex}`)

          break

        default:
          cy.get('@currentGroup')
            .find(this.segment.queryBuilder.itemContainer)
            .find(this.segment.queryBuilder.datePicker.dateFieldSelectDate)
            .should('have.value', currentDate)

          break
      }
    })
  }

  drillInPlatform(platform: string = 'salesforce') {
    this.segment.sideBar.DataSourceItems.contains(platform).click()
    return this
  }

  drillInObject(oject: string = 'Case') {
    this.segment.sideBar.DataSourceItems.contains(oject).click()
    return this
  }

  getField(field: string = 'Account ID') {
    return segment.sideBar.DataSourceItems.contains(field)
  }

  createCalculatedData({ platform, object, field }: CreateCalculatedDataProps) {
    this.drillInPlatform(platform).drillInObject(object)

    this.segment.aggregation.clickOnMenuItemFunction(field)

    this.segment.aggregation.ContinueBtn.click()
  }

  isMultiValue(operator) {
    const multiValueOperators = [this.segment.STRING_OPERATORS.IsOneOf, this.segment.STRING_OPERATORS.IsNotOneOf]
    return multiValueOperators.includes(operator)
  }

  addCriteria({ platform, object, field, groupIndex = 0 }: AddCriteriaProps) {
    this.segment.sideBar.DataSourceItems.contains(platform)
      .click()
      .then(() => {
        if (!object) {
          return
        }
        this.segment.sideBar.DataSourceItems.contains(object).click()
      })
    if (!field) {
      return
    }
    this.segment.sideBar.DataSourceItems.contains(field).trigger('dragstart')
    this.segment.queryBuilder.CriteriaContainer.eq(groupIndex)
      .trigger('dragenter', { force: true })
      .trigger('dragover', { force: true })
      .trigger('drop', { force: true })

    this.segment.queryBuilder.GroupContainer.eq(groupIndex).trigger('dragend', { force: true })
  }

  dropMinumumRequiredForMerge() {
    this.dropRuleNode('ifElse')
    this.dropRuleNode('timeDelay', 2)
    this.dropRuleNode('merge', 1)
  }

  addRecordCriteriaLocatorRequirements() {
    this.toolbox.actions.getMenuAction('salesforce').click()
    this.dropActionNode('Update Opportunity')
    this.canvas.JourneyNode.should('have.length', 2)
    // TODO: fix this

    this.canvas.JourneyNode.filter((_index: number, elt: any) => {
      return elt.innerText.match(/^Update Opportunity$/)
    })
      .eq(0)
      .click()
    this.updateOpportunity.AddCriteria.first().click()
  }

  checkOperatorAndValue({ operator, value1, value2 }: CheckOperatorAndValue) {
    this.segment.queryBuilder.select.OperatorSelect.click().then(() => {
      this.segment.queryBuilder.select.OperatorPopupContainer.contains(operator).click({ force: true })
      this.segment.queryBuilder.multiValueInput.MultiValue.click().type(`${value1}{enter}${value2}{enter}`)
      this.segment.queryBuilder.dynamicInput.OpenPopoverBtn.should('not.exist')
      this.segment.queryBuilder.multiValueInput.Tag.should('have.length', 3)
      // length 3 because there is a "+0" hidden because of UI kit reasons...
      this.segment.queryBuilder.multiValueInput.Tag.eq(0).should('have.text', value1)
      this.segment.queryBuilder.multiValueInput.Tag.eq(1).should('have.text', value2)
      // remove the last tag using the tag button
      this.segment.queryBuilder.multiValueInput.RemoveTag.last().click()
      this.segment.queryBuilder.multiValueInput.Tag.eq(0).should('have.text', value1)
      this.segment.queryBuilder.multiValueInput.Tag.contains(value2).should('not.exist')
      this.segment.queryBuilder.multiValueInput.MultiValue.click().type(`${value2}{enter}`)
      // remove the first tag using the tag button
      this.segment.queryBuilder.multiValueInput.RemoveTag.first().click()
      this.segment.queryBuilder.multiValueInput.Tag.eq(0).should('have.text', value2)
      this.segment.queryBuilder.multiValueInput.MultiValue.click()
      // delete option using the drop down
      this.segment.queryBuilder.multiValueInput.MultiValuePopup.contains(value2).click()
      this.segment.queryBuilder.multiValueInput.Tag.should('have.length', 0)
    })
  }
}

export const journeyBuilder = new JourneyBuilder()
