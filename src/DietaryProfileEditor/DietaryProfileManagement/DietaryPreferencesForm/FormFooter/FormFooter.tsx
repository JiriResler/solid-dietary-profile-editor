import Button from 'react-bootstrap/Button'
import { FormattedMessage } from 'react-intl'
import './FormFooter.css'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

type FormFooterProps = {
  formStep: number
  setFormStep: React.Dispatch<React.SetStateAction<number>>
}

/**
 * Renders form navigation buttons and manages navigation state.
 */
const FormFooter: React.FC<FormFooterProps> = ({ formStep, setFormStep }) => {
  return (
    <Row className="h-100 align-items-center">
      <Col>
        <Button className="navigation-button app-secondary-color-button">
          <FormattedMessage id="goBack" defaultMessage="Back" />
        </Button>
      </Col>

      <Col className="text-end">
        <Button className="navigation-button app-primary-color-button">
          <FormattedMessage id="nextStep" defaultMessage="Next" />
        </Button>
      </Col>
    </Row>
  )
}

export default FormFooter
