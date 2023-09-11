// load the global Cypress types
/// <reference types="cypress" />

// @ts-nocheck

import { Amplify, Auth } from 'aws-amplify'

declare global {
  namespace Cypress {
    interface Chainable {
      loginByCognitoApi: typeof loginByCognitoApi
    }
  }
}

Amplify.configure({
  Auth: {
    region: Cypress.env('region'),
    userPoolId: Cypress.env('userPoolId'),
    userPoolWebClientId: Cypress.env('userPoolWebClientId'),
  },
})

/**
 * This adds the `loginByCognitoApi` command to the root `cy` module
 * Meaning that for any authenticated user flows we want to test, we can simply run this fn
 * In an individual test or in a `beforeEach` block
 */
const loginByCognitoApi = (username, password) => {
  const log = Cypress.log({
    displayName: 'COGNITO LOGIN',
    message: [`🔐 Authenticating | ${username}`],
    autoEnd: false,
  })

  log.snapshot('before')

  const signIn = Auth.signIn({ username, password })

  cy.wrap(signIn, { log: false }).then((cognitoResponse) => {
    const keyPrefixWithUsername = `${cognitoResponse.keyPrefix}.${cognitoResponse.username}`

    window.localStorage.setItem(`${keyPrefixWithUsername}.idToken`, cognitoResponse.signInUserSession.idToken.jwtToken)

    window.localStorage.setItem(
      `${keyPrefixWithUsername}.accessToken`,
      cognitoResponse.signInUserSession.accessToken.jwtToken,
    )

    window.localStorage.setItem(
      `${keyPrefixWithUsername}.refreshToken`,
      cognitoResponse.signInUserSession.refreshToken.token,
    )

    window.localStorage.setItem(`${keyPrefixWithUsername}.clockDrift`, cognitoResponse.signInUserSession.clockDrift)

    window.localStorage.setItem(`${cognitoResponse.keyPrefix}.LastAuthUser`, cognitoResponse.username)

    window.localStorage.setItem('amplify-authenticator-authState', 'signedIn')
    log.snapshot('after')
    log.end()
  })
}

Cypress.Commands.add('loginByCognitoApi', (username, password) => {
  cy.session(username, () => loginByCognitoApi(username, password), {
    validate() {
      cy.visit(`${Cypress.env('environmentUrl')}/`)
      // revalidate our session to make sure we are logged in
      cy.contains('Welcome to Magnify').should('be.visible')
    },
  })
})
