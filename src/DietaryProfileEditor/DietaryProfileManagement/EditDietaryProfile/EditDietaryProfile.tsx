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
      <Row>
        <Col>
          <EditProfileNavStepper currentStep={currentStep} />
        </Col>
      </Row>

      <Row>
        <Col>Main content</Col>
      </Row>

      <Row>
        <Col>
          <EditProfileNavButtons />
        </Col>
      </Row>
    </>
  )
}

export default EditDietaryProfile
