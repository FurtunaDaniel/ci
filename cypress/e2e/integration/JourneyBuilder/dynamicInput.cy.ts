import { journeyBuilderInterceptors, dynamicInputs } from 'support/JourneyBuilder'
import { journeyBuilder } from 'support/JourneyBuilder.page'

context('Dynamic inputs from data source popover', () => {
  beforeEach(() => {
    cy.viewport(1920, 1080)
    cy.loginByCognitoApi(Cypress.env('TEST_AUTOMATION_USERNAME'), Cypress.env('TEST_AUTOMATION_PASSWORD'))
    journeyBuilderInterceptors.salesforceOpportunity()
    journeyBuilderInterceptors.getPlatforms()
    journeyBuilder.open()
    dynamicInputs.SegmentNode.click()
  })

  describe('display the view list in the popover', () => {
    beforeEach(() => {
      dynamicInputs.addCriteria({ platformIndex: 0, objectIndex: 2, fieldIndex: 1, groupIndex: 0 })
      dynamicInputs.OpenPopoverBtn.click()
    })

    it('should the popover when user clisk on lighting button', () => {
      dynamicInputs.PopoverMenu.should('be.visible')
    })

    it('should display the list of platforms available and no breadcrumbs', () => {
      dynamicInputs.Breadcrumb.children('ol').children().should('not.have.length')
      dynamicInputs.MenuItem.should('be.visible')
    })

    it('should select the first platform and display the objects available along with the breadcrumbs', () => {
      dynamicInputs.MenuItem.eq(0).click()
      dynamicInputs.Breadcrumb.children('ol').children().should('have.length', 2)
    })

    it('should select the first platform and the first object and display the fields available along with the breadcrumbs', () => {
      dynamicInputs.selectMenuItems()

      dynamicInputs.Breadcrumb.children('ol').children().should('have.length', 3)
    })

    it('should select the third field from the list', () => {
      dynamicInputs.selectMenuItems()
      dynamicInputs.MenuItem.eq(3).click()
      dynamicInputs.MenuItem.eq(3).find(dynamicInputs.selectedField)
      dynamicInputs.SelectedField.should('be.visible')
    })
  })

  describe('fields with the string types', () => {
    beforeEach(() => {
      dynamicInputs.addCriteria({ platformIndex: 0, objectIndex: 2, fieldIndex: 1, groupIndex: 0 })
      dynamicInputs.OpenPopoverBtn.click()
    })

    it('should display the tag element into the input container', () => {
      dynamicInputs.selectMenuItems()
      dynamicInputs.MenuItem.eq(3).click()
      dynamicInputs.DynamicInputContainer.should('be.visible')
      dynamicInputs.DynamicInputContainer.find(dynamicInputs.tagField)
      dynamicInputs.TagField.should('be.visible')
    })

    it('should be display the selected field name into the tag', () => {
      dynamicInputs.selectMenuItems()
      dynamicInputs.MenuItem.eq(4).click()
      dynamicInputs.getItemName(4).then((element) => {
        dynamicInputs.TagFieldName.should('have.text', element[0].innerText)
      })
    })

    it('should not have different text between tag and selected field', () => {
      dynamicInputs.selectMenuItems()
      dynamicInputs.MenuItem.eq(4).click()
      dynamicInputs.getItemName(4).then((_) => {
        dynamicInputs.TagFieldName.should('not.have.text', 'test')
      })
    })

    it('should change the tag name when user selects other field', () => {
      dynamicInputs.selectMenuItems()
      // click on a field
      dynamicInputs.MenuItem.eq(2).click()
      dynamicInputs.getItemName(2).then((element) => {
        dynamicInputs.TagFieldName.should('have.text', element[0].innerText)
      })
      // click on other field
      dynamicInputs.MenuItem.eq(5).click()
      dynamicInputs.getItemName(5).then((element) => {
        dynamicInputs.TagFieldName.should('have.text', element[0].innerText)
      })
    })

    it('should add some text and then select a tag field', () => {
      dynamicInputs.DynamicInputContainer.type('test123', { timeout: 1000 })
      dynamicInputs.selectMenuItems()
      dynamicInputs.MenuItem.eq(0).click()
      dynamicInputs.getItemName(0).then((element) => {
        dynamicInputs.DynamicInputContainer.should('contain.text', `test123${element[0].innerText}`)
      })
    })

    it('should remove the tag', () => {
      dynamicInputs.selectMenuItems()
      dynamicInputs.MenuItem.eq(1).click()
      dynamicInputs.RemoveTag.click()
      dynamicInputs.TagField.should('not.exist')
    })

    it('should add some text and then remove the tag', () => {
      dynamicInputs.DynamicInputContainer.type('qwerty', { timeout: 1000 })
      dynamicInputs.selectMenuItems()
      dynamicInputs.MenuItem.eq(1).click()
      dynamicInputs.RemoveTag.click()
      dynamicInputs.DynamicInputContainer.should('contain.text', 'qwerty')
    })

    it('should add some text and add tag on a specific position', () => {
      dynamicInputs.DynamicInputContainer.type('wwyy', { timeout: 1000 }).type('{leftarrow}{leftarrow}')
      dynamicInputs.selectMenuItems()
      dynamicInputs.MenuItem.eq(2).click()
      dynamicInputs.getItemName(2).then((element) => {
        dynamicInputs.DynamicInputContainer.should('contain.text', `ww${element[0].innerText}yy`)
      })
    })

    it('should add some text and a tag then remove the tag within the static text', () => {
      dynamicInputs.DynamicInputContainer.type('qzxc', { timeout: 1000 }).type('{leftarrow}{leftarrow}')
      dynamicInputs.selectMenuItems()
      dynamicInputs.MenuItem.eq(4).click()
      dynamicInputs.getItemName(4).then((element) => {
        dynamicInputs.DynamicInputContainer.should('contain.text', `qz${element[0].innerText}xc`)
      })
      dynamicInputs.RemoveTag.click()
      dynamicInputs.DynamicInputContainer.should('contain.text', `qzxc`)
    })
  })

  describe('fields with the non string types ', () => {
    beforeEach(() => {
      dynamicInputs.addCriteria({ platformIndex: 0, objectIndex: 2, fieldIndex: 6, groupIndex: 0 })
      dynamicInputs.OpenPopoverBtn.click()
    })

    it('should display the static input if there is no dynamic input selected', () => {
      dynamicInputs.NonStringField.should('be.visible')
    })

    it('should hide the static input after selecting a dynamic field', () => {
      dynamicInputs.selectMenuItems()
      dynamicInputs.MenuItem.eq(1).click()
      dynamicInputs.NonStringField.should('not.exist')
    })

    it('should display the dynamic input container after selecting a dynamic field', () => {
      dynamicInputs.selectMenuItems()
      dynamicInputs.MenuItem.eq(1).click()
      dynamicInputs.DynamicInputContainer.should('be.visible')
    })

    it('should display the static input after removing the tag', () => {
      dynamicInputs.selectMenuItems()
      dynamicInputs.MenuItem.eq(1).click()
      dynamicInputs.DynamicInputContainer.should('be.visible')
      dynamicInputs.RemoveTag.click()
      dynamicInputs.NonStringField.should('be.visible')
    })
  })

  describe('search for available opions', () => {
    beforeEach(() => {
      dynamicInputs.addCriteria({ platformIndex: 0, objectIndex: 2, fieldIndex: 1, groupIndex: 0 })
      dynamicInputs.OpenPopoverBtn.click()
    })

    it('should display the available options after typing "id"', () => {
      journeyBuilderInterceptors.searchMetadataId()

      dynamicInputs.SearchInput.type('id')
      dynamicInputs.BtnSearch.click()
      cy.wait('@searchMetadataId').then(() => {
        dynamicInputs.SearchItem.eq(0).should('be.visible')
      })
    })

    it('should select an option of type field from the list', () => {
      journeyBuilderInterceptors.searchMetadataId()

      dynamicInputs.SearchInput.type('id')
      dynamicInputs.BtnSearch.click()
      cy.wait('@searchMetadataId').then(() => {
        dynamicInputs.SearchItem.eq(0).click()
        dynamicInputs.SearchItem.eq(0).find(dynamicInputs.selectedField)
        dynamicInputs.SelectedField.should('be.visible')
      })
    })

    it('should select an option of type object from the list an display the list of fileds', () => {
      journeyBuilderInterceptors.searchMetadataDat()

      dynamicInputs.SearchInput.type('dat')
      dynamicInputs.BtnSearch.click()
      cy.wait('@searchMetadataDat').then(() => {
        dynamicInputs.SearchItem.eq(1).click()
        dynamicInputs.SearchItem.should('not.exist')
      })
    })

    it('should select an option of type object from the list and empty the search input', () => {
      journeyBuilderInterceptors.searchMetadataDat()

      dynamicInputs.SearchInput.type('dat')
      dynamicInputs.BtnSearch.click()
      cy.wait('@searchMetadataDat').then(() => {
        dynamicInputs.SearchItem.eq(1).click()
        dynamicInputs.SearchInput.should('be.empty')
      })
    })

    it('should display empty list warning', () => {
      journeyBuilderInterceptors.searchMetadataEmptyData()

      dynamicInputs.SearchInput.type('wwwwww')
      dynamicInputs.BtnSearch.click()
      dynamicInputs.EmptyList.should('be.visible')
    })

    it("shouldn't display empty list warning when there are elements in the list", () => {
      dynamicInputs.SearchInput.type('id')
      dynamicInputs.BtnSearch.click()
      dynamicInputs.EmptyList.should('not.exist')
    })
  })
})
