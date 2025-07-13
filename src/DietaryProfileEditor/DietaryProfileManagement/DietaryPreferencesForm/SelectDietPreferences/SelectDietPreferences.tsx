import './SelectDietPreferences.css'
import Form from 'react-bootstrap/Form'
import { FormattedMessage, useIntl } from 'react-intl'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Stack from 'react-bootstrap/Stack'
import Select from 'react-select'
import { SelectComponents } from '../DietaryPreferencesForm'

type SelectDietPreferencesProps = {
  selectedDiets: string[]
  setSelectedDiets: React.Dispatch<React.SetStateAction<string[]>>
}

/**
 * Displays options and collects input from the user about their diet preferencesa and colorie intake goals.
 */
const SelectDietPreferences: React.FC<SelectDietPreferencesProps> = ({
  selectedDiets,
  setSelectedDiets,
}) => {
  const intl = useIntl()

  const dietIriList = {
    vegetarian: 'http://www.wikidata.org/entity/Q83364',
  }

  /**
   * Creates a new array based on whether it already contained the diet IRI or not and sets it to the selected diets state variable.
   */
  function handleDietCheckboxOnChange(dietIri: string) {
    if (selectedDiets.includes(dietIri)) {
      setSelectedDiets(selectedDiets.filter((iri) => iri != dietIri))
    } else {
      setSelectedDiets([...selectedDiets, dietIri])
    }
  }

  return (
    <>
      <div className="form-group-heading">
        <FormattedMessage
          id="whichDietsDoYouFollow"
          defaultMessage="Which diets do you follow?"
        />
      </div>

      <span>Selected diets: {selectedDiets}</span>

      <Row className="ms-auto">
        <Col xs={6} lg={4}>
          <Stack gap={2}>
            <Form.Check id={'vegetarian-diet-checkbox'}>
              <Form.Check.Input
                className="app-form-control app-form-checkbox"
                checked={selectedDiets.includes(dietIriList['vegetarian'])}
                onChange={() =>
                  handleDietCheckboxOnChange(dietIriList['vegetarian'])
                }
              />

              <Form.Check.Label className="ms-2">
                <FormattedMessage
                  id={'vegetarianDiet'}
                  defaultMessage={'Vegetarian'}
                />
              </Form.Check.Label>
            </Form.Check>
          </Stack>
        </Col>

        <Col xs={6} lg={4}>
          <Stack gap={2}></Stack>
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
        placeholder={intl.formatMessage({
          id: 'searchMoreDiets',
          defaultMessage: 'Search for more diets',
        })}
        styles={{
          control: (baseStyles) => ({
            ...baseStyles,
            minHeight: '50px',
          }),
        }}
        menuPlacement="top"
        maxMenuHeight={210}
      />

      <div className="form-group-heading mt-4">
        <FormattedMessage
          id="calorieTrackingGoal"
          defaultMessage="If you track calories, what is your daily intake goal?"
        />
      </div>

      <Form.Group controlId="calorie-intake-input">
        <Stack direction="horizontal" gap={3} className="ms-2 mt-2 pb-2">
          <Form.Control className="app-form-control calorieInput" />
          <Form.Label>kcal</Form.Label>
        </Stack>
      </Form.Group>
    </>
  )
}

export default SelectDietPreferences
