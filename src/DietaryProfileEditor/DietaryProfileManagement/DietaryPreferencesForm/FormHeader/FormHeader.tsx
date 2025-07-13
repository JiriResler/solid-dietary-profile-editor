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
          {formStep === 0 && (
            <FormattedMessage
              id="allergenPreferencesHeading"
              defaultMessage="Allergens"
            />
          )}

          {formStep === 1 && (
            <FormattedMessage
              id="dietPreferencesHeading"
              defaultMessage="Diets"
            />
          )}

          {formStep === 2 && (
            <FormattedMessage
              id="tastePreferencesHeading"
              defaultMessage="Taste Preferences"
            />
          )}
        </div>

        <div className="d-none d-md-flex next-step-heading text-secondary">
          <FormattedMessage id="nextStep" defaultMessage="Next: " />
          {formStep === 0 && (
            <FormattedMessage
              id="dietPreferencesHeading"
              defaultMessage="Diets"
            />
          )}
          {formStep === 1 && (
            <FormattedMessage
              id="tastePreferencesHeading"
              defaultMessage="Taste Preferences"
            />
          )}
        </div>
      </Col>

      <Col xs={4} lg={3} className="text-end">
        <CircularProgressBar
          currentStep={formStep}
          totalSteps={totalNumberOfSteps}
        />
      </Col>
    </Row>
  )
}

export default FormHeader
