import './DietaryPreferencesForm.css'
import Card from 'react-bootstrap/Card'
import Form from 'react-bootstrap/Form'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import DietaryPreferencesFormHeader from './DietaryPreferencesFormHeader/DietaryPreferencesFormHeader'
// import AllergensAndIntolerances from './AllergensAndIntolerances/AllergensAndIntolerances'
import DietaryPreferencesFormFooter from './DietaryPreferencesFormFooter/DietaryPreferencesFormFooter'
// import DietPreferences from './DietPreferences/DietPreferences'
import TastesAndFoodPreparation from './TastesAndFoodPreparation/TastesAndFoodPreparation'

/**
 * Renders the actual dietary preferences form, while the DietaryPreferencesForm component manages screen size adaptations for large or small displays.
 */
function ActualDietaryPreferencesForm() {
  return (
    <div className="d-flex flex-column h-100">
      <div>
        <DietaryPreferencesFormHeader />
      </div>

      <div className="form-main-content flex-fill mt-1 mb-3">
        <div className="overflow-content h-100" tabIndex={-1}>
          <Form>
            {/* <AllergensAndIntolerances /> */}
            {/* <DietPreferences /> */}
            <TastesAndFoodPreparation />
          </Form>
        </div>
      </div>

      <div>
        <DietaryPreferencesFormFooter />
      </div>
    </div>
  )
}

/**
 * Displays a form that allows the user to input or update their dietary preferences.
 */
const DietaryPreferencesForm: React.FC = () => {
  return (
    <div className="dietary-preferences-form-screen">
      <div className="d-lg-none h-100 form-small-screen-container">
        <ActualDietaryPreferencesForm />
      </div>

      <div className="d-none d-lg-block h-100">
        <Row className="background-primary-color position-relative h-100">
          <Col>
            <Card className="dietary-preferences-form-card position-absolute top-50 start-50 translate-middle">
              <Card.Body className="h-100">
                <ActualDietaryPreferencesForm />
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </div>
    </div>
  )
}

export default DietaryPreferencesForm
