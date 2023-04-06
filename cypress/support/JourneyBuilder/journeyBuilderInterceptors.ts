class JourneyBuilderInterceptors {
  salesforceOpportunity() {
    cy.intercept(
      {
        method: 'GET',
        url: '/v1/core/metadata/platforms/salesforce/objects/Opportunity/fields/solutionInstanceId/**',
      },
      {
        data: [
          {
            key: 'AccountId',
            name: 'Account ID',
            type: 'reference',
            required: false,
            updateable: true,
            createable: true,
          },
          {
            key: 'Name',
            name: 'Name',
            type: 'string',
            required: true,
            updateable: true,
            createable: true,
          },
          {
            key: 'M_OpportunitySubcategory__c',
            name: '_OpportunitySubcategory',
            type: 'string',
            required: false,
            updateable: true,
            createable: true,
          },
          {
            key: 'Description',
            name: 'Description',
            type: 'textarea',
            required: false,
            updateable: true,
            createable: true,
          },

          {
            key: 'OrderNumber__c',
            name: 'Order Number',
            type: 'string',
            required: false,
            updateable: true,
            createable: true,
          },
          {
            key: 'M_InstancePriceLimit__c',
            name: '_InstancePriceLimit',
            type: 'double',
            required: false,
            updateable: true,
            createable: true,
          },
          {
            key: 'LastModifiedDate',
            name: 'Last Modified Date',
            type: 'datetime',
            required: true,
            updateable: false,
            createable: false,
          },
        ],
      },
    ).as('getSalesforceOpportunity')
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
      {
        data: [
          {
            order: [
              {
                key: 'salesforce',
                name: 'salesforce',
              },
              {
                key: 'Account',
                name: 'Account',
              },
              {
                key: 'OwnerId',
                name: 'Owner ID',
                type: 'reference',
              },
            ],
            type: 'field',
          },
          {
            order: [
              {
                key: 'salesforce',
                name: 'salesforce',
              },
              {
                key: 'Account',
                name: 'Account',
              },
              {
                key: 'MasterRecordId',
                name: 'Master Record ID',
                type: 'reference',
              },
            ],
            type: 'field',
          },
          {
            order: [
              {
                key: 'zendesk',
                name: 'zendesk',
              },
              {
                key: 'Organization',
                name: 'Organization',
              },
              {
                key: 'Id',
                name: 'Id',
                type: 'integer',
              },
            ],
            type: 'field',
          },
        ],
      },
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
      {
        data: [
          {
            order: [
              {
                key: 'salesforce',
                name: 'salesforce',
              },
              {
                key: 'Account',
                name: 'Account',
              },
              {
                key: 'url_data_type_field__c',
                name: 'url_data_type_field',
                type: 'url',
              },
            ],
            type: 'field',
          },
          {
            order: [
              {
                key: 'gainsight',
                name: 'gainsight',
              },
              {
                key: 'Company',
                name: 'Company',
              },
              {
                key: 'Modified Date',
                name: 'Modified Date',
              },
            ],
            type: 'object',
          },
        ],
      },
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

  getPlatforms() {
    cy.intercept(
      {
        method: 'GET',
        url: '**/platforms',
      },
      {
        data: [
          {
            name: 'salesforce',
            connections: [
              {
                name: "mvl's Salesforce account - dev- 02/06 - 3",
                date: 1675735743476,
                solutionInstanceId: '804f47c3-eade-4671-9418-68fdd4564977',
              },
            ],
          },
          {
            name: 'gainsight',
            connections: [
              {
                name: 'DRO Gainsight Account 1',
                date: 1672760299862,
                solutionInstanceId: 'fb41a3b6-6f41-4aca-9e03-a1f2f565d586',
              },
            ],
          },
          {
            name: 'zendesk',
            connections: [
              {
                name: "mvl's Zendesk account 3",
                date: 1677724061034,
                solutionInstanceId: '901f0c53-ffc8-444c-b174-8d54adb97c36',
              },
            ],
          },

          {
            name: 'marketo',
            connections: [
              {
                name: "mvl's Marketo account 3",
                date: 1677170776319,
                solutionInstanceId: 'a06e851c-d991-4296-a05c-eb65ae97237c',
              },
            ],
          },
        ],
      },
    ).as('getPlatforms')
  }
}

export const journeyBuilderInterceptors = new JourneyBuilderInterceptors()
