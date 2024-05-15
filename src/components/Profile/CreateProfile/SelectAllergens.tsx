import Stack from 'react-bootstrap/Stack'
import Form from 'react-bootstrap/Form'
import './SelectAllergens.css'
import { Allergen } from './profileDataTypes'
import { useEffect, useState } from 'react'
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import Carousel from 'react-bootstrap/Carousel'
import { loadAllergenList } from './loadProfileCreationData'

interface AllergenDescription extends Allergen {
  descriptionText: string
  imageUrl: string
}

type Props = {
  selectedAllergens: Set<Allergen>
  setSelectedAllergens: React.Dispatch<React.SetStateAction<Set<Allergen>>>
}

// responseJSON.results.bindings[0].desc.value

type AllergenResponse = {
  results: { bindings: Array<{ desc: { value: string } }> }
}

const SelectAllergens: React.FC<Props> = ({
  selectedAllergens,
  setSelectedAllergens,
}) => {
  const [showAllergenDescriptionModal, setShowAllergenDescriptionModal] =
    useState(false)

  // Array for storing a list of allergens loaded from the internet
  const [allergenList, setAllergenList] = useState<Allergen[]>([])

  // Allergen with its description to show in a modal
  const [allergenDescription, setAllergenDescription] =
    useState<AllergenDescription | null>(null)

  useEffect(() => {
    loadAllergenList()
      .then((value) => {
        if (value === undefined) {
          return
        }
        setAllergenList(value)
      })
      .catch((error) => console.error(error))
  }, [])

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
      <h3 className="mb-3">What are you allergic to?</h3>

      {allergenList.length === 0 && <span>Loading data...</span>}

      {allergenList.map((allergen: Allergen) => {
        return (
          <Stack
            direction="horizontal"
            gap={3}
            className="allergen-horizontal-stack mx-auto mt-2"
          >
            <Form.Check
              checked={selectedAllergens.has(allergen)}
              onChange={() => {
                handleCheckboxOnChange(allergen)
              }}
              type="checkbox"
            />
            <img src={allergen.iconUrl} className="allergen-icon" />
            <span className="w-50 text-start">{allergen.label}</span>
            <img
              src="images/info_icon.svg"
              alt="information icon"
              className="onHoverPointer"
              onClick={() => {
                void displayAllergenDescription(allergen)
              }}
            />
          </Stack>
        )
      })}

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
              <div className="legendNumberText">
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
              className="mt-3 pb-2"
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
