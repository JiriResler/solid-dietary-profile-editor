import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import { FormattedMessage } from 'react-intl'
import './LoginErrorModal.css'

type LoginErrorModalProps = {
  show: boolean
  setShow: React.Dispatch<React.SetStateAction<boolean>>
  message: string
}

const LoginErrorModal: React.FC<LoginErrorModalProps> = ({
  show,
  setShow,
  message,
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

          <FormattedMessage id="loginFailed" defaultMessage="Login failed" />
        </Modal.Title>
      </Modal.Header>

      <Modal.Body className="modal-body">{message}</Modal.Body>

      <Modal.Footer>
        <Button variant="secondary" onClick={() => setShow(false)}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  )
}

export default LoginErrorModal
