import ConfigPanel from 'pageObjects/journeys/journeyBuilder/components/configPanel/configPanel'
import { datePicker } from 'pageObjects/journeys/journeyBuilder/components/configPanel/inputs/datePicker/datePicker'
import { dynamicInput } from 'pageObjects/journeys/journeyBuilder/components/configPanel/inputs/dynamicInput/dynamicInput'
import { numberInput } from 'pageObjects/journeys/journeyBuilder/components/configPanel/inputs/number/numberInput'
import { select } from 'pageObjects/journeys/journeyBuilder/components/configPanel/inputs/select/select'
abstract class Action extends ConfigPanel {
  select = select
  dynamicInput = dynamicInput
  datePicker = datePicker
  numberInput = numberInput
}
export default Action
