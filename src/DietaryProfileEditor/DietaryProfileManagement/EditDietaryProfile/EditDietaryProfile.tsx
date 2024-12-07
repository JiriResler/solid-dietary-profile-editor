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
      <div className="d-lg-none">
        <EditProfileScreen />
      </div>

      <Row className="d-none d-lg-flex edit-profile-large-screen position-relative">
        <Col>
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
