import ConfigPanel from 'pageObjects/journeys/journeyBuilder/components/configPanel/configPanel'
import { queryBuilder } from 'pageObjects/journeys/journeyBuilder/components/configPanel/queryBuilder/queryBuilder'
import { sidebar } from 'pageObjects/journeys/journeyBuilder/components/configPanel/sideBar/sideBar'

abstract class PanelWithBuilder extends ConfigPanel {
  queryBuilder = queryBuilder
  sideBar = sidebar

  STRING_1 = 'str 1'
  STRING_2 = 'str 2'
  NUMBER_1 = '987'
  NUMBER_2 = '654'
  NUMERIC_PREFIX_VALUE = '100'

  // input operators
  STRING_OPERATORS = {
    Contains: 'Contains',
    Equals: 'Equals',
    NotContains: 'Not contains',
    IsOneOf: 'Is one of',
    IsNotOneOf: 'Is not one of',
  }

  SELECT_OPERATORS = {
    Include: 'Include',
    NotInclude: 'Not include',
  }

  NUMBER_OPERATORS = {
    LessThan: '< Less than',
    EqualsOrLessThan: '<= Equals or less than',
    Equals: '= Equals',
    EqualsOrGreaterThan: '>= Equals or greater than',
    GreaterThan: '> Greater than',
    Between: '<> Between',
    IsOneOf: 'Is one of',
    IsNotOneOf: 'Is not one of',
  }

  DATE_OPERATORS = {
    Equals: 'Is on',
    EqualsOrLessThan: 'Is before/on',
    EqualsOrGreaterThan: 'Is after/on',
    Between: 'Between',
    WithinNext: 'Within the next # of days',
    WithinLast: 'Within the last # of days',
  }

  dragAndDropField(fieldName: string, group: number) {
    this.sideBar.DataSourceField.contains(fieldName).trigger('dragstart')
    this.queryBuilder.CriteriaContainer.eq(group)
      .trigger('dragenter', { force: true })
      .trigger('dragover', { force: true })
      .trigger('drop', { force: true })

    this.queryBuilder.GroupContainer.eq(group).trigger('dragend', { force: true })
  }

  addStringOperatorsFields(fieldName: string) {
    cy.log('Start adding string operators')
    Object.keys(this.STRING_OPERATORS).forEach((operator) => {
      this.dragAndDropField(fieldName, 0)

      const stringOperator = this.STRING_OPERATORS[operator]
      this.queryBuilder.select.OperatorPopupContainer.last().contains(stringOperator).click()

      if (this.isMultiValue(stringOperator)) {
        // is multi value select
        this.queryBuilder.multiValueInput.MultiValue.last()
          .click()
          .type(`${this.STRING_1} ${stringOperator}{enter}${this.STRING_2} ${stringOperator}{enter}`)
      } else {
        this.queryBuilder.ItemContainer.last()
          .type(`${this.STRING_OPERATORS[operator]} ${this.STRING_1}`)
          .trigger('focusout')
      }
    })
  }

  isMultiValue(operator) {
    const multiValueOperators = [this.STRING_OPERATORS.IsOneOf, this.STRING_OPERATORS.IsNotOneOf]
    return multiValueOperators.includes(operator)
  }
}

export default PanelWithBuilder
