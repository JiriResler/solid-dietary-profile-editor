import Form from 'react-bootstrap/Form'
import { FormattedMessage, useIntl } from 'react-intl'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Stack from 'react-bootstrap/Stack'
import Select from 'react-select'
import reactSelectOption from '../reactSelectOption'
import { useQuery } from '@tanstack/react-query'

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

  const { isPending, error, data } = useQuery({
    queryKey: ['repoData'],
    queryFn: () =>
      fetch('https://api.github.com/repos/TanStack/query').then((res) =>
        res.json(),
      ),
  })

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

  if (isPending) return 'Loading...'

  if (error) return 'An error has occurred: ' + error.message

  return (
    <>
      <div>
        <h1>{data.name}</h1>
        <p>{data.description}</p>
        <strong>👀 {data.subscribers_count}</strong>{' '}
        <strong>✨ {data.stargazers_count}</strong>{' '}
        <strong>🍴 {data.forks_count}</strong>
      </div>


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
        isMulti
        options={intoleranceList}
        value={selectedIntolerances}
        onChange={setSelectedIntolerances}
        aria-label="select-intolerances"
        placeholder={intl.formatMessage({
          id: 'searchForIntolerances',
          defaultMessage: 'Search for intolerances',
        })}
        menuPlacement="top"
        styles={{
          control: (baseStyles) => ({
            ...baseStyles,
            minHeight: '50px',
          }),
        }}
      />
    </>
  )
}

export default AllergensAndIntolerances
