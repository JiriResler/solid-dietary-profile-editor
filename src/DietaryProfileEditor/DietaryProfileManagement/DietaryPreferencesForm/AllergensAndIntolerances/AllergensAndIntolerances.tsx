import Form from 'react-bootstrap/Form'
import { FormattedMessage } from 'react-intl'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Stack from 'react-bootstrap/Stack'
import Select from 'react-select'

const AllergensAndIntolerances: React.FC = () => {
  const allergenList = [
    'Gluten',
    'Crustaceans',
    'Eggs',
    'Fish',
    'Peanuts',
    'Soya',
    'Milk',
    'Nuts',
    'Celery',
    'Mustard',
    'Sesame',
    'Sulphites',
    'Lupin',
    'Molluscs',
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
  }

  const AllergenCheckbox: React.FC<AllergenCheckboxProps> = ({
    allergenName,
  }) => {
    const checkboxId = allergenName.toLowerCase() + '-checkbox'

    return (
      <Form.Check id={checkboxId}>
        <Form.Check.Input className="app-form-control app-form-checkbox" />

        <img
          src={'images/allergens/' + allergenName + '.svg'}
          alt="Allergen icon"
          className="allergen-icon ms-1 me-1"
        />

        <Form.Check.Label>
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
              return <AllergenCheckbox allergenName={allergen} key={allergen} />
            })}
          </Stack>
        </Col>

        <Col xs={6} lg={3}>
          <Stack gap={1}>
            {allergenList.slice(7, 14).map((allergen) => {
              return <AllergenCheckbox allergenName={allergen} key={allergen} />
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
