import Stack from 'react-bootstrap/Stack'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Form from 'react-bootstrap/Form'
import './SelectAllergens.css'
import { Allergen } from './profileDataTypes'
import { useState } from 'react'
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'

interface AllergenDescription extends Allergen {
  description: string
  imageUrl: string
}

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
  const [showAllergenDescriptionModal, setShowAllergenDescriptionModal] =
    useState(false)

  const [allergenDescription, setAllergenDescription] =
    useState<AllergenDescription | null>(null)

  function handleCheckboxOnChange(allergen: Allergen) {
    const newAllergenSet = new Set(selectedAllergens)

    if (newAllergenSet.has(allergen)) {
      newAllergenSet.delete(allergen)
    } else {
      newAllergenSet.add(allergen)
    }

    setSelectedAllergens(newAllergenSet)
  }

  function displayAllergenDescription(allergen: Allergen) {
    const allergenDescription: AllergenDescription = {
      ...allergen,
      description:
        'Celery (Apium graveolens) is a marshland plant in the family Apiaceae that has been cultivated as a vegetable since antiquity. Celery has a long fibrous stalk tapering into leaves. Depending on location and cultivar, either its stalks, leaves or hypocotyl are eaten and used in cooking. Celery seed powder is used as a spice.',
      imageUrl:
        'https://upload.wikimedia.org/wikipedia/commons/a/a2/Celery_2.jpg',
    }

    // todo: add loading animation
    setShowAllergenDescriptionModal(true)

    setAllergenDescription(allergenDescription)
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
                    displayAllergenDescription(allergen)
                  }}
                />
              </Stack>
            </Col>
          )
        })}
      </Row>

      {allergenDescription !== null && (
        <Modal
          size="lg"
          centered
          show={showAllergenDescriptionModal}
          onHide={() => {
            setShowAllergenDescriptionModal(false)
          }}
        >
          <Modal.Header closeButton>
            <Modal.Title>
              <div>{allergenDescription.label}</div>
              <div>
                Menu legend number: {allergenDescription.menuLegendNumber}
              </div>
            </Modal.Title>
          </Modal.Header>

          <Modal.Body>
            {allergenDescription.description}
            <img className="w-50" src={allergenDescription.imageUrl} />
          </Modal.Body>

          <Modal.Footer>
            <Button
              variant="secondary"
              onClick={() => {
                setShowAllergenDescriptionModal(false)
              }}
            >
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      )}
    </>
  )
}

export default SelectAllergens
