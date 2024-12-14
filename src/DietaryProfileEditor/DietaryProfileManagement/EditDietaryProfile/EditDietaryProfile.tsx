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
    <div className="d-flex flex-column h-100">
      <div className="edit-profile-header">
        <EditProfileNavStepper />
      </div>

      <div className="edit-profile-main-content flex-fill">
        <div className="overflow-auto h-100">
          <Form>
            <AllergensAndIntolerances />
            <AllergensAndIntolerances />
            <AllergensAndIntolerances />
          </Form>
        </div>
      </div>

      <div className="edit-profile-footer">
        <EditProfileNavButtons />
      </div>
    </div>
  )
}

const EditDietaryProfile: React.FC = () => {
  return (
    <div className="edit-profile-screen">
      <div className="d-lg-none h-100">
        <EditProfileScreen />
      </div>

      <Row className="d-none d-lg-block position-relative edit-profile-large-screen h-100">
        <Col className="">
          <Card className="edit-profile-card position-absolute top-50 start-50 translate-middle">
            <Card.Body>
              <EditProfileScreen />
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </div>
  )
}

export default EditDietaryProfile
