import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'

const LoginErrorModal: React.FC = () => {
  return (
    <Modal show={false} onHide={() => {}} centered>
      <Modal.Header closeButton>
        <Modal.Title>Login Error</Modal.Title>
      </Modal.Header>
      <Modal.Body>Woohoo, you are reading this text in a modal!</Modal.Body>
      <Modal.Footer>
        <Button className="secondary-button" onClick={() => {}}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  )
}

export default LoginErrorModal
