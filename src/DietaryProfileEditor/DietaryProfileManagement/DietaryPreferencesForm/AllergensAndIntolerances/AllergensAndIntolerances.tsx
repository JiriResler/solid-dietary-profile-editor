import Form from 'react-bootstrap/Form'
import { FormattedMessage, useIntl } from 'react-intl'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Stack from 'react-bootstrap/Stack'
import Select from 'react-select'
import reactSelectOption from '../reactSelectOption'
import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import N3 from 'n3'
import { fromRdfJsDataset, getThing, getUrlAll } from '@inrupt/solid-client'

type Props = {
  selectedAllergens: string[]
  setSelectedAllergens: React.Dispatch<React.SetStateAction<string[]>>
  selectedIntolerances: ReadonlyArray<reactSelectOption>
  setSelectedIntolerances: React.Dispatch<
    React.SetStateAction<ReadonlyArray<reactSelectOption>>
  >
}

/**
 * Renders controls for selecting allergens and intolerances while managing state updates.
 */
const AllergensAndIntolerances: React.FC<Props> = ({
  selectedAllergens,
  setSelectedAllergens,
  selectedIntolerances,
  setSelectedIntolerances,
}) => {
  const intl = useIntl()

  const allergenList = [
    { label: 'Gluten', iri: 'http://www.wikidata.org/entity/Q188251' },
    { label: 'Crustaceans', iri: 'http://www.wikidata.org/entity/Q25364' },
    { label: 'Eggs', iri: 'http://www.wikidata.org/entity/Q93189' },
    { label: 'Fish', iri: 'http://www.wikidata.org/entity/Q152' },
    { label: 'Peanuts', iri: 'http://www.wikidata.org/entity/Q37383' },
    { label: 'Soya', iri: 'http://www.wikidata.org/entity/Q11006' },
    { label: 'Milk', iri: 'http://www.wikidata.org/entity/Q8495' },
    { label: 'Nuts', iri: 'http://www.wikidata.org/entity/Q11009' },
    { label: 'Celery', iri: 'http://www.wikidata.org/entity/Q28298' },
    { label: 'Mustard', iri: 'http://www.wikidata.org/entity/Q1937700' },
    { label: 'Sesame', iri: 'http://www.wikidata.org/entity/Q2763698' },
    { label: 'Sulphites', iri: 'http://www.wikidata.org/entity/Q413363' },
    { label: 'Lupin', iri: 'http://www.wikidata.org/entity/Q13582643' },
    { label: 'Molluscs', iri: 'http://www.wikidata.org/entity/Q6501235' },
  ]

  /**
   * Sends an HTTP request to get list of intolerances.
   * @returns A string with intolerance data in RDF format.
   */
  function fetchIntolerances() {
    const intoleranceListUrl =
      'https://raw.githubusercontent.com/JiriResler/personalized-restaurant-menu-viewer-application-ontology/main/resource/List_of_intolerances.ttl'

    return axios
      .get<string>(intoleranceListUrl)
      .then((response) => {
        return response.data
      })
      .catch((error) => {
        console.error('Error in fetching intolerance data.', error)
        throw error
      })
  }

  function parseIntoleranceList(rdfFile: string) {
    const rdfParser = new N3.Parser()

    try {
      const rdfStore = new N3.Store(rdfParser.parse(rdfFile))

      const intoleranceListDataset = fromRdfJsDataset(rdfStore)

      const intoleranceListUrl =
        'https://raw.githubusercontent.com/JiriResler/personalized-restaurant-menu-viewer-applances'

      const intoleranceListThing = getThing(
        intoleranceListDataset,
        intoleranceListUrl,
      )

      if (intoleranceListThing === null) {
        throw new Error('Intolerance list Thing not found.')
      }

      const intoleranceUrls = getUrlAll(
        intoleranceListThing,
        'http://www.w3.org/2000/01/rdf-schema#member',
      )

      console.log(intoleranceUrls)
    } catch (error) {
      console.error('Parsing of intolerance list failed.', error)
      throw error
    }
  }

  const { isPending, error, data } = useQuery({
    queryKey: ['getIntolerances'],
    queryFn: fetchIntolerances,
    select: parseIntoleranceList,
  })

  /**
   * Returns an error placeholder if an error occurs; otherwise, returns a search placeholder.
   */
  function intoleranceSelectPlaceholder() {
    if (error) {
      return intl.formatMessage({
        id: 'searchForIntolerancesError',
        defaultMessage: 'Could not load intolerances',
      })
    } else {
      return intl.formatMessage({
        id: 'searchForIntolerances',
        defaultMessage: 'Search for intolerances',
      })
    }
  }

  const intoleranceList = [
    {
      label: 'Lactose intolerance',
      value: 'lactose',
    },
    {
      label: 'Caffeine sensitivity',
      value: 'caffeine',
    },
    {
      label: 'Salicylates',
      value: 'salicylates',
    },
    {
      label: 'Amines',
      value: 'amines',
    },
    {
      label: 'High-FODMAP',
      value: 'high-FODMAP',
    },
    {
      label: 'Aspartame',
      value: 'aspartame',
    },
    {
      label: 'Yeast',
      value: 'yeast',
    },
    {
      label: 'Corn',
      value: 'corn',
    },
    {
      label: 'Sugar alcohols',
      value: 'sugar-alcohols',
    },
  ]

  type AllergenCheckboxProps = {
    allergenName: string
    allergenIri: string
  }

  /**
   * Renders a checkbox labeled with the allergen name and handles user interactions.
   */
  const AllergenCheckbox: React.FC<AllergenCheckboxProps> = ({
    allergenName,
    allergenIri,
  }) => {
    const checkboxId = allergenName.toLowerCase() + '-checkbox'

    /**
     * Adds or removes an allergen's IRI from selectedAllergens.
     */
    function handleOnChange() {
      if (selectedAllergens.includes(allergenIri)) {
        setSelectedAllergens(
          selectedAllergens.filter((iri) => iri != allergenIri),
        )
      } else {
        setSelectedAllergens([...selectedAllergens, allergenIri])
      }
    }

    return (
      <Form.Check id={checkboxId}>
        <Form.Check.Input
          className="app-form-control app-form-checkbox"
          checked={selectedAllergens.includes(allergenIri)}
          onChange={handleOnChange}
        />

        <Form.Check.Label>
          <img
            src={'images/allergens/' + allergenName + '.svg'}
            alt="Allergen icon"
            className="allergen-icon ms-1 me-1"
          />
          <FormattedMessage
            id={allergenName.toLowerCase()}
            defaultMessage={allergenName}
          />
        </Form.Check.Label>
      </Form.Check>
    )
  }

  return (
    <>
      <div className="form-group-heading">
        <FormattedMessage
          id="whatAreYouAllergicTo"
          defaultMessage="What are you allergic to?"
        />
      </div>

      <Row className="ms-auto">
        <Col xs={6} lg={3}>
          <Stack gap={1}>
            {allergenList.slice(0, 7).map((allergen) => {
              return (
                <AllergenCheckbox
                  allergenName={allergen.label}
                  allergenIri={allergen.iri}
                  key={allergen.label}
                />
              )
            })}
          </Stack>
        </Col>

        <Col xs={6} lg={3}>
          <Stack gap={1}>
            {allergenList.slice(7, 14).map((allergen) => {
              return (
                <AllergenCheckbox
                  allergenName={allergen.label}
                  allergenIri={allergen.iri}
                  key={allergen.label}
                />
              )
            })}
          </Stack>
        </Col>
      </Row>

      <div className="form-group-heading mt-3">
        <FormattedMessage
          id="whatAreYourIntolerances"
          defaultMessage="What are your food intolerances?"
        />
      </div>

      <Select
        className="dietary-preferences-form-select ms-2 mt-1"
        styles={{
          control: (baseStyles) => ({
            ...baseStyles,
            minHeight: '50px',
          }),
        }}
        isMulti
        options={intoleranceList}
        value={selectedIntolerances}
        onChange={setSelectedIntolerances}
        placeholder={intoleranceSelectPlaceholder()}
        isLoading={isPending}
        aria-label="select-intolerances"
        menuPlacement="top"
      />
    </>
  )
}

export default AllergensAndIntolerances
