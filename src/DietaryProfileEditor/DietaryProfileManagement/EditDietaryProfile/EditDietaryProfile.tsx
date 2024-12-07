import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import './EditDietaryProfile.css'
import EditProfileNavStepper from './EditProfileNavStepper/EditProfileNavStepper'
import EditProfileNavButtons from './EditProfileNavButtons/EditProfileNavButtons'
import Card from 'react-bootstrap/Card'

/**
 * Renders the edit profile screen with its header, main content and footer.
 */
function EditProfileScreen() {
  return (
    <>
      <Row className="edit-profile-header">
        <Col>
          <EditProfileNavStepper />
        </Col>
      </Row>

      <Row className="flex-fill mb-3">
        <Col>Main content</Col>
      </Row>

      <Row className="edit-profile-footer">
        <Col>
          <EditProfileNavButtons />
        </Col>
      </Row>
    </>
  )
}

const EditDietaryProfile: React.FC = () => {
  return (
    <>
      <Row className="d-lg-none edit-profile-small-screen bg-warning">
        <Col className="d-flex flex-column align-items-stretch bg-success">
          <EditProfileScreen />
        </Col>
      </Row>

      <Row className="d-none d-lg-flex">
        <Col className="edit-profile-large-screen position-relative">
          <Card className="edit-profile-card position-absolute top-50 start-50 translate-middle">
            <Card.Body className="d-flex flex-column align-items-stretch">
              <EditProfileScreen />
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </>
  )
}

export default EditDietaryProfile
