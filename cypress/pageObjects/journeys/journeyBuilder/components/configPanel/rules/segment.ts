import { aggregation } from 'pageObjects/journeys/journeyBuilder/components/configPanel/rules/common/aggregation'
import PanelWithBuilder from 'pageObjects/journeys/journeyBuilder/components/configPanel/rules/common/panelWithBuilder'

class Segment extends PanelWithBuilder {
  aggregation = aggregation
}

export const segment = new Segment()
