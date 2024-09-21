import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'

type Props = {
  showProvidersModal: boolean
  setShowProvidersModal: React.Dispatch<React.SetStateAction<boolean>>
}

const ProviderComparisonModalWrapper: React.FC<Props> = ({
  showProvidersModal: showModal,
  setShowProvidersModal: setShowModal,
}) => {
  return (
    <Modal
      size="lg"
      centered
      show={showModal}
      onHide={() => {
        setShowModal(false)
      }}
    >
      <Modal.Body>
        Woohoo, you are reading this text in a modal! <br />
        <div className="mt-3 text-end">
          <Button
            variant="secondary"
            onClick={() => {
              setShowModal(false)
            }}
          >
            Close
          </Button>
        </div>
      </Modal.Body>
    </Modal>
  )
}

export default ProviderComparisonModalWrapper
