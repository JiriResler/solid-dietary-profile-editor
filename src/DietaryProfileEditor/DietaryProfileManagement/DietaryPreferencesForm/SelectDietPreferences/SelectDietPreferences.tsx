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
    vegetarianDiet: 'http://www.wikidata.org/entity/Q83364',
    mediterraneanDiet: 'http://www.wikidata.org/entity/Q47564',
    lowCarbDiet: 'http://www.wikidata.org/entity/Q1570280',
    dashDiet: 'http://www.wikidata.org/entity/Q5204325',
    veganDiet: 'http://www.wikidata.org/entity/Q181138',
    ketoDiet: 'http://www.wikidata.org/entity/Q1070684',
    atkinsDiet: 'http://www.wikidata.org/entity/Q756030',
    paleoDiet: 'http://www.wikidata.org/entity/Q533945',
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

      <Row className="ms-auto">
        <Col xs={6} lg={4}>
          <Stack gap={2}>
            <Form.Check id={'vegetarian-diet-checkbox'}>
              <Form.Check.Input
                className="app-form-control app-form-checkbox"
                checked={selectedDiets.includes(dietIriList['vegetarianDiet'])}
                onChange={() =>
                  handleDietCheckboxOnChange(dietIriList['vegetarianDiet'])
                }
              />

              <Form.Check.Label className="ms-2">
                <FormattedMessage
                  id={'vegetarianDiet'}
                  defaultMessage={'Vegetarian'}
                />
              </Form.Check.Label>
            </Form.Check>

            <Form.Check id={'mediterranean-diet-checkbox'}>
              <Form.Check.Input
                className="app-form-control app-form-checkbox"
                checked={selectedDiets.includes(
                  dietIriList['mediterraneanDiet'],
                )}
                onChange={() =>
                  handleDietCheckboxOnChange(dietIriList['mediterraneanDiet'])
                }
              />

              <Form.Check.Label className="ms-2">
                <FormattedMessage
                  id={'mediterraneanDiet'}
                  defaultMessage={'Mediterranean'}
                />
              </Form.Check.Label>
            </Form.Check>

            <Form.Check id={'low-carb-diet-checkbox'}>
              <Form.Check.Input
                className="app-form-control app-form-checkbox"
                checked={selectedDiets.includes(dietIriList['lowCarbDiet'])}
                onChange={() =>
                  handleDietCheckboxOnChange(dietIriList['lowCarbDiet'])
                }
              />

              <Form.Check.Label className="ms-2">
                <FormattedMessage
                  id={'lowCarbDiet'}
                  defaultMessage={'Low-carbohydrate'}
                />
              </Form.Check.Label>
            </Form.Check>

            <Form.Check id={'dash-diet-checkbox'}>
              <Form.Check.Input
                className="app-form-control app-form-checkbox"
                checked={selectedDiets.includes(dietIriList['dashDiet'])}
                onChange={() =>
                  handleDietCheckboxOnChange(dietIriList['dashDiet'])
                }
              />

              <Form.Check.Label className="ms-2">DASH</Form.Check.Label>
            </Form.Check>
          </Stack>
        </Col>

        <Col xs={6} lg={4}>
          <Stack gap={2}>
            <Form.Check id={'vegan-diet-checkbox'}>
              <Form.Check.Input
                className="app-form-control app-form-checkbox"
                checked={selectedDiets.includes(dietIriList['veganDiet'])}
                onChange={() =>
                  handleDietCheckboxOnChange(dietIriList['veganDiet'])
                }
              />

              <Form.Check.Label className="ms-2">
                <FormattedMessage id={'veganDiet'} defaultMessage={'Vegan'} />
              </Form.Check.Label>
            </Form.Check>

            <Form.Check id={'keto-diet-checkbox'}>
              <Form.Check.Input
                className="app-form-control app-form-checkbox"
                checked={selectedDiets.includes(dietIriList['ketoDiet'])}
                onChange={() =>
                  handleDietCheckboxOnChange(dietIriList['ketoDiet'])
                }
              />

              <Form.Check.Label className="ms-2">
                <FormattedMessage id={'ketoDiet'} defaultMessage={'Keto'} />
              </Form.Check.Label>
            </Form.Check>

            <Form.Check id={'atkins-diet-checkbox'}>
              <Form.Check.Input
                className="app-form-control app-form-checkbox"
                checked={selectedDiets.includes(dietIriList['atkinsDiet'])}
                onChange={() =>
                  handleDietCheckboxOnChange(dietIriList['atkinsDiet'])
                }
              />

              <Form.Check.Label className="ms-2">
                <FormattedMessage id={'atkinsDiet'} defaultMessage={'Atkins'} />
              </Form.Check.Label>
            </Form.Check>

            <Form.Check id={'paleo-diet-checkbox'}>
              <Form.Check.Input
                className="app-form-control app-form-checkbox"
                checked={selectedDiets.includes(dietIriList['paleoDiet'])}
                onChange={() =>
                  handleDietCheckboxOnChange(dietIriList['paleoDiet'])
                }
              />

              <Form.Check.Label className="ms-2">
                <FormattedMessage id={'paleoDiet'} defaultMessage={'Paleo'} />
              </Form.Check.Label>
            </Form.Check>
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
