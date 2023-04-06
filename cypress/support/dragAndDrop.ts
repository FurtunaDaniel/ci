interface dragAndDropProps {
  subject: string
  target: string
  object?: {}
  targetPosition?: number
}

const dragAndDrop = ({ subject, target, object = {}, targetPosition = 0 }: dragAndDropProps) => {
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
    .eq(targetPosition)
    .trigger('dragstart', { dataTransfer })
    .trigger('dragover', { dataTransfer })
    .trigger('drop', { dataTransfer })
  log.snapshot('after')
  log.end()
}

Cypress.Commands.add('dragAndDrop', dragAndDrop)
