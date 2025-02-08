import Button from 'react-bootstrap/Button'
import { FormattedMessage } from 'react-intl'
import './FormFooter.css'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

type FormFooterProps = {
  formStep: number
  setFormStep: React.Dispatch<React.SetStateAction<number>>
  totalNumberOfSteps: number
}

/**
 * Renders form navigation buttons and manages navigation state.
 */
const FormFooter: React.FC<FormFooterProps> = ({
  formStep,
  setFormStep,
  totalNumberOfSteps,
}) => {
  enum StepDirection {
    Up = 'up',
    Down = 'down',
  }

  /**
   * Updates the form step state, ensuring it stays within valid boundaries.
   */
  function handleStepChange(direction: StepDirection): void {
    if (direction === StepDirection.Up) {
      if (formStep >= totalNumberOfSteps - 1) {
        console.warn(
          `Cannot increase step beyond ${
            totalNumberOfSteps - 1
          }. There are ${totalNumberOfSteps} steps in total.`,
        )
        return
      }
      setFormStep(formStep + 1)
    } else if (direction === StepDirection.Down) {
      if (formStep <= 0) {
        console.warn(`Cannot decrease step below 0.`)
        return
      }
      setFormStep(formStep - 1)
    }
  }

  return (
    <Row className="h-100 align-items-center">
      <Col>
        <Button
          className="navigation-button app-secondary-color-button"
          onClick={() => handleStepChange(StepDirection.Down)}
        >
          <FormattedMessage id="goBack" defaultMessage="Back" />
        </Button>
      </Col>

      <Col className="text-end">
        <Button
          className="navigation-button app-primary-color-button"
          onClick={() => handleStepChange(StepDirection.Up)}
        >
          <FormattedMessage id="nextStep" defaultMessage="Next" />
        </Button>
      </Col>
    </Row>
  )
}

export default FormFooter
