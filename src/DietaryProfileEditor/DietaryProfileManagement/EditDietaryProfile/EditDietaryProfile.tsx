import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import './EditDietaryProfile.css'
import EditProfileNavStepper from './EditProfileNavStepper/EditProfileNavStepper'
import EditProfileNavButtons from './EditProfileNavButtons/EditProfileNavButtons'

const EditDietaryProfile: React.FC = () => {
  return (
    <>
      <Row className="edit-profile-header">
        <Col>
          <EditProfileNavStepper />
        </Col>
      </Row>

      <Row className="edit-profile-main-content">
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

export default EditDietaryProfile
