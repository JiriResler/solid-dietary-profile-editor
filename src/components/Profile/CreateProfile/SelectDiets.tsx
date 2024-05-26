import Stack from 'react-bootstrap/Stack'
import Form from 'react-bootstrap/Form'
import { Diet } from './profileDataTypes'
import { useEffect, useState, useContext } from 'react'
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import Carousel from 'react-bootstrap/Carousel'
import './SelectDiets.css'
import { FormattedMessage } from 'react-intl'
import LanguageContext from '../../../LanguageContext'
import selectSearchOptionType from './selectSearchOptionType'
import SearchForMoreDiets from './SearchForMoreDiets'
import { loadMostPopularDiets } from './loadProfileCreationData'

type Props = {
  selectedDiets: string[]
  setSelectedDiets: React.Dispatch<React.SetStateAction<string[]>>
  selectedDietOptions: ReadonlyArray<selectSearchOptionType>
  setSelectedDietOptions: React.Dispatch<
    React.SetStateAction<ReadonlyArray<selectSearchOptionType>>
  >
}

const SelectDiets: React.FC<Props> = ({
  selectedDiets,
  setSelectedDiets,
  selectedDietOptions,
  setSelectedDietOptions,
}) => {
  const { selectedLanguage } = useContext(LanguageContext)

  // A predefined list of diets loaded from the internet to display to the user.
  const [dietDisplayList, setDietDisplayList] = useState<Diet[]>([])

  const [loadingDietDisplayList, setLoadingDietDisplayList] = useState(false)

  const [showModal, setShowModal] = useState(false)

  const [showMoreDietOptions, setShowMoreDietOptions] = useState(false)

  useEffect(() => {
    setLoadingDietDisplayList(true)

    loadMostPopularDiets(selectedLanguage)
      .then((dietList) => {
        setDietDisplayList(dietList)
        setLoadingDietDisplayList(false)
      })
      .catch((error) => {
        alert(
          'Could not load diet data. For more information check the developer console.',
        )
        console.error(error)
      })

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // Adds or removes a Diet IRI from the array of selected diets.
  function handleDietCheckboxOnChange(diet: Diet) {
    let newSelectedDiets = Array.from(selectedDiets)

    if (newSelectedDiets.includes(diet.iri)) {
      newSelectedDiets = newSelectedDiets.filter((iri) => iri !== diet.iri)
    } else {
      newSelectedDiets.push(diet.iri)
    }

    setSelectedDiets(newSelectedDiets)
  }

  if (loadingDietDisplayList) {
    return <h1>Loading data</h1>
  }

  return (
    <>
      <Modal
        size="lg"
        centered
        show={showModal}
        onHide={() => {
          setShowModal(false)
        }}
      >
        <Modal.Header closeButton>
          <Modal.Title>Title</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <div>Body text</div>
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
                <img className="allergenDepiction" src="images/rect_wide.svg" />
              </div>
            </Carousel.Item>
            <Carousel.Item>
              <div className="carouselImgContainer mx-auto">
                <img className="allergenDepiction" src="images/rect_tall.svg" />
              </div>
            </Carousel.Item>
          </Carousel>
        </Modal.Body>

        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={() => {
              setShowModal(false)
            }}
          >
            Close
          </Button>
        </Modal.Footer>
      </Modal>

      <h3 className="mb-3">
        <FormattedMessage
          id="whichDietsAreYouOn"
          defaultMessage="Which diets are you on?"
        />
      </h3>

      {dietDisplayList.slice(0, 2).map((diet: Diet) => {
        return (
          <Stack
            direction="horizontal"
            gap={3}
            className="diet-horizontal-stack mx-auto mt-2"
          >
            <Form.Check
              checked={selectedDiets.includes(diet.iri)}
              onChange={() => {
                handleDietCheckboxOnChange(diet)
              }}
              type="checkbox"
            />
            <span className="w-50 text-start">{diet.currentLanguageLabel}</span>
            <img
              src="images/info_icon.svg"
              alt="information icon"
              className="onHoverPointer"
              onClick={() => {
                setShowModal(true)
              }}
            />
          </Stack>
        )
      })}

      <div
        onClick={() => setShowMoreDietOptions(!showMoreDietOptions)}
        className="onHoverPointer mt-4"
      >
        {showMoreDietOptions ? (
          <FormattedMessage
            id="showLessDietOptions"
            defaultMessage="Show less diet options"
          />
        ) : (
          <FormattedMessage
            id="showMoreDietOptions"
            defaultMessage="Show more diet options"
          />
        )}
      </div>

      {showMoreDietOptions && (
        <div className="mt-3">
          {dietDisplayList.slice(2).map((diet: Diet) => {
            return (
              <Stack
                direction="horizontal"
                gap={3}
                className="diet-horizontal-stack mx-auto mt-2"
              >
                <Form.Check
                  checked={selectedDiets.includes(diet.iri)}
                  onChange={() => {
                    handleDietCheckboxOnChange(diet)
                  }}
                  type="checkbox"
                />
                <span className="w-50 text-start">
                  {diet.currentLanguageLabel}
                </span>
                <img
                  src="images/info_icon.svg"
                  alt="information icon"
                  className="onHoverPointer"
                  onClick={() => {
                    setShowModal(true)
                  }}
                />
              </Stack>
            )
          })}

          {selectedLanguage === 'en' && (
            <>
              <h3 className="mt-3">
                <FormattedMessage
                  id="isYourDietNotListed"
                  defaultMessage="Is your diet not listed?"
                />
              </h3>

              <SearchForMoreDiets
                selectedDietOptions={selectedDietOptions}
                setSelectedDietOptions={setSelectedDietOptions}
              />
            </>
          )}
        </div>
      )}
    </>
  )
}

export default SelectDiets
