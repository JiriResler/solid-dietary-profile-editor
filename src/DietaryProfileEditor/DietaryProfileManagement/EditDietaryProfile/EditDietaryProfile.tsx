import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import './EditDietaryProfile.css'
import EditProfileNavStepper from './EditProfileNavStepper/EditProfileNavStepper'
import EditProfileNavButtons from './EditProfileNavButtons/EditProfileNavButtons'
import Card from 'react-bootstrap/Card'
import AllergensAndIntolerances from './AllergensAndIntolerances/AllergensAndIntolerances'
import Form from 'react-bootstrap/Form'

/**
 * Renders the edit profile screen with its header, main content and footer.
 */
function EditProfileScreen() {
  return (
    <div className="d-flex flex-column align-items-stretch h-100">
      <Row className="edit-profile-header">
        <Col>
          <EditProfileNavStepper />
        </Col>
      </Row>

      <Row className="flex-fill mb-3 border">
        <Col>
          <Form>
            <AllergensAndIntolerances />
          </Form>
        </Col>
      </Row>

      <Row className="edit-profile-footer">
        <Col>
          <EditProfileNavButtons />
        </Col>
      </Row>
    </div>
  )
}

const EditDietaryProfile: React.FC = () => {
  return (
    <>
      <Row className="d-lg-none edit-profile-small-screen mt-3">
        <Col>
          <EditProfileScreen />
        </Col>
      </Row>

      <Row className="d-none d-lg-flex">
        <Col className="edit-profile-large-screen position-relative">
          <Card className="edit-profile-card position-absolute top-50 start-50 translate-middle">
            <Card.Body>
              <EditProfileScreen />
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </>
  )
}

export default EditDietaryProfile
