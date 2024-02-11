import Stack from 'react-bootstrap/Stack'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Form from 'react-bootstrap/Form'
import './SelectAllergens.css'
import { Allergen } from './profileDataTypes'
import { useState } from 'react'
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'

type Props = {
  allergenArray: Allergen[]
  currentStep: number
  selectedAllergens: Set<Allergen>
  setSelectedAllergens: React.Dispatch<React.SetStateAction<Set<Allergen>>>
}

const SelectAllergens: React.FC<Props> = ({
  allergenArray,
  currentStep,
  selectedAllergens,
  setSelectedAllergens,
}) => {
  const [showAllergenDetail, setShowAllergenDetail] = useState(false)

  const [allergenInfo, setAllergenInfo] = useState<Allergen | null>(null)

  function handleCheckboxOnChange(allergen: Allergen) {
    const newAllergenSet = new Set(selectedAllergens)

    if (newAllergenSet.has(allergen)) {
      newAllergenSet.delete(allergen)
    } else {
      newAllergenSet.add(allergen)
    }

    setSelectedAllergens(newAllergenSet)
  }

  return (
    <>
      <h1>{currentStep}. What are you allergic to?</h1>

      <Row>
        {allergenArray.map((allergen: Allergen) => {
          return (
            <Col key={allergen.IRI} xs={6}>
              <Stack direction="horizontal" gap={2}>
                <Form.Check
                  checked={selectedAllergens.has(allergen)}
                  onChange={() => {
                    handleCheckboxOnChange(allergen)
                  }}
                  type="checkbox"
                />
                <img src={allergen.iconUrl} className="allergen-icon" />
                <div>{allergen.label}</div>
                <img
                  src="images/info_icon.svg"
                  alt="information icon"
                  onClick={() => {
                    setAllergenInfo(allergen)
                    setShowAllergenDetail(true)
                  }}
                />
              </Stack>
            </Col>
          )
        })}
      </Row>

      {allergenInfo !== null && (
        <Modal
          size="lg"
          centered
          show={showAllergenDetail}
          onHide={() => {
            setShowAllergenDetail(false)
          }}
        >
          <Modal.Body>
            {allergenInfo.label +
              ' has number ' +
              allergenInfo.menuLegendNumber}

            <div className="mt-3 text-end">
              <Button
                variant="secondary"
                onClick={() => {
                  setShowAllergenDetail(false)
                }}
              >
                Close
              </Button>
            </div>
          </Modal.Body>
        </Modal>
      )}
    </>
  )
}

export default SelectAllergens
