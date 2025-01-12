import './TastesAndFoodPreparation.css'
import { FormattedMessage } from 'react-intl'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Stack from 'react-bootstrap/Stack'
import FormCheckbox from '../FormCheckbox/FormCheckbox'

/**
 *
 */
const TastesAndFoodPreparation: React.FC = () => {
  const popularCuisines = [
    'Italian',
    'Indian',
    'French',
    'Chinese',
    'Middle',
    'Spanish',
    'Japanese',
    'Thai',
    'Mexican',
    'Korean',
  ]

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
    </>
  )
}

export default TastesAndFoodPreparation
