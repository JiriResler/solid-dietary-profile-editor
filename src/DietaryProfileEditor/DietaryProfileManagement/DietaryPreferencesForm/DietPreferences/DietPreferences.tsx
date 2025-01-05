import './DietPreferences.css'
import Form from 'react-bootstrap/Form'
import { FormattedMessage } from 'react-intl'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Stack from 'react-bootstrap/Stack'

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

  type DietCheckboxProps = {
    dietName: string
  }

  const DietCheckbox: React.FC<DietCheckboxProps> = ({ dietName }) => {
    const checkboxId = dietName.replace(/\s/g, '-').toLowerCase() + '-checkbox'

    const checkboxInputId = checkboxId + '-input'

    return (
      <Form.Check id={checkboxId}>
        <Form.Check.Input
          className="app-form-control app-form-checkbox"
          id={checkboxInputId}
        />
        <Form.Check.Label
          htmlFor={checkboxInputId}
          className="dietCheckboxLabel"
        >
          {dietName}
        </Form.Check.Label>
      </Form.Check>
    )
  }

  return (
    <Form.Group controlId="selectDietsFormGroup">
      <Form.Label>
        <div className="form-group-heading">
          <FormattedMessage
            id="whichDietsDoYouFollow"
            defaultMessage="Which diets do you follow?"
          />
        </div>
      </Form.Label>

      <Row className="ms-auto">
        <Col xs={6} lg={4}>
          <Stack gap={2}>
            {popularDietList.slice(0, 5).map((diet) => {
              return <DietCheckbox dietName={diet} />
            })}
          </Stack>
        </Col>

        <Col xs={6} lg={4}>
          <Stack gap={2}>
            {popularDietList.slice(5, 10).map((diet) => {
              return <DietCheckbox dietName={diet} />
            })}
          </Stack>
        </Col>
      </Row>
    </Form.Group>
  )
}

export default DietPreferences
