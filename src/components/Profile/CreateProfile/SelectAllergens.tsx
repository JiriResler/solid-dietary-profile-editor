import Stack from 'react-bootstrap/Stack'
import Form from 'react-bootstrap/Form'
import './SelectAllergens.css'
import { Allergen } from './profileDataTypes'
import { useEffect, useState } from 'react'
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import Carousel from 'react-bootstrap/Carousel'
import loadAllergenList from './loadProfileCreationData'
import { FormattedMessage } from 'react-intl'
import { useContext } from 'react'
import LanguageContext from '../../../LanguageContext'

interface AllergenDescription extends Allergen {
  descriptionText: string
  imageUrl: string
}

type Props = {
  selectedAllergens: string[]
  setSelectedAllergens: React.Dispatch<React.SetStateAction<string[]>>
}

// responseJSON.results.bindings[0].desc.value

type AllergenResponse = {
  results: { bindings: Array<{ desc: { value: string } }> }
}

const SelectAllergens: React.FC<Props> = ({
  selectedAllergens,
  setSelectedAllergens,
}) => {
  const { selectedLanguage } = useContext(LanguageContext)

  // Allergen data loaded from the internet to display to the user.
  const [allergenDisplayList, setAllergenDisplayList] = useState<Allergen[]>([])

  const [showAllergenDescriptionModal, setShowAllergenDescriptionModal] =
    useState(false)

  // Allergen with its description to show in modal.
  const [allergenDescription, setAllergenDescription] =
    useState<AllergenDescription | null>(null)

  useEffect(() => {
    loadAllergenList(selectedLanguage)
      .then((allergenList) => {
        setAllergenDisplayList(allergenList)
      })
      .catch((error) => {
        alert(
          'Could not load data. For more information check the developer console.',
        )
        console.error(error)
      })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // Adds or removes an Allergen IRI from selected allergens.
  function handleAllergenCheckboxOnChange(allergen: Allergen) {
    let newSelectedAllergens = Array.from(selectedAllergens)

    if (newSelectedAllergens.includes(allergen.iri)) {
      newSelectedAllergens = newSelectedAllergens.filter(
        (iri) => iri !== allergen.iri,
      )
    } else {
      newSelectedAllergens.push(allergen.iri)
    }

    setSelectedAllergens(newSelectedAllergens)
  }

  // Allergen IRIs are all from DBPedia
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
      <h3 className="mb-3">
        <FormattedMessage
          id="whatAreYouAllergicTo"
          defaultMessage="What are you allergic to?"
        />
      </h3>

      {allergenDisplayList.length === 0 && <span>Loading data...</span>}

      {allergenDisplayList.map((allergen: Allergen) => {
        return (
          <Stack
            direction="horizontal"
            gap={3}
            className="allergen-horizontal-stack mx-auto mt-2"
          >
            <Form.Check
              checked={selectedAllergens.includes(allergen.iri)}
              onChange={() => {
                handleAllergenCheckboxOnChange(allergen)
              }}
              type="checkbox"
            />
            <img src={allergen.iconUrl} className="allergen-icon" />
            <span className="w-50 text-start">
              {allergen.currentLanguageLabel}
            </span>
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
              <div>{allergenDescription.currentLanguageLabel}</div>
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
