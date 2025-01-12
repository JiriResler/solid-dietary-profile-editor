import './DietPreferences.css'
import Form from 'react-bootstrap/Form'
import { FormattedMessage } from 'react-intl'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Stack from 'react-bootstrap/Stack'
import Select from 'react-select'
import FormCheckbox from '../FormCheckbox/FormCheckbox'

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

  const SelectComponents = {
    DropdownIndicator: () => null,
    IndicatorSeparator: () => null,
    // Menu: CustomSelectMenu,
  }

  return (
    <>
      <div className="form-group-heading">
        <FormattedMessage
          id="whichDietsDoYouFollow"
          defaultMessage="Which diets do you follow?"
        />
      </div>

      <Row className="ms-auto">
        <Col xs={6} lg={4}>
          <Stack gap={2}>
            {popularDietList.slice(0, 5).map((diet) => {
              return <FormCheckbox label={diet} key={diet} />
            })}
          </Stack>
        </Col>

        <Col xs={6} lg={4}>
          <Stack gap={2}>
            {popularDietList.slice(5, 10).map((diet) => {
              return <FormCheckbox label={diet} key={diet} />
            })}
          </Stack>
        </Col>
      </Row>

      <Select
        className="dietary-preferences-form-select ms-2 mt-4"
        isMulti
        components={SelectComponents}
        options={[
          {
            label: 'Diet 1',
            value: 'diet1',
          },
          {
            label: 'Diet 2',
            value: 'diet2',
          },
          {
            label: 'Diet 3',
            value: 'diet3',
          },
        ]}
        // value={}
        // onChange={}
        aria-label="select-more-diets"
        placeholder={'Search for more diets'}
        styles={{
          control: (baseStyles) => ({
            ...baseStyles,
            minHeight: '50px',
          }),
        }}
      />

      <div className="form-group-heading mt-4">
        <FormattedMessage
          id="calorieTrackingGoal"
          defaultMessage="If you track calories, what is your daily intake goal?"
        />
      </div>

      <Form.Group controlId="calorie-intake-input">
        <Stack direction="horizontal" gap={3} className="ms-2 mt-2">
          <Form.Control className="app-form-control calorieInput" />
          <Form.Label>kCal</Form.Label>
        </Stack>
      </Form.Group>
    </>
  )
}

export default DietPreferences
