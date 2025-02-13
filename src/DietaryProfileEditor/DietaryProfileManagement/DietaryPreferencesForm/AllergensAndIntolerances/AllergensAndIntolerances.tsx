import Form from 'react-bootstrap/Form'
import { FormattedMessage } from 'react-intl'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Stack from 'react-bootstrap/Stack'
import Select from 'react-select'

type Props = {
  selectedAllergens: string[]
  setSelectedAllergens: React.Dispatch<React.SetStateAction<string[]>>
}

/**
 * Renders controls for selecting allergens and intolerances while managing state updates.
 */
const AllergensAndIntolerances: React.FC<Props> = ({
  selectedAllergens,
  setSelectedAllergens,
}) => {
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

  const intoleranceList = [
    {
      label: 'Lactose',
      value: 'lactose',
    },
    {
      label: 'Caffeine',
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

  const SelectComponents = {
    DropdownIndicator: () => null,
    IndicatorSeparator: () => null,
    // Menu: CustomSelectMenu,
  }

  type AllergenCheckboxProps = {
    allergenName: string
    allergenIri: string
  }

  const AllergenCheckbox: React.FC<AllergenCheckboxProps> = ({
    allergenName,
    allergenIri,
  }) => {
    const checkboxId = allergenName.toLowerCase() + '-checkbox'

    return (
      <Form.Check id={checkboxId}>
        <Form.Check.Input
          checked={selectedAllergens.includes(allergenIri)}
          className="app-form-control app-form-checkbox"
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

      <div className="form-group-heading mt-4">
        <FormattedMessage
          id="whatAreYourIntolerances"
          defaultMessage="What are your food intolerances?"
        />
      </div>

      <Select
        className="dietary-preferences-form-select ms-2 mt-1"
        isMulti
        components={SelectComponents}
        options={intoleranceList}
        // value={}
        // onChange={}
        aria-label="select-intolerances"
        placeholder={'Search for intolerances'}
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
