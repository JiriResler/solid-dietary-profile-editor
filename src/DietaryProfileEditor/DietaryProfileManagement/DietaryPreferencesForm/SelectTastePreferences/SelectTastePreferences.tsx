import { FormattedMessage, useIntl } from 'react-intl'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Stack from 'react-bootstrap/Stack'
import FormCheckbox from '../FormCheckbox/FormCheckbox'
import Select from 'react-select'
import Form from 'react-bootstrap/Form'
import Slider from '@mui/material/Slider'
import { SelectComponents } from '../DietaryPreferencesForm'
import reactSelectOption from '../reactSelectOption'
import LanguageContext from '../../../LanguageContext'
import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import { useState, useContext } from 'react'
import ErrorModal from '../../../ErrorModal/ErrorModal'

const cuisineIriList = {
  italianCuisine: 'http://www.wikidata.org/entity/Q192786',
  greekCuisine: 'http://www.wikidata.org/entity/Q744027',
  mexicanCuisine: 'http://www.wikidata.org/entity/Q207965',
  chineseCuisine: 'http://www.wikidata.org/entity/Q10876842',
  turkishCuisine: 'http://www.wikidata.org/entity/Q654493',
  spanishCuisine: 'http://www.wikidata.org/entity/Q622512',
  japaneseCuisine: 'http://www.wikidata.org/entity/Q234138',
  frenchCuisine: 'http://www.wikidata.org/entity/Q6661',
}

type SelectTastePreferencesProps = {
  selectedCuisines: string[]
  setSelectedCuisines: React.Dispatch<React.SetStateAction<string[]>>
  selectedCuisinesSearch: ReadonlyArray<reactSelectOption>
  setSelectedCuisinesSearch: React.Dispatch<
    React.SetStateAction<ReadonlyArray<reactSelectOption>>
  >
  selectedLikedIngredients: ReadonlyArray<reactSelectOption>
  setSelectedLikedIngredients: React.Dispatch<
    React.SetStateAction<ReadonlyArray<reactSelectOption>>
  >
  selectedDislikedIngredients: ReadonlyArray<reactSelectOption>
  setSelectedDislikedIngredients: React.Dispatch<
    React.SetStateAction<ReadonlyArray<reactSelectOption>>
  >
  spicinessRadioSelected: string
  setSpicinessRadioSelected: React.Dispatch<React.SetStateAction<string>>
  spicinessLevelSliderValue: number
  setSpicinessLevelSliderValue: React.Dispatch<React.SetStateAction<number>>
}

/**
 * Displays taste preference options and collects selected user data.
 */
