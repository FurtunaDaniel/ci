// ***********************************************************
// This example support/e2e.ts is processed and
// loaded automatically before your test files.
//
// This is a great place to put global configuration and
// behavior that modifies Cypress.
//
// You can change the location of this file or turn off
// automatically serving support files with the
// 'supportFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/configuration
// ***********************************************************

// Import commands.js using ES2015 syntax:
import 'support/commands'

Cypress.on('uncaught:exception', (err) => {
  // returning false here prevents Cypress from
  // failing the test
  const conditions = ['ResizeObserver loop limit exceeded', 'ResizeObserver loop completed']

  return !conditions.some((condition) => err.message.includes(condition))
})
declare global {
  interface Window {
    ga: any
    pendo: any
  }
}

Cypress.on('window:before:load', (window) => {
  // Stub Google Analytics
  window.ga = cy.stub().as('ga')
  // Stub Pendo
  window.pendo = cy.stub().as('pendo')
})
