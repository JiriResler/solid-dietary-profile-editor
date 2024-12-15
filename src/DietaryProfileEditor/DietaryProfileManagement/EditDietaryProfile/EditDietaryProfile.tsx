import './EditDietaryProfile.css'
import EditProfileNavStepper from './EditProfileNavStepper/EditProfileNavStepper'
import EditProfileNavButtons from './EditProfileNavButtons/EditProfileNavButtons'
import Card from 'react-bootstrap/Card'
import AllergensAndIntolerances from './AllergensAndIntolerances/AllergensAndIntolerances'
import Form from 'react-bootstrap/Form'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

/**
 * Renders the edit profile screen with its header, main content and footer.
 */
function EditProfileScreen() {
  return (
    <div className="d-flex flex-column h-100">
      <div className="">
        <EditProfileNavStepper />
      </div>

      <div className="edit-profile-main-content flex-fill">
        <div className="overflow-content h-100">
          <Form>
            <AllergensAndIntolerances />
            <AllergensAndIntolerances />
            <AllergensAndIntolerances />
          </Form>
        </div>
      </div>

      <div className="">
        <EditProfileNavButtons />
      </div>
    </div>
  )
}

const EditDietaryProfile: React.FC = () => {
  return (
    <div className="edit-profile-screen">
      <div className="d-lg-none h-100 edit-profile-small-screen-container">
        <EditProfileScreen />
      </div>

      <div className="d-none d-lg-block h-100">
        <Row className="background-primary-color position-relative h-100">
          <Col>
            <Card className="edit-profile-card position-absolute top-50 start-50 translate-middle">
              <Card.Body className="h-100">
                <EditProfileScreen />
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </div>
    </div>
  )
}

export default EditDietaryProfile
