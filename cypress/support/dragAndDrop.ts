const dragAndDrop = (subject: string, target: string, object = {}) => {
  const dataTransfer = new DataTransfer()
  dataTransfer.setData('application/json', JSON.stringify(object))

  cy.get(subject).first().should('be.visible', { timeout: 20000 })
  const log = Cypress.log({
    name: 'DRAGNDROP',
    message: `Dragging element ${subject} to ${target}`,
    consoleProps: () => {
      return {
        subject: subject,
        target: target,
      }
    },
  })
  log.snapshot('before')

  cy.get(subject).first().trigger('dragstart', { dataTransfer: dataTransfer })
  cy.get(target)
    .trigger('dragstart', { dataTransfer })
    .trigger('dragover', { dataTransfer })
    .trigger('drop', { dataTransfer })
  log.snapshot('after')
  log.end()
}

Cypress.Commands.add('dragAndDrop', dragAndDrop)
