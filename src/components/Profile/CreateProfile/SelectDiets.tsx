import Stack from 'react-bootstrap/Stack'
import Form from 'react-bootstrap/Form'
import { Diet } from './profileDataTypes'
import { useState } from 'react'
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import Carousel from 'react-bootstrap/Carousel'
import Select from 'react-select'
import './SelectDiets.css'
import { FormattedMessage } from 'react-intl'

const dietList: Diet[] = [
  {
    label: 'Vegetarian',
    iri: 'http://dbpedia.org/resource/Vegetarianism',
  },
  {
    label: 'Vegan',
    iri: 'http://dbpedia.org/resource/Veganism',
  },
  {
    label: 'Mediterranean',
    iri: 'http://dbpedia.org/resource/Mediterranean_diet',
  },
  {
    label: 'Ketogenic',
    iri: 'http://dbpedia.org/resource/Ketogenic_diet',
  },
  {
    label: 'Atkins',
    iri: 'http://dbpedia.org/resource/Atkins_diet',
  },
  {
    label: 'Paleolithic',
    iri: 'http://dbpedia.org/resource/Paleolithic_diet',
  },
  {
    label: 'Pescetarian',
    iri: 'http://dbpedia.org/resource/Pescetarianism',
  },
  {
    label: 'Raw',
    iri: 'http://dbpedia.org/resource/Raw_foodism',
  },
  {
    label: 'Fruitarian',
    iri: 'http://dbpedia.org/resource/Fruitarianism',
  },
  {
    label: 'Diabetic',
    iri: 'http://dbpedia.org/resource/Diet_in_diabetes',
  },
  {
    label: 'DASH',
    iri: 'http://dbpedia.org/resource/DASH_diet',
  },
  {
    label: 'MIND',
    iri: 'http://dbpedia.org/resource/MIND_diet',
  },
]

type Props = {
  selectedDiets: Set<Diet>
  setSelectedDiets: React.Dispatch<React.SetStateAction<Set<Diet>>>
}

const SelectDiets: React.FC<Props> = ({ selectedDiets, setSelectedDiets }) => {
  const [showModal, setShowModal] = useState(false)

  const [showMoreDietOptions, setShowMoreDietOptions] = useState(false)

  function handleCheckboxOnChange(diet: Diet) {
    const newDietSet = new Set(selectedDiets)

    if (newDietSet.has(diet)) {
      newDietSet.delete(diet)
    } else {
      newDietSet.add(diet)
    }

    setSelectedDiets(newDietSet)
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
      {dietList.slice(0, 2).map((diet: Diet) => {
        return (
          <Stack
            direction="horizontal"
            gap={3}
            className="diet-horizontal-stack mx-auto mt-2"
          >
            <Form.Check
              checked={selectedDiets.has(diet)}
              onChange={() => {
                handleCheckboxOnChange(diet)
              }}
              type="checkbox"
            />
            <span className="w-50 text-start">{diet.label}</span>
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
          {dietList.slice(2).map((diet: Diet) => {
            return (
              <Stack
                direction="horizontal"
                gap={3}
                className="diet-horizontal-stack mx-auto mt-2"
              >
                <Form.Check
                  checked={selectedDiets.has(diet)}
                  onChange={() => {
                    handleCheckboxOnChange(diet)
                  }}
                  type="checkbox"
                />
                <span className="w-50 text-start">{diet.label}</span>
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

          <h3 className="mt-3">
            <FormattedMessage
              id="isYourDietNotListed"
              defaultMessage="Is your diet not listed?"
            />
          </h3>

          <Select
            className="mt-3 w-75 mx-auto"
            options={[
              { value: 'val1', label: 'label1' },
              { value: 'val2', label: 'label2' },
            ]}
          />
        </div>
      )}
    </>
  )
}

export default SelectDiets
