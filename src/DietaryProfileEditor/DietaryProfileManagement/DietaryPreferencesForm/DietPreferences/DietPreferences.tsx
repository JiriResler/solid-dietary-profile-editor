import './DietPreferences.css'
import Form from 'react-bootstrap/Form'
import { FormattedMessage } from 'react-intl'

/**
 * Displays options and collects input from the user about their diet preferences.
 */
const DietPreferences: React.FC = () => {
  const popularDietList = [
    'The Keto Diet',
    'The Mediterranean Diet',
    'The Vegan Diet',
    'Paleo Diet',
    'Intermittent Fasting',
    'Low-Carb Diet',
    'DASH Diet',
    'Atkins Diet',
    'Vegetarian Diet',
    'The Zone Diet',
  ]

  return (
    <Form.Group controlId="selectDietsFormGroup" className="mt-3">
      <Form.Label>
        <div className="form-group-heading">
          <FormattedMessage
            id="whichDietsDoYouFollow"
            defaultMessage="Which diets do you follow?"
          />
        </div>
      </Form.Label>



    </Form.Group>
  )
}

export default DietPreferences
