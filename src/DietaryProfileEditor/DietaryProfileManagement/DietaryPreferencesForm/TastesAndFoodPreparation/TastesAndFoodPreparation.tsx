import './TastesAndFoodPreparation.css'
import { FormattedMessage } from 'react-intl'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Stack from 'react-bootstrap/Stack'
import FormCheckbox from '../FormCheckbox/FormCheckbox'
import Select from 'react-select'
import Form from 'react-bootstrap/Form'

/**
 * Collects user data on their taste preferences.
 */
const TastesAndFoodPreparation: React.FC = () => {
  const popularCuisines = [
    'Italian',
    'Indian',
    'French',
    'Chinese',
    'Middle Eastern',
    'Spanish',
    'Japanese',
    'Thai',
    'Mexican',
    'Korean',
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
          id="favoriteWorldCuisines"
          defaultMessage="What are your favorite world cuisines?"
        />
      </div>

      <Row className="ms-auto">
        <Col xs={6} lg={3}>
          <Stack gap={2}>
            {popularCuisines.slice(0, 5).map((cuisine) => {
              return <FormCheckbox label={cuisine} key={cuisine} />
            })}
          </Stack>
        </Col>

        <Col xs={6} lg={3}>
          <Stack gap={2}>
            {popularCuisines.slice(5, 10).map((cuisine) => {
              return <FormCheckbox label={cuisine} key={cuisine} />
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
            label: 'Cuisine 1',
            value: 'cuisine1',
          },
          {
            label: 'Cuisine 2',
            value: 'cuisine2',
          },
          {
            label: 'Cuisine 3',
            value: 'cuisine3',
          },
        ]}
        // value={}
        // onChange={}
        aria-label="select-more-cuisines"
        placeholder={'Search for more cuisines'}
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
          <div>What I like</div>

          <Select
            className="dietary-preferences-form-select mt-3"
            isMulti
            components={SelectComponents}
            options={[
              {
                label: 'Ingredient 1',
                value: 'ingredient1',
              },
              {
                label: 'Ingredient 2',
                value: 'ingredient2',
              },
              {
                label: 'Ingredient 3',
                value: 'ingredient3',
              },
            ]}
            // value={}
            // onChange={}
            aria-label="preferred-ingrediences-select"
            placeholder={'Search for an ingredient'}
            styles={{
              control: (baseStyles) => ({
                ...baseStyles,
                minHeight: '50px',
              }),
            }}
          />
        </Col>

        <Col>
          <div>What I don't like</div>

          <Select
            className="dietary-preferences-form-select mt-3"
            isMulti
            components={SelectComponents}
            options={[
              {
                label: 'Ingredient 1',
                value: 'ingredient1',
              },
              {
                label: 'Ingredient 2',
                value: 'ingredient2',
              },
              {
                label: 'Ingredient 3',
                value: 'ingredient3',
              },
            ]}
            // value={}
            // onChange={}
            aria-label="disliked-ingrediences-select"
            placeholder={'Search for an ingredient'}
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
        <Form.Check id="option-1-radio-button">
          <Form.Check.Input
            type="radio"
            className="app-form-control app-form-checkbox"
          />
          <Form.Check.Label className="checkbox-label">
            Option 1
          </Form.Check.Label>
        </Form.Check>

        <Form.Check id="option-2-radio-button">
          <Form.Check.Input
            type="radio"
            className="app-form-control app-form-checkbox"
          />
          <Form.Check.Label className="checkbox-label">
            Option 2
          </Form.Check.Label>
        </Form.Check>

        <Form.Check id="option-3-radio-button">
          <Form.Check.Input
            type="radio"
            className="app-form-control app-form-checkbox"
          />
          <Form.Check.Label className="checkbox-label">
            Option 3
          </Form.Check.Label>
        </Form.Check>
      </Stack>
    </>
  )
}

export default TastesAndFoodPreparation
