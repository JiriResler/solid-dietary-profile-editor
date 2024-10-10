import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'

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
            className="warning-icon pe-3"
          />
          Login Error
        </Modal.Title>
      </Modal.Header>

      <Modal.Body>{message}</Modal.Body>

      <Modal.Footer>
        <Button className="secondary-button" onClick={() => setShow(false)}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  )
}

export default LoginErrorModal
