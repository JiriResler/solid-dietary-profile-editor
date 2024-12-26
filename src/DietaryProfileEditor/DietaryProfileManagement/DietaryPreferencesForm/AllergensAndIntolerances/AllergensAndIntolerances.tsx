import './AllergensAndIntolerances.css'
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

  return (
    <>
      <Form.Group controlId="selectAllergens">
        <Form.Label>
          <h4>
            <FormattedMessage
              id="whatAreYouAllergicTo"
              defaultMessage="What are you allergic to?"
            />
          </h4>
        </Form.Label>

        <Row className="allergen-checkbox-row">
          <Col xs={6} lg={3}>
            <Stack gap={1}>
              {allergenList.slice(0, 7).map((allergen) => {
                return (
                  <Form.Check type="checkbox" id={allergen + 'Checkbox'}>
                    <Form.Check.Input
                      type="checkbox"
                      className="app-form-control app-form-checkbox"
                    />

                    <img
                      src={'images/allergens/' + allergen + '.svg'}
                      className="allergen-icon ms-1 me-1"
                    />

                    <Form.Check.Label>
                      <FormattedMessage
                        id={allergen.toLowerCase()}
                        defaultMessage={allergen}
                      />
                    </Form.Check.Label>
                  </Form.Check>
                )
              })}
            </Stack>
          </Col>

          <Col xs={6} lg={3}>
            <Stack gap={1}>
              {allergenList.slice(7, 14).map((allergen) => {
                return (
                  <Form.Check type="checkbox" id={allergen + 'Checkbox'}>
                    <Form.Check.Input
                      type="checkbox"
                      className="app-form-control app-form-checkbox"
                    />

                    <img
                      src={'images/allergens/' + allergen + '.svg'}
                      className="allergen-icon ms-1 me-1"
                    />

                    <Form.Check.Label>
                      <FormattedMessage
                        id={allergen.toLowerCase()}
                        defaultMessage={allergen}
                      />
                    </Form.Check.Label>
                  </Form.Check>
                )
              })}
            </Stack>
          </Col>
        </Row>
      </Form.Group>

      <Form.Group controlId="selectIntolerances" className="mt-3">
        <Form.Label>
          <h4>
            <FormattedMessage
              id="whatAreYourIntolerances"
              defaultMessage="What are your food intolerances?"
            />
          </h4>
        </Form.Label>

        <Select
          className="dietary-preferences-form-select ms-2"
          isMulti
          components={SelectComponents}
          options={intoleranceList}
          // value={}
          // onChange={}
          placeholder={'Search for intolerances'}
          menuPlacement="top"
        />
      </Form.Group>
    </>
  )
}

export default AllergensAndIntolerances