const SelectTastePreferences: React.FC<SelectTastePreferencesProps> = ({
  selectedCuisines,
  setSelectedCuisines,
  selectedCuisinesSearch,
  setSelectedCuisinesSearch,
  selectedLikedIngredients,
  setSelectedLikedIngredients,
  selectedDislikedIngredients,
  setSelectedDislikedIngredients,
  spicinessRadioSelected,
  setSpicinessRadioSelected,
  spicinessLevelSliderValue,
  setSpicinessLevelSliderValue,
}) => {
  const intl = useIntl()

  const { selectedLanguage } = useContext(LanguageContext)

  const [cuisineFetchCausedError, setCuisineFetchCausedError] = useState(false)

  const [ingredientFetchCausedError, setIngredientFetchCausedError] =
    useState(false)

  const cuisineQuery = useQuery({
    queryKey: ['getCuisinesFromWikidata'],
    queryFn: fetchCuisines,
    select: formatCuisineResponse,
  })

  const ingredientQuery = useQuery({
    queryKey: ['getIngredientsFromWikidata'],
    queryFn: fetchIngredients,
    select: formatIngredientResponse,
  })

  type CuisineBinding = {
    cuisine: {
      type: string
      value: string
    }
    cuisineLabel: {
      type: string
      value: string
    }
  }

  type CuisineResponse = {
    head: {
      vars: string[]
    }
    results: {
      bindings: CuisineBinding[]
    }
  }

  type IngredientBinding = {
    ingredient: {
      type: string
      value: string
    }
    ingredientLabel: {
      type: string
      value: string
    }
  }

  type IngredientResponse = {
    head: {
      vars: string[]
    }
    results: {
      bindings: IngredientBinding[]
    }
  }

  /**
   * Retrieves a list of cuisine resources from Wikidata.
   */
  function fetchCuisines() {
    // SPARQL query retrieving results from Wikidata, ignoring cuisines already specified via checkboxes.
    const sparqlQuery = `
      SELECT DISTINCT ?cuisine ?cuisineLabel WHERE {
        ?cuisine (wdt:P31|wdt:P279) wd:Q1968435.
        FILTER(?cuisine NOT IN(wd:Q192786, wd:Q744027, wd:Q207965, wd:Q10876842, wd:Q654493, wd:Q622512, wd:Q234138, wd:Q6661))
        SERVICE wikibase:label { bd:serviceParam wikibase:language "${selectedLanguage},en,mul". }
      }
    `

    const endpointUrl = 'https://query.wikidata.org/sparql'

    const requestUrl = endpointUrl + '?query=' + encodeURI(sparqlQuery)

    const requestHeaders = {
      Accept: 'application/sparql-results+json',
    }

    return axios
      .get<CuisineResponse>(requestUrl, { headers: requestHeaders })
      .then((response) => {
        return response.data
      })
      .catch((error) => {
        setCuisineFetchCausedError(true)
        console.error('Error while fetching diet option data.', error)
        throw error
      })
  }

  /**
   * Transforms cuisine Wikidata response into an array of values and labels for the Select component. Response data is sorted by resource label.
   */
  function formatCuisineResponse(
    response: CuisineResponse,
  ): reactSelectOption[] {
    return response.results.bindings
      .map(({ cuisine, cuisineLabel }) => ({
        value: cuisine.value,
        label: capitalizeFirstLetter(cuisineLabel.value),
      }))
      .sort((a, b) => a.label.localeCompare(b.label))
  }

  /**
   * Retrieves a list of ingredients from Wikidata.
   */
  function fetchIngredients() {
    // SPARQL query retrieving ingredient results from Wikidata.
    const sparqlQuery = `
      SELECT DISTINCT ?ingredient ?ingredientLabel WHERE {
        ?ingredient (wdt:P31|wdt:P279) wd:Q25403900.
        SERVICE wikibase:label { bd:serviceParam wikibase:language "${selectedLanguage},en,mul". }
      }
      `

    const endpointUrl = 'https://query.wikidata.org/sparql'

    const requestUrl = endpointUrl + '?query=' + encodeURI(sparqlQuery)

    const requestHeaders = {
      Accept: 'application/sparql-results+json',
    }

    return axios
      .get<IngredientResponse>(requestUrl, { headers: requestHeaders })
      .then((response) => {
        return response.data
      })
      .catch((error) => {
        setIngredientFetchCausedError(true)
        console.error('Error while fetching ingredient option data.', error)
        throw error
      })
  }

  /**
   * Transforms ingredient Wikidata response into an array of values and labels for the Select component. Response data is sorted by resource label.
   */
  function formatIngredientResponse(
    response: IngredientResponse,
  ): reactSelectOption[] {
    return response.results.bindings
      .map(({ ingredient, ingredientLabel }) => ({
        value: ingredient.value,
        label: capitalizeFirstLetter(ingredientLabel.value),
      }))
      .sort((a, b) => a.label.localeCompare(b.label))
  }

  /**
   * Creates a new selectedCuisines array based on whether it previously contained the cuisine IRI or not and sets it to the selected cuisines state variable.
   */
  function handleCuisineCheckboxOnChange(cuisineIri: string) {
    if (selectedCuisines.includes(cuisineIri)) {
      setSelectedCuisines(selectedCuisines.filter((iri) => iri != cuisineIri))
    } else {
      setSelectedCuisines([...selectedCuisines, cuisineIri])
    }
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

  const commonCookingMethods = [
    'Baking',
    'Grilling',
    'Boiling',
    'Roasting',
    'Stir-frying',
    'Sauteing',
    'Steaming',
    'Deep-frying',
  ]

  const otherCookingMethods = [
    { label: 'Broiling', value: 'broiling' },
    { label: 'Slow cooking', value: 'slow-cooking' },
    { label: 'Poaching', value: 'poaching' },
    { label: 'Sous Vide', value: 'sous-vide' },
    { label: 'Searing', value: 'searing' },
    { label: 'Smoking', value: 'smoking' },
    { label: 'Pressure cooking', value: 'pressure-cooking' },
    { label: 'Blanching', value: 'blanching' },
    { label: 'Microwaving', value: 'microwaving' },
    { label: 'Pickling/Fermenting', value: 'pickling-fermenting' },
    { label: 'Raw/No-cook', value: 'raw-no-cook' },
  ]

  const spicinessSliderMarks = [
    {
      value: 0,
      label: intl.formatMessage({
        id: 'mild',
        defaultMessage: 'Mild',
      }),
    },
    {
      value: 33,
      label: intl.formatMessage({
        id: 'medium',
        defaultMessage: 'Medium',
      }),
    },
    {
      value: 66,
      label: intl.formatMessage({
        id: 'hot',
        defaultMessage: 'Hot',
      }),
    },
    {
      value: 100,
      label: intl.formatMessage({
        id: 'extraHot',
        defaultMessage: 'Extra hot',
      }),
    },
  ]

  /**
   * Returns a text label corresponding to the currently selected slider value.
   */
  function valueLabelFormat(value: number): string {
    if (value >= 0 && value <= 32) {
      return 'Mild'
    } else if (value > 32 && value <= 65) {
      return 'Medium'
    } else if (value > 65 && value <= 98) {
      return 'Hot'
    } else if (value > 98) {
      return 'Extra hot'
    }
    return ''
  }

  /**
   * Sets the new value for slected spiciness level.
   */
  function handleSpicinessSliderOnChange(_: Event, value: number | number[]) {
    if (!Array.isArray(value)) {
      setSpicinessLevelSliderValue(value)
    }
  }

  return (
    <>
      <ErrorModal
        show={cuisineFetchCausedError}
        setShow={setCuisineFetchCausedError}
        titleMessage={intl.formatMessage({
          id: 'error',
          defaultMessage: 'Error',
        })}
        bodyMessage={intl.formatMessage({
          id: 'fetchingCuisinesFailed',
          defaultMessage: 'Retrieving of cuisine data failed.',
        })}
      />

      <ErrorModal
        show={ingredientFetchCausedError}
        setShow={setIngredientFetchCausedError}
        titleMessage={intl.formatMessage({
          id: 'error',
          defaultMessage: 'Error',
        })}
        bodyMessage={intl.formatMessage({
          id: 'fetchingIngredientsFailed',
          defaultMessage: 'Retrieving of ingredient data failed.',
        })}
      />

      <div className="form-group-heading">
        <FormattedMessage
          id="favoriteWorldCuisines"
          defaultMessage="Which are your favorite world cuisines?"
        />
      </div>

      <Row className="ms-auto">
        <Col xs={6} lg={4}>
          <Stack gap={2}>
            <Form.Check id={'italian-cuisine-checkbox'}>
              <Form.Check.Input
                className="app-form-control app-form-checkbox"
                checked={selectedCuisines.includes(
                  cuisineIriList['italianCuisine'],
                )}
                onChange={() =>
                  handleCuisineCheckboxOnChange(
                    cuisineIriList['italianCuisine'],
                  )
                }
              />

              <Form.Check.Label className="ms-2">
                <FormattedMessage
                  id={'italianCuisine'}
                  defaultMessage={'Italian'}
                />
              </Form.Check.Label>
            </Form.Check>

            <Form.Check id={'greek-cuisine-checkbox'}>
              <Form.Check.Input
                className="app-form-control app-form-checkbox"
                checked={selectedCuisines.includes(
                  cuisineIriList['greekCuisine'],
                )}
                onChange={() =>
                  handleCuisineCheckboxOnChange(cuisineIriList['greekCuisine'])
                }
              />

              <Form.Check.Label className="ms-2">
                <FormattedMessage
                  id={'greekCuisine'}
                  defaultMessage={'Greek'}
                />
              </Form.Check.Label>
            </Form.Check>

            <Form.Check id={'mexican-cuisine-checkbox'}>
              <Form.Check.Input
                className="app-form-control app-form-checkbox"
                checked={selectedCuisines.includes(
                  cuisineIriList['mexicanCuisine'],
                )}
                onChange={() =>
                  handleCuisineCheckboxOnChange(
                    cuisineIriList['mexicanCuisine'],
                  )
                }
              />

              <Form.Check.Label className="ms-2">
                <FormattedMessage
                  id={'mexicanCuisine'}
                  defaultMessage={'Mexican'}
                />
              </Form.Check.Label>
            </Form.Check>

            <Form.Check id={'chinese-cuisine-checkbox'}>
              <Form.Check.Input
                className="app-form-control app-form-checkbox"
                checked={selectedCuisines.includes(
                  cuisineIriList['chineseCuisine'],
                )}
                onChange={() =>
                  handleCuisineCheckboxOnChange(
                    cuisineIriList['chineseCuisine'],
                  )
                }
              />

              <Form.Check.Label className="ms-2">
                <FormattedMessage
                  id={'chineseCuisine'}
                  defaultMessage={'Chinese'}
                />
              </Form.Check.Label>
            </Form.Check>
          </Stack>
        </Col>

        <Col xs={6} lg={4}>
          <Stack gap={2}>
            <Form.Check id={'turkish-cuisine-checkbox'}>
              <Form.Check.Input
                className="app-form-control app-form-checkbox"
                checked={selectedCuisines.includes(
                  cuisineIriList['turkishCuisine'],
                )}
                onChange={() =>
                  handleCuisineCheckboxOnChange(
                    cuisineIriList['turkishCuisine'],
                  )
                }
              />

              <Form.Check.Label className="ms-2">
                <FormattedMessage
                  id={'turkishCuisine'}
                  defaultMessage={'Turkish'}
                />
              </Form.Check.Label>
            </Form.Check>

            <Form.Check id={'spanish-cuisine-checkbox'}>
              <Form.Check.Input
                className="app-form-control app-form-checkbox"
                checked={selectedCuisines.includes(
                  cuisineIriList['spanishCuisine'],
                )}
                onChange={() =>
                  handleCuisineCheckboxOnChange(
                    cuisineIriList['spanishCuisine'],
                  )
                }
              />

              <Form.Check.Label className="ms-2">
                <FormattedMessage
                  id={'spanishCuisine'}
                  defaultMessage={'Spanish'}
                />
              </Form.Check.Label>
            </Form.Check>

            <Form.Check id={'japanese-cuisine-checkbox'}>
              <Form.Check.Input
                className="app-form-control app-form-checkbox"
                checked={selectedCuisines.includes(
                  cuisineIriList['japaneseCuisine'],
                )}
                onChange={() =>
                  handleCuisineCheckboxOnChange(
                    cuisineIriList['japaneseCuisine'],
                  )
                }
              />

              <Form.Check.Label className="ms-2">
                <FormattedMessage
                  id={'japaneseCuisine'}
                  defaultMessage={'Japanese'}
                />
              </Form.Check.Label>
            </Form.Check>

            <Form.Check id={'french-cuisine-checkbox'}>
              <Form.Check.Input
                className="app-form-control app-form-checkbox"
                checked={selectedCuisines.includes(
                  cuisineIriList['frenchCuisine'],
                )}
                onChange={() =>
                  handleCuisineCheckboxOnChange(cuisineIriList['frenchCuisine'])
                }
              />

              <Form.Check.Label className="ms-2">
                <FormattedMessage
                  id={'frenchCuisine'}
                  defaultMessage={'French'}
                />
              </Form.Check.Label>
            </Form.Check>
          </Stack>
        </Col>
      </Row>

      <Select
        className="dietary-preferences-form-select ms-2 mt-4"
        isMulti
        components={SelectComponents}
        options={cuisineQuery.data}
        value={selectedCuisinesSearch}
        onChange={setSelectedCuisinesSearch}
        aria-label="more-cuisines-select"
        placeholder={intl.formatMessage({
          id: 'searchMoreCuisines',
          defaultMessage: 'Search for more cuisines',
        })}
        menuPlacement="top"
        maxMenuHeight={170}
        isLoading={cuisineQuery.isPending}
        styles={{
          control: (baseStyles) => ({
            ...baseStyles,
            minHeight: '50px',
          }),
        }}
      />

      <div className="form-group-heading mt-4">
        <FormattedMessage
          id="foodIngredientsLikeOrDislike"
          defaultMessage="Which food ingredients do you like or dislike?"
        />
      </div>

      <Row className="ms-auto">
        <Col className="pb-4">
          <div>
            <FormattedMessage id="whatILike" defaultMessage="What I like" />
          </div>

          <Select
            className="dietary-preferences-form-select mt-3"
            isMulti
            components={SelectComponents}
            options={ingredientQuery.data}
            value={selectedLikedIngredients}
            onChange={setSelectedLikedIngredients}
            isLoading={ingredientQuery.isPending}
            aria-label="preferred-ingrediences-select"
            placeholder={intl.formatMessage({
              id: 'searchIngredients',
              defaultMessage: 'Search for ingredients',
            })}
            menuPlacement="top"
            maxMenuHeight={170}
            styles={{
              control: (baseStyles) => ({
                ...baseStyles,
                minHeight: '50px',
              }),
            }}
          />
        </Col>

        <Col className="pb-4">
          <div>
            <FormattedMessage
              id="whatIDontLike"
              defaultMessage="What I don't like"
            />
          </div>

          <Select
            className="dietary-preferences-form-select mt-3"
            isMulti
            components={SelectComponents}
            options={ingredientQuery.data}
            value={selectedDislikedIngredients}
            onChange={setSelectedDislikedIngredients}
            isLoading={ingredientQuery.isPending}
            aria-label="preferred-ingrediences-select"
            placeholder={intl.formatMessage({
              id: 'searchIngredients',
              defaultMessage: 'Search for ingredients',
            })}
            menuPlacement="top"
            maxMenuHeight={170}
            styles={{
              control: (baseStyles) => ({
                ...baseStyles,
                minHeight: '50px',
              }),
            }}
          />
        </Col>
      </Row>

      <div className="form-group-heading">
        <FormattedMessage
          id="doYouLikeSpicyFood"
          defaultMessage="Do you like spicy food?"
        />
      </div>

      <Stack gap={2} className="ms-3">
        <Form.Check
          id={'spiciness-radio-unspecified'}
          key="spiciness-radio-option-1"
        >
          <Form.Check.Input
            type="radio"
            className="app-form-control app-form-checkbox"
            checked={spicinessRadioSelected === 'unspecified'}
            onChange={() => setSpicinessRadioSelected('unspecified')}
          />
          <Form.Check.Label className="checkbox-label">
            <FormattedMessage
              id="notSpecified"
              defaultMessage="Not specified"
            />
          </Form.Check.Label>
        </Form.Check>

        <Form.Check
          id={'spiciness-radio-negative'}
          key="spiciness-radio-option-2"
        >
          <Form.Check.Input
            type="radio"
            className="app-form-control app-form-checkbox"
            checked={spicinessRadioSelected === 'negative'}
            onChange={() => setSpicinessRadioSelected('negative')}
          />
          <Form.Check.Label className="checkbox-label">
            <FormattedMessage id="notAtAll" defaultMessage="Not at all" />
          </Form.Check.Label>
        </Form.Check>

        <Form.Check
          id={'spiciness-radio-positive'}
          key="spiciness-radio-option-3"
        >
          <Form.Check.Input
            type="radio"
            className="app-form-control app-form-checkbox"
            checked={spicinessRadioSelected === 'positive'}
            onChange={() => setSpicinessRadioSelected('positive')}
          />
          <Form.Check.Label className="checkbox-label">
            <FormattedMessage id="yesIDo" defaultMessage="Yes, I do" />
          </Form.Check.Label>
        </Form.Check>

        <Row>
          <Col xs={12} lg={4}>
            <div
              className={
                spicinessRadioSelected !== 'positive' ? 'text-muted' : ''
              }
            >
              <FormattedMessage
                id="howSpicyShouldFoodBe"
                defaultMessage="How spicy should it be?"
              />
            </div>
          </Col>

          <Col xs={9} lg={4}>
            <Slider
              disabled={spicinessRadioSelected !== 'positive'}
              aria-label="spiciness-slider"
              getAriaValueText={valueLabelFormat}
              step={100 / 3}
              marks={spicinessSliderMarks}
              sx={{ marginLeft: '8pt', marginTop: '-3pt', color: '#2541b2' }}
              value={spicinessLevelSliderValue}
              onChange={handleSpicinessSliderOnChange}
            />
          </Col>
        </Row>
      </Stack>

      <div className="form-group-heading mt-3">
        <FormattedMessage
          id="whichCookingMethodsDoYouPrefer"
          defaultMessage="Which cooking methods do you prefer?"
        />
      </div>

      <Row className="ms-auto">
        <Col xs={6} lg={3}>
          <Stack gap={2}>
            {commonCookingMethods.slice(0, 4).map((method) => {
              return <FormCheckbox label={method} key={method} />
            })}
          </Stack>
        </Col>

        <Col xs={6} lg={3}>
          <Stack gap={2}>
            {commonCookingMethods.slice(4, 8).map((method) => {
              return <FormCheckbox label={method} key={method} />
            })}
          </Stack>
        </Col>
      </Row>

      <Select
        className="dietary-preferences-form-select ms-2 mt-4 pb-2"
        isMulti
        components={SelectComponents}
        options={otherCookingMethods}
        // value={}
        // onChange={}
        aria-label="more-cooking-methods-select"
        placeholder={'Select more methods'}
        styles={{
          control: (baseStyles) => ({
            ...baseStyles,
            minHeight: '50px',
          }),
        }}
        menuPlacement="top"
        maxMenuHeight={210}
      />
    </>
  )
}

export default SelectTastePreferences
