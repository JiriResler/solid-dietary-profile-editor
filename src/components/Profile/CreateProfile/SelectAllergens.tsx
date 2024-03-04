import Stack from 'react-bootstrap/Stack'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Form from 'react-bootstrap/Form'
import './SelectAllergens.css'
import { Allergen } from './profileDataTypes'
import { useState } from 'react'
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import Carousel from 'react-bootstrap/Carousel'

interface AllergenDescription extends Allergen {
  descriptionText: string
  imageUrl: string
}

type Props = {
  allergenArray: Allergen[]
  currentStep: number
  selectedAllergens: Set<Allergen>
  setSelectedAllergens: React.Dispatch<React.SetStateAction<Set<Allergen>>>
}

// responseJSON.results.bindings[0].desc.value

type AllergenResponse = {
  results: { bindings: Array<{ desc: { value: string } }> }
}

const SelectAllergens: React.FC<Props> = ({
  allergenArray,
  currentStep,
  selectedAllergens,
  setSelectedAllergens,
}) => {
  const [showAllergenDescriptionModal, setShowAllergenDescriptionModal] =
    useState(false)

  // Allergen with its description to show in a modal
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

  // Allergen IRIs are all from DBPedia
  // todo: add loading state when fetching data
  async function displayAllergenDescription(allergen: Allergen) {
    // Allergen IRI in DBPedia
    const allergenKnowledgeGraphIri = allergen.sameAsIri

    const endpointUrl = 'https://dbpedia.org/sparql'

    const sparqlQuery = `SELECT ?desc WHERE {
      <${allergenKnowledgeGraphIri}> rdfs:comment ?desc .
      FILTER (lang(?desc) = 'en') .
      }`

    const fullUrl = endpointUrl + '?query=' + encodeURIComponent(sparqlQuery)

    const headers = { Accept: 'application/sparql-results+json' }

    const response = await fetch(fullUrl, { headers })

    const responseJSON = (await response.json()) as AllergenResponse

    const descriptionText = responseJSON.results.bindings[0].desc.value

    const allergenDescription: AllergenDescription = {
      ...allergen,
      descriptionText: descriptionText,
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
            <Col key={allergen.iri} xs={6}>
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
                    void displayAllergenDescription(allergen)
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
            {allergenDescription.descriptionText}
            <Carousel
              fade
              indicators={false}
              interval={null}
              data-bs-theme="dark"
            >
              <Carousel.Item>
                <div className="carouselImgContainer mx-auto">
                  <img className="allergenDepiction" src="images/square.svg" />
                </div>
              </Carousel.Item>
              <Carousel.Item>
                <div className="carouselImgContainer mx-auto">
                  <img
                    className="allergenDepiction"
                    src="images/rect_wide.svg"
                  />
                </div>
              </Carousel.Item>
              <Carousel.Item>
                <div className="carouselImgContainer mx-auto">
                  <img
                    className="allergenDepiction"
                    src="images/rect_tall.svg"
                  />
                </div>
              </Carousel.Item>
            </Carousel>
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
