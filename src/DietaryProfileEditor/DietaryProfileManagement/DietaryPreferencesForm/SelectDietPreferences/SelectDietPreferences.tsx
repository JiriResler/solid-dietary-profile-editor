import './SelectDietPreferences.css'
import Form from 'react-bootstrap/Form'
import { FormattedMessage, useIntl } from 'react-intl'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Stack from 'react-bootstrap/Stack'
import Select from 'react-select'
import { SelectComponents } from '../DietaryPreferencesForm'
import reactSelectOption from '../reactSelectOption'
import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import { useContext } from 'react'
import LanguageContext from '../../../LanguageContext'
import ErrorModal from '../../../ErrorModal/ErrorModal'
import React, { useState } from 'react'
import isInt from 'validator/lib/isInt'

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

type SelectDietPreferencesProps = {
  selectedDiets: string[]
  setSelectedDiets: React.Dispatch<React.SetStateAction<string[]>>
  selectedDietsSearch: ReadonlyArray<reactSelectOption>
  setSelectedDietsSearch: React.Dispatch<
    React.SetStateAction<ReadonlyArray<reactSelectOption>>
  >
  calorieIntakeGoal: number
  setCalorieIntakeGoal: React.Dispatch<React.SetStateAction<number>>
}

/**
 * Displays options and collects input from the user about their diet preferencesa and colorie intake goals.
 */
const SelectDietPreferences: React.FC<SelectDietPreferencesProps> = ({
  selectedDiets,
  setSelectedDiets,
  selectedDietsSearch,
  setSelectedDietsSearch,
  calorieIntakeGoal,
  setCalorieIntakeGoal,
}) => {
  const intl = useIntl()

  const { selectedLanguage } = useContext(LanguageContext)

  const [dataFetchCausedError, setDataFetchCausedError] = useState(false)

  const { isPending, data } = useQuery({
    queryKey: ['getDietsFromWikidata'],
    queryFn: fetchDiets,
    select: formatDietResponse,
  })

  type DietBinding = {
    diet: {
      type: string
      value: string
    }
    dietLabel: {
      type: string
      value: string
    }
  }

  type DietResponse = {
    head: {
      vars: string[]
    }
    results: {
      bindings: DietBinding[]
    }
  }

  /**
   * Retrieves a list of diets from Wikidata.
   */
  function fetchDiets() {
    // SPARQL query retrieving diet results from Wikidata, ignoring diets already specified via checkboxes.
    const sparqlQuery = `
      SELECT DISTINCT ?diet ?dietLabel WHERE {
        ?diet (wdt:P31|wdt:P279) wd:Q474191.
        FILTER(?diet NOT IN(wd:Q83364, wd:Q47564, wd:Q1570280, wd:Q5204325, wd:Q181138, wd:Q1070684, wd:Q756030, wd:Q533945, wd:Q2995740, wd:Q135103987, wd:Q263058))
        SERVICE wikibase:label { bd:serviceParam wikibase:language "${selectedLanguage},en,mul". }
      }
    `

    const endpointUrl = 'https://query.wikidata.org/sparql'

    const requestUrl = endpointUrl + '?query=' + encodeURI(sparqlQuery)

    const requestHeaders = {
      Accept: 'application/sparql-results+json',
    }

    return axios
      .get<DietResponse>(requestUrl, { headers: requestHeaders })
      .then((response) => {
        return response.data
      })
      .catch((error) => {
        setDataFetchCausedError(true)

        console.error('Error while fetching diet option data.', error)
        throw error
      })
  }

  /**
   * Transforms diet Wikidata response into an array of values and labels for the Select component. Response data is sorted by resource label.
   */
  function formatDietResponse(response: DietResponse): reactSelectOption[] {
    return response.results.bindings
      .map(({ diet, dietLabel }) => ({
        value: diet.value,
        label: capitalizeFirstLetter(dietLabel.value),
      }))
      .sort((a, b) => a.label.localeCompare(b.label))
  }

  /**
   * Capitalizes the first letter of a given string.
   */
  function capitalizeFirstLetter(string: string) {
    if (string === '') {
      return ''
    }

    return string.charAt(0).toUpperCase() + string.slice(1)
  }

  /**
   * Creates a new selectedDiets array based on whether it previously contained the diet IRI or not and sets it to the selected diets state variable.
   */
  function handleDietCheckboxOnChange(dietIri: string) {
    if (selectedDiets.includes(dietIri)) {
      setSelectedDiets(selectedDiets.filter((iri) => iri != dietIri))
    } else {
      setSelectedDiets([...selectedDiets, dietIri])
    }
  }

  /**
   * Checks whether user input is a number.
   */
  function validateAndSetCalorieInput(input: string) {
    if (input === '') {
      setCalorieIntakeGoal(0)
    }

    if (isInt(input)) {
      setCalorieIntakeGoal(parseInt(input))
    }
  }

  return (
    <>
      <ErrorModal
        show={dataFetchCausedError}
        setShow={setDataFetchCausedError}
        titleMessage={intl.formatMessage({
          id: 'error',
          defaultMessage: 'Error',
        })}
        bodyMessage={intl.formatMessage({
          id: 'fetchingDietsFailed',
          defaultMessage: 'Retrieving of diet data failed.',
        })}
      />

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
                  defaultMessage={'Low-carb'}
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
        options={data}
        value={selectedDietsSearch}
        onChange={setSelectedDietsSearch}
        aria-label="select-diets"
        placeholder={intl.formatMessage({
          id: 'searchMoreDiets',
          defaultMessage: 'Search for more diets',
        })}
        menuPlacement="top"
        maxMenuHeight={150}
        isLoading={isPending}
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
        <Stack direction="horizontal" gap={3} className="ms-2 mt-2 pb-2">
          <Form.Control
            className="app-form-control calorieInput"
            value={calorieIntakeGoal}
            onChange={(e) => validateAndSetCalorieInput(e.target.value)}
          />
          <Form.Label>kcal</Form.Label>
        </Stack>
      </Form.Group>
    </>
  )
}

export default SelectDietPreferences
