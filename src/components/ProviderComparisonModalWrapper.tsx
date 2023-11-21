import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'

type Props = {
  showModal: boolean
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>
}

const ProviderComparisonModalWrapper: React.FC<Props> = ({
  showModal: showProvidersModal,
  setShowModal: setShowProvidersModal,
}) => {
  return (
    <Modal
      size="lg"
      centered
      show={showProvidersModal}
      onHide={() => {
        setShowProvidersModal(false)
      }}
    >
      <Modal.Body>
        Woohoo, you are reading this text in a modal! <br />
        <div className="mt-3 text-end">
          <Button
            variant="secondary"
            onClick={() => {
              setShowProvidersModal(false)
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
