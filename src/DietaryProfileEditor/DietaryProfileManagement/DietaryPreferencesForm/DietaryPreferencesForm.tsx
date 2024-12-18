import './DietaryPreferencesForm.css'
import Card from 'react-bootstrap/Card'
import Form from 'react-bootstrap/Form'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import EditProfileNavStepper from './EditProfileNavStepper/EditProfileNavStepper'
import AllergensAndIntolerances from './AllergensAndIntolerances/AllergensAndIntolerances'
import EditProfileNavButtons from './EditProfileNavButtons/EditProfileNavButtons'

/**
 * Renders the actual dietary preferences form while DietaryPreferencesForm handles whether to display it on a large or small screen.
 */
function ActualDietaryPreferencesForm() {
  return (
    <div className="d-flex flex-column h-100">
      <div>
        <EditProfileNavStepper />
      </div>

      <div className="edit-profile-main-content flex-fill mt-1 mb-3">
        <div className="overflow-content h-100">
          <Form>
            <AllergensAndIntolerances />
            <AllergensAndIntolerances />
            <AllergensAndIntolerances />
          </Form>
        </div>
      </div>

      <div>
        <EditProfileNavButtons />
      </div>
    </div>
  )
}

/**
 * Displays a form for the user to fill in their dietary preferences.
 */
const DietaryPreferencesForm: React.FC = () => {
  return (
    <div className="edit-profile-screen">
      <div className="d-lg-none h-100 edit-profile-small-screen-container">
        <ActualDietaryPreferencesForm />
      </div>

      <div className="d-none d-lg-block h-100">
        <Row className="background-primary-color position-relative h-100">
          <Col>
            <Card className="edit-profile-card position-absolute top-50 start-50 translate-middle">
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
