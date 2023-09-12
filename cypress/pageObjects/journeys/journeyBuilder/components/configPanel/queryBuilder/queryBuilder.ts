import { datePicker } from 'pageObjects/journeys/journeyBuilder/components/configPanel/inputs/datePicker/datePicker'
import { dateRangePicker } from 'pageObjects/journeys/journeyBuilder/components/configPanel/inputs/datePicker/rangePicker/rangePicker'
import { dynamicInput } from 'pageObjects/journeys/journeyBuilder/components/configPanel/inputs/dynamicInput/dynamicInput'
import { multiValueInput } from 'pageObjects/journeys/journeyBuilder/components/configPanel/inputs/multiValue/multiValueInput'
import { numberInput } from 'pageObjects/journeys/journeyBuilder/components/configPanel/inputs/number/numberInput'
import { pickkist } from 'pageObjects/journeys/journeyBuilder/components/configPanel/inputs/picklist/picklist'
import { select } from 'pageObjects/journeys/journeyBuilder/components/configPanel/inputs/select/select'
class QueryBuilder {
  select = select
  dynamicInput = dynamicInput
  multiValueInput = multiValueInput
  numberInput = numberInput
  dateRangePicker = dateRangePicker
  datePicker = datePicker
  pickkist = pickkist

  criteriaBuilderItemTitle = '[data-testid="item-title"]'
  criteriaContainer = '[data-testid="segment-builder__criteria"] > div'
  groupContainer = '[data-testid="segment-builder__criteria"] > [data-testid="group-container"]'
  itemContainer = '[data-testid="group-container__item-container__item"]'
  nonStringField = `${this.itemContainer} .ant-picker-input`
  criteriaOperatorOptions = `${select.operatorPopupContainer} ${select.selectOption}`

  get CriteriaBuilderItemTitle() {
    return cy.get(this.criteriaBuilderItemTitle)
  }

  get CriteriaContainer() {
    return cy.get(this.criteriaContainer)
  }

  get GroupContainer() {
    return cy.get(this.groupContainer) //.should('exist')
  }

  get NonStringField() {
    return cy.get(this.nonStringField)
  }

  get ItemContainer() {
    cy.get(this.criteriaContainer).then((element) => {
      if (element.find(`${this.itemContainer} .ant-input`).length > 0) {
        return cy.get(`${this.itemContainer} .ant-input`)
      }
    })

    return cy.get(this.dynamicInput.container)
  }

  get CriteriaOperatorOptions() {
    return cy.get(this.criteriaOperatorOptions)
  }
}

export const queryBuilder = new QueryBuilder()
