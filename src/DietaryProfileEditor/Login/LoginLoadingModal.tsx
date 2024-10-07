import CircularProgress from '@mui/material/CircularProgress'
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'

type LoginLoadingModalProps = {
  showLoadingModal: boolean
  setShowLoadingModal: React.Dispatch<React.SetStateAction<boolean>>
  loginError: boolean
}

const LoginLoadingModal: React.FC<LoginLoadingModalProps> = ({
  showLoadingModal,
  setShowLoadingModal,
  loginError,
}) => {
  return (
    <Modal show={showLoadingModal} centered>
      <Modal.Body className="text-center">
        <CircularProgress />
        <h3>Loading</h3>
      </Modal.Body>
      {loginError && (
        <>
          <Modal.Body>A login error occured.</Modal.Body>
          <Modal.Footer>
            <Button
              variant="secondary"
              onClick={() => setShowLoadingModal(false)}
            >
              Close
            </Button>
          </Modal.Footer>
        </>
      )}
    </Modal>
  )
}

export default LoginLoadingModal
