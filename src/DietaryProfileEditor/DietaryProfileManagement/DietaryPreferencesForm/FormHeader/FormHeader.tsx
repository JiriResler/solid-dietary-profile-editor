import * as React from 'react'
import './FormHeader.css'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import { FormattedMessage } from 'react-intl'
import CircularProgressBar from './CircularProgressBar/CircularProgressBar'

type FormHeaderProps = {
  formStep: number
  totalNumberOfSteps: number
}

/**
 * Displays information about the current step in the profile creation process.
 */
const FormHeader: React.FC<FormHeaderProps> = ({
  formStep,
  totalNumberOfSteps,
}) => {
  return (
    <Row className="h-100 align-items-center">
      <Col xs={8} lg={9}>
        <div className="current-step-heading">
          <FormattedMessage
            id="tastesAndFoodPreparation"
            defaultMessage="Tastes and Food Preparation"
          />
        </div>

        <div className="next-step-heading text-secondary">Next: Step 3</div>
      </Col>

      <Col xs={4} lg={3} className="text-end">
        <CircularProgressBar currentStep={formStep} />
      </Col>
    </Row>
  )
}

export default FormHeader
