import './commands'
import '@testing-library/cypress/add-commands'

// Any additional custom commands can be added here

Cypress.on('uncaught:exception', (err, runnable) => {
  // returning false here prevents Cypress from failing the test
  return false
})
