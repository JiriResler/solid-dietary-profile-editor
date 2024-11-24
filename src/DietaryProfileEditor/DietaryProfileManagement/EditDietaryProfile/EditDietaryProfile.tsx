import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import './EditDietaryProfile.css'
import { useState } from 'react'
import EditProfileNavButtons from './EditProfileNavigation/EditProfileNavButtons'
import EditProfileNavStepper from './EditProfileNavStepper/EditProfileNavStepper'

const EditDietaryProfile: React.FC = () => {
  const [currentStep] = useState(0)

  return (
    <>
      <Row className="edit-profile-header bg-warning">
        <Col>
          <EditProfileNavStepper currentStep={currentStep} />
        </Col>
      </Row>

      <Row className="edit-profile-main-content bg-success">
        <Col>Main content</Col>
      </Row>

      <Row className="edit-profile-footer bg-danger">
        <Col>
          <EditProfileNavButtons />
        </Col>
      </Row>
    </>
  )
}

export default EditDietaryProfile
