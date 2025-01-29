import { FormattedMessage, useIntl } from 'react-intl'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Stack from 'react-bootstrap/Stack'
import FormCheckbox from '../FormCheckbox/FormCheckbox'
import Select from 'react-select'
import Form from 'react-bootstrap/Form'
import Slider from '@mui/material/Slider'

/**
 * Collects user data on their taste preferences.
 */
const TastesAndFoodPreparation: React.FC = () => {
  const intl = useIntl()

  const popularCuisines = [
    'Italian',
    'Indian',
    'French',
    'Chinese',
    'Middle Eastern',
    'Spanish',
    'Japanese',
    'Thai',
  ]

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

  const IngredientSelectComponents = {
    DropdownIndicator: () => null,
    IndicatorSeparator: () => null,
    // Menu: CustomSelectMenu,
  }

  type RadioButtonProps = {
    label: string
  }

  /**
   * Renders a radio button for selecting the user's food spiciness preference.
   */
  const RadioButton: React.FC<RadioButtonProps> = ({ label }) => {
    const inputId =
      label.replace(/,/g, '').replace(/\s/g, '-').toLowerCase() + '-radio'

    return (
      <Form.Check id={inputId}>
        <Form.Check.Input
          type="radio"
          className="app-form-control app-form-checkbox"
        />
        <Form.Check.Label className="checkbox-label">{label}</Form.Check.Label>
      </Form.Check>
    )
  }

  const spicinessSliderMarks = [
    {
      value: 0,
      label: 'Mild',
    },
    {
      value: 33,
      label: 'Medium',
    },
    {
      value: 66,
      label: 'Hot',
    },
    {
      value: 100,
      label: 'Extra hot',
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
            {popularCuisines.slice(0, 4).map((cuisine) => {
              return <FormCheckbox label={cuisine} key={cuisine} />
            })}
          </Stack>
        </Col>

        <Col xs={6} lg={3}>
          <Stack gap={2}>
            {popularCuisines.slice(4, 8).map((cuisine) => {
              return <FormCheckbox label={cuisine} key={cuisine} />
            })}
          </Stack>
        </Col>
      </Row>

      <Select
        className="dietary-preferences-form-select ms-2 mt-4"
        isMulti
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
        aria-label="more-cuisines-select"
        placeholder={'Select more cuisines'}
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
            components={IngredientSelectComponents}
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

        <Col className="pb-4">
          <div>What I don't like</div>

          <Select
            className="dietary-preferences-form-select mt-3"
            isMulti
            components={IngredientSelectComponents}
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
        <RadioButton
          label={intl.formatMessage({
            id: 'notSpecified',
            defaultMessage: 'Not specified',
          })}
          key="spiciness-radio-button-1"
        />

        <RadioButton
          label={intl.formatMessage({
            id: 'notAtAll',
            defaultMessage: 'Not at all',
          })}
          key="spiciness-radio-button-2"
        />

        <RadioButton
          label={intl.formatMessage({
            id: 'yesIDo',
            defaultMessage: 'Yes, I do',
          })}
          key="spiciness-radio-button-3"
        />

        <Row>
          <Col xs={12} lg={4}>
            <FormattedMessage
              id="howSpicyShouldFoodBe"
              defaultMessage="How spicy should it be?"
            />
          </Col>

          <Col xs={9} lg={4}>
            <Slider
              aria-label="spiciness-slider"
              getAriaValueText={valueLabelFormat}
              step={100 / 3}
              marks={spicinessSliderMarks}
              sx={{ marginLeft: '8pt', marginTop: '-3pt', color: '#2541b2' }}
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
        className="dietary-preferences-form-select ms-2 mt-4"
        isMulti
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
      />
    </>
  )
}

export default TastesAndFoodPreparation
