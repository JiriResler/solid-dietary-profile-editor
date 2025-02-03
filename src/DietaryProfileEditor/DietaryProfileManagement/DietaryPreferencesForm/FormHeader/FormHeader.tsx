import * as React from 'react'
import './FormHeader.css'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import { FormattedMessage } from 'react-intl'
import CircularProgressBar from './CircularProgressBar/CircularProgressBar'

/**
 * Takes a step number and total steps as input and returns progress value in percentage.
 */
function calculateProgressValue(step: number, totalSteps: number): number {
  if (totalSteps <= 0) {
    console.error(
      `Invalid totalSteps value: ${totalSteps}. It must be greater than 0.`,
    )
    return 0
  }

  if (step < 0 || step >= totalSteps) {
    console.warn(
      `Dietary preferences form step number out of range. Expected a number between 0 and ${
        totalSteps - 1
      }, but got ${step}.`,
    )
    return 0
  }

  return Math.round(((step + 1) / totalSteps) * 100)
}

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
        <CircularProgressBar
          value={calculateProgressValue(formStep, totalNumberOfSteps)}
        />
      </Col>
    </Row>
  )
}

export default FormHeader
