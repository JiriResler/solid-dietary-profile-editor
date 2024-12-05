import Button from 'react-bootstrap/Button'
import { FormattedMessage } from 'react-intl'
import './EditProfileNavButtons.css'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

const EditProfileNavButtons: React.FC = () => {
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

export default EditProfileNavButtons
