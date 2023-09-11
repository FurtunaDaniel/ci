class JourneyBuilderInterceptors {
  getNotFoundDynamicInputs() {
    cy.intercept('GET', '/v1/core/metadata/dynamicInputs**', (req) => {
      req.reply({
        statusCode: 404,
        fixture: 'JourneyBuilder/Interceptors/notFoundDynamicInputs.json',
      })
    }).as('getNotFoundDynamicInputs')
  }
  getBadRequestDynamicInputs() {
    cy.intercept('GET', '/v1/core/metadata/dynamicInputs**', (req) => {
      req.reply({
        statusCode: 500,
        fixture: 'JourneyBuilder/Interceptors/badRequestDynamicInputs.json',
      })
    }).as('getBadRequestDynamicInputs')
  }
  getSalesforceOpportunityFields() {
    cy.intercept(
      {
        method: 'GET',
        url: '/v1/core/metadata/platforms/salesforce/objects/Opportunity/fields/solutionInstanceId/**',
      },
      { fixture: 'JourneyBuilder/Interceptors/salesforceOpportunityFields.json' },
    ).as('getSalesforceOpportunityFields')
  }

  getFailedSalesforceOpportunityFields() {
    cy.intercept(
      {
        method: 'GET',
        url: '/v1/core/metadata/platforms/salesforce/objects/Opportunity/fields/solutionInstanceId/**',
      },
      { statusCode: 500 },
    ).as('getFailedSalesforceOpportunityFields')
  }

  searchMetadataId() {
    cy.intercept(
      {
        method: 'GET',
        url: '**/searchMetadata?**',
        query: {
          search: 'id',
        },
      },
      { fixture: 'JourneyBuilder/Interceptors/searchMetadataQueryId.json' },
    ).as('searchMetadataId')
  }

  searchMetadataDat() {
    cy.intercept(
      {
        method: 'GET',
        url: '**/searchMetadata?**',
        query: {
          search: 'dat',
        },
      },
      { fixture: 'JourneyBuilder/Interceptors/searchMetadataQueryDat.json' },
    ).as('searchMetadataDat')
  }

  searchMetadataEmptyData() {
    cy.intercept(
      {
        method: 'GET',
        url: '**/searchMetadata?**',
        query: {
          search: 'wwwwww',
        },
      },
      {
        data: [],
      },
    ).as('searchMetadataDat')
  }

  getPlatforms(shouldReturnEmpty?: boolean) {
    cy.intercept('GET', 'v1/core/metadata/platforms', (req) => {
      if (shouldReturnEmpty) {
        req.reply({
          statusCode: 200,
          body: {
            data: [],
          },
        })
      } else {
        req.reply({
          statusCode: 200,
          fixture: 'JourneyBuilder/Interceptors/platforms.json',
        })
      }
    }).as('getPlatforms')
  }

  getSalesforceObjects() {
    cy.intercept(
      {
        method: 'GET',
        url: 'v1/core/metadata/platforms/salesforce/objects/solutionInstanceId/**',
      },
      { fixture: 'JourneyBuilder/Interceptors/salesforceObjects.json' },
    ).as('getSalesforceObjects')
  }

  salesforceObjectsWithDisplayName() {
    cy.intercept(
      {
        method: 'GET',
        url: '/v1/core/metadata/platforms/salesforce/objects/solutionInstanceId/*',
      },
      { fixture: 'JourneyBuilder/Interceptors/salesforceObjectsWithDisplayName.json' },
    ).as('salesforceObjectsWithDisplayName')
  }

  searchMetadataWithDisplayName() {
    cy.intercept(
      {
        method: 'GET',
        url: '**/searchMetadata?**',
        query: {
          search: 'displayName',
        },
      },
      { fixture: 'JourneyBuilder/Interceptors/searchMetadataWithDisplayName.json' },
    ).as('searchMetadataId')
  }
}

export const journeyBuilderInterceptors = new JourneyBuilderInterceptors()
