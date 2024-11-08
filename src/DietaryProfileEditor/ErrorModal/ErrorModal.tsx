import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import { FormattedMessage } from 'react-intl'
import './ErrorModal.css'

type ErrorModalProps = {
  show: boolean
  setShow: React.Dispatch<React.SetStateAction<boolean>>
  titleMessage: string
  bodyMessage: string
}

const ErrorModal: React.FC<ErrorModalProps> = ({
  show,
  setShow,
  titleMessage,
  bodyMessage,
}) => {
  return (
    <Modal show={show} onHide={() => setShow(false)} centered>
      <Modal.Header closeButton>
        <Modal.Title>
          <img
            src="images/alert-warning.svg"
            alt="Solid logo"
            className="login-error-warning-icon pe-3"
          />
          {titleMessage}
        </Modal.Title>
      </Modal.Header>

      <Modal.Body className="modal-body">{bodyMessage}</Modal.Body>

      <Modal.Footer>
        <Button variant="secondary" onClick={() => setShow(false)}>
          <FormattedMessage id="close" defaultMessage="Close" />
        </Button>
      </Modal.Footer>
    </Modal>
  )
}

export default ErrorModal
