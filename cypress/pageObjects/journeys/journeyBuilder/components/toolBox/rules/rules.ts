class Rules {
  actionSource = 'action-source'

  mockIfElseData = { name: 'If / Else', description: 'If / Else', type: 'ifElse', iconName: 'ifElse', shape: 'rhomb' }
  mockWaitForTriggerData = {
    name: 'Wait for trigger',
    description: 'Wait for trigger',
    type: 'waitForTrigger',
    iconName: 'waitForTrigger',
    shape: 'rhomb',
  }
  mockTimeDelayData = {
    name: 'Time delay',
    description: 'Time delay',
    type: 'timeDelay',
    iconName: 'timeDelay',
    shape: 'rhomb',
  }
  mockLoopData = { name: 'Loop', description: 'Loop', type: 'loop', iconName: 'loop', shape: 'rhomb' }
  mockMergeData = {
    name: 'Merge',
    description: 'Merge',
    type: 'merge',
    iconName: 'merge',
    shape: 'rhomb',
  }
  ifElse = {
    data: { name: 'If / Else', description: 'If / Else', type: 'ifElse', iconName: 'ifElse', shape: 'rhomb' },
    locator: `[data-testid="${this.actionSource}-ifElse"]`,
  }

  timeDelay = {
    data: {
      name: 'Time delay',
      description: 'Time delay',
      type: 'timeDelay',
      iconName: 'timeDelay',
      shape: 'rhomb',
    },
    locator: `[data-testid="${this.actionSource}-timeDelay"]`,
  }

  loop = {
    data: { name: 'Loop', description: 'Loop', type: 'loop', iconName: 'loop', shape: 'rhomb' },
    locator: `[data-testid="${this.actionSource}-loop"]`,
  }

  merge = {
    data: {
      name: 'Merge',
      description: 'Merge',
      type: 'merge',
      iconName: 'merge',
      shape: 'rhomb',
    },
    locator: `[data-testid="${this.actionSource}-merge"]`,
  }

  waitForTrigger = {
    data: {
      name: 'Wait for trigger',
      description: 'Wait for trigger',
      type: 'waitForTrigger',
      iconName: 'waitForTrigger',
      shape: 'rhomb',
    },
    locator: `[data-testid="${this.actionSource}-waitForTrigger"]`,
  }

  dataSourceTimeDelay = `[data-testid="${this.actionSource}-${this.mockTimeDelayData.type}"]`
  dataSourceLoop = `[data-testid="${this.actionSource}-${this.mockLoopData.type}"]`
  dataSourceWaitForTrigger = `[data-testid="${this.actionSource}-${this.mockWaitForTriggerData.type}"]`
  dataSourceIfElse = `[data-testid="${this.actionSource}-${this.mockIfElseData.type}"]`
  dataSourceMerge = `[data-testid="${this.actionSource}-${this.mockMergeData.type}"]`
}

export const rules = new Rules()
