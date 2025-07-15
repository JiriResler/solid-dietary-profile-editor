import './DietaryPreferencesForm.css'
import Card from 'react-bootstrap/Card'
import Form from 'react-bootstrap/Form'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import FormHeader from './FormHeader/FormHeader'
import SelectAllergens from './SelectAllergens/SelectAllergens'
import FormFooter from './FormFooter/FormFooter'
import SelectDietPreferences from './SelectDietPreferences/SelectDietPreferences'
import SelectTastePreferences from './SelectTastePreferences/SelectTastePreferences'
import React, { useState } from 'react'
import reactSelectOption from './reactSelectOption'
import { useSession } from '@inrupt/solid-ui-react'
import { useAuthState } from 'react-firebase-hooks/auth'
import { auth, db } from '../../../firebase'
import { FOAF, RDF } from '@inrupt/vocab-common-rdf'
import {
  addInteger,
  addStringEnglish,
  addUrl,
  createSolidDataset,
  createThing,
  getPodUrlAll,
  getSolidDataset,
  getThingAll,
  removeThing,
  saveSolidDatasetAt,
  setThing,
  SolidDataset,
} from '@inrupt/solid-client'
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import { FormattedMessage } from 'react-intl'
import { collection, addDoc } from 'firebase/firestore'

export const SelectComponents = {
  DropdownIndicator: () => null,
  IndicatorSeparator: () => null,
}

type ActualDietaryPreferencesFormProps = {
  setEditProfile: React.Dispatch<React.SetStateAction<boolean>>
}

/**
 * Renders controls of the dietary preferences form.
 */
const ActualDietaryPreferencesForm: React.FC<
  ActualDietaryPreferencesFormProps
> = ({ setEditProfile }) => {
  const { session: solidSession } = useSession()

  const [firebaseUser] = useAuthState(auth)

  const signedInWithSolid = solidSession.info.isLoggedIn

  const signedInWithFirebase = firebaseUser !== null

  const [formStep, setFormStep] = useState(0)

  const totalNumberOfSteps = 3

  const [profileSavingInProgress, setProfileSavingInProgress] = useState(false)

  const [showSaveProfileSuccessModal, setShowSaveProfileSuccessModal] =
    useState(false)

  const [selectedAllergens, setSelectedAllergens] = useState<string[]>([])

  const [selectedDiets, setSelectedDiets] = useState<string[]>([])
  const [selectedDietsSearch, setSelectedDietsSearch] = useState<
    ReadonlyArray<reactSelectOption>
  >([])

  const [calorieIntakeGoal, setCalorieIntakeGoal] = useState(0)

  const [selectedCuisines, setSelectedCuisines] = useState<string[]>([])
  const [selectedCuisinesSearch, setSelectedCuisinesSearch] = useState<
    ReadonlyArray<reactSelectOption>
  >([])

  const [selectedLikedIngredients, setSelectedLikedIngredients] = useState<
    ReadonlyArray<reactSelectOption>
  >([])

  const [selectedDislikedIngredients, setSelectedDislikedIngredients] =
    useState<ReadonlyArray<reactSelectOption>>([])

  const [spicinessRadioSelected, setSpicinessRadioSelected] =
    useState('unspecified')

  const [spicinessLevelSliderValue, setSpicinessLevelSliderValue] = useState(0)

  const [selectedCookingMethods, setSelectedCookingMethods] = useState<
    string[]
  >([])
  const [selectedCookingMethodsSearch, setSelectedCookingMethodsSearch] =
    useState<ReadonlyArray<reactSelectOption>>([])

  interface SolidPodResponseError extends Error {
    statusCode?: number
  }

  /**
   * Saves user profile when submit form button is pressed.
   */
  function handleFormSubmit() {
    if (signedInWithSolid) {
      void saveDietaryProfileSolid()
    }

    if (signedInWithFirebase) {
      saveDietaryProfileFirebase()
    }
  }

  /**
   * Saves user profile to a Solid Pod.
   */
  async function saveDietaryProfileSolid() {
    setProfileSavingInProgress(true)

    const userWebId = solidSession.info.webId

    if (userWebId === undefined) {
      return
    }

    const podUrls = await getPodUrlAll(userWebId, {
      fetch: solidSession.fetch as undefined,
    })

    const podUrl = podUrls[0]

    const dietaryProfileLocation =
      'dietary-profile-editor-application/dietary-profile'

    const profileUrl = podUrl + dietaryProfileLocation

    let dietaryProfileDataset: SolidDataset

    try {
      // Attempt to retrieve the profile in case it already exists.
      dietaryProfileDataset = await getSolidDataset(profileUrl, {
        fetch: solidSession.fetch as undefined,
      })

      // Clear the profile
      const items = getThingAll(dietaryProfileDataset)
      items.forEach((item) => {
        dietaryProfileDataset = removeThing(dietaryProfileDataset, item)
      })
    } catch (error) {
      if (
        typeof (error as SolidPodResponseError).statusCode === 'number' &&
        (error as SolidPodResponseError).statusCode === 404
      ) {
        // If not found, create a new SolidDataset
        dietaryProfileDataset = createSolidDataset()
      } else {
        console.error((error as Error).message)
        alert(
          'There was an error while saving the profile with the code ' +
            (error as SolidPodResponseError).statusCode,
        )
        setProfileSavingInProgress(false)
        return
      }
    }

    // Create a Thing with the same IRI as the profile file on Pod
    let dietaryProfileThing = createThing({ name: '' })

    const ontologyIri =
      'https://jiriresler.solidcommunity.net/public/dietary-profile-and-customized-menus-ontology#'

    dietaryProfileThing = addUrl(
      dietaryProfileThing,
      RDF.type,
      ontologyIri + 'DietaryProfile',
    )

    dietaryProfileThing = addUrl(dietaryProfileThing, FOAF.maker, userWebId)

    for (const allergenIri of selectedAllergens) {
      dietaryProfileThing = addUrl(
        dietaryProfileThing,
        ontologyIri + 'allergicTo',
        allergenIri,
      )
    }

    for (const dietIri of selectedDiets) {
      dietaryProfileThing = addUrl(
        dietaryProfileThing,
        ontologyIri + 'onDiet',
        dietIri,
      )
    }

    for (const dietOption of selectedDietsSearch) {
      dietaryProfileThing = addUrl(
        dietaryProfileThing,
        ontologyIri + 'onDiet',
        dietOption.value,
      )
    }

    if (calorieIntakeGoal > 0) {
      dietaryProfileThing = addInteger(
        dietaryProfileThing,
        ontologyIri + 'dailyCalorieIntakeGoal',
        calorieIntakeGoal,
      )
    }

    for (const cuisineIri of selectedCuisines) {
      dietaryProfileThing = addUrl(
        dietaryProfileThing,
        ontologyIri + 'favoriteCuisine',
        cuisineIri,
      )
    }

    for (const cuisineOption of selectedCuisinesSearch) {
      dietaryProfileThing = addUrl(
        dietaryProfileThing,
        ontologyIri + 'favoriteCuisine',
        cuisineOption.value,
      )
    }

    for (const ingredientOption of selectedLikedIngredients) {
      dietaryProfileThing = addUrl(
        dietaryProfileThing,
        ontologyIri + 'likedIngredient',
        ingredientOption.value,
      )
    }

    for (const ingredientOption of selectedDislikedIngredients) {
      dietaryProfileThing = addUrl(
        dietaryProfileThing,
        ontologyIri + 'dislikedIngredient',
        ingredientOption.value,
      )
    }

    if (spicinessRadioSelected !== 'unspecified') {
      if (spicinessRadioSelected === 'negative') {
        dietaryProfileThing = addStringEnglish(
          dietaryProfileThing,
          ontologyIri + 'foodSpicinessPreference',
          'not-spicy',
        )
      }

      if (spicinessRadioSelected === 'positive') {
        if (spicinessLevelSliderValue === 0) {
          dietaryProfileThing = addStringEnglish(
            dietaryProfileThing,
            ontologyIri + 'foodSpicinessPreference',
            'mild',
          )
        }

        if (spicinessLevelSliderValue >= 33 && spicinessLevelSliderValue < 66) {
          dietaryProfileThing = addStringEnglish(
            dietaryProfileThing,
            ontologyIri + 'foodSpicinessPreference',
            'medium',
          )
        }

        if (
          spicinessLevelSliderValue >= 66 &&
          spicinessLevelSliderValue < 100
        ) {
          dietaryProfileThing = addStringEnglish(
            dietaryProfileThing,
            ontologyIri + 'foodSpicinessPreference',
            'hot',
          )
        }

        if (spicinessLevelSliderValue === 100) {
          dietaryProfileThing = addStringEnglish(
            dietaryProfileThing,
            ontologyIri + 'foodSpicinessPreference',
            'extra-hot',
          )
        }
      }
    }

    for (const cookingMethodIri of selectedCookingMethods) {
      dietaryProfileThing = addUrl(
        dietaryProfileThing,
        ontologyIri + 'preferredCookingMethod',
        cookingMethodIri,
      )
    }

    for (const cookingMethodOption of selectedCookingMethodsSearch) {
      dietaryProfileThing = addUrl(
        dietaryProfileThing,
        ontologyIri + 'preferredCookingMethod',
        cookingMethodOption.value,
      )
    }

    dietaryProfileDataset = setThing(dietaryProfileDataset, dietaryProfileThing)

    await saveSolidDatasetAt(profileUrl, dietaryProfileDataset, {
      fetch: solidSession.fetch as undefined,
    })

    setShowSaveProfileSuccessModal(true)
  }

  /**
   * Saves user profile to Google Firestore.
   */
  function saveDietaryProfileFirebase() {
    setProfileSavingInProgress(true)

    addDoc(collection(db, 'users'), {
      first: 'Ada',
      last: 'Lovelace',
      born: 1815,
    })
      .then(() => {
        setShowSaveProfileSuccessModal(true)
      })
      .catch((error) => {
        console.error(error)
      })
      .finally(() => {
        setProfileSavingInProgress(false)
      })
  }

  return (
    <div className="d-flex flex-column h-100">
      <Modal
        show={showSaveProfileSuccessModal}
        onHide={() => {
          setProfileSavingInProgress(false)
          setEditProfile(false)
          setShowSaveProfileSuccessModal(false)
        }}
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>
            <FormattedMessage
              id="saveProfileSuccessfulTitle"
              defaultMessage="Operation successful"
            />
          </Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <FormattedMessage
            id="profileSavedSuccessfully"
            defaultMessage={'Profile saved successfully'}
          />
        </Modal.Body>

        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={() => {
              setProfileSavingInProgress(false)
              setEditProfile(false)
              setShowSaveProfileSuccessModal(false)
            }}
          >
            <FormattedMessage id="closeModal" defaultMessage="Close" />
          </Button>
        </Modal.Footer>
      </Modal>

      <div>
        <FormHeader
          formStep={formStep}
          totalNumberOfSteps={totalNumberOfSteps}
        />
      </div>

      <div className="form-main-content flex-fill mt-1 mb-3">
        <div className="overflow-content h-100" tabIndex={-1}>
          <Form>
            {formStep === 0 && (
              <SelectAllergens
                selectedAllergens={selectedAllergens}
                setSelectedAllergens={setSelectedAllergens}
              />
            )}
            {formStep === 1 && (
              <SelectDietPreferences
                selectedDiets={selectedDiets}
                setSelectedDiets={setSelectedDiets}
                selectedDietsSearch={selectedDietsSearch}
                setSelectedDietsSearch={setSelectedDietsSearch}
                calorieIntakeGoal={calorieIntakeGoal}
                setCalorieIntakeGoal={setCalorieIntakeGoal}
              />
            )}
            {formStep === 2 && (
              <SelectTastePreferences
                selectedCuisines={selectedCuisines}
                setSelectedCuisines={setSelectedCuisines}
                selectedCuisinesSearch={selectedCuisinesSearch}
                setSelectedCuisinesSearch={setSelectedCuisinesSearch}
                selectedLikedIngredients={selectedLikedIngredients}
                setSelectedLikedIngredients={setSelectedLikedIngredients}
                selectedDislikedIngredients={selectedDislikedIngredients}
                setSelectedDislikedIngredients={setSelectedDislikedIngredients}
                spicinessRadioSelected={spicinessRadioSelected}
                setSpicinessRadioSelected={setSpicinessRadioSelected}
                spicinessLevelSliderValue={spicinessLevelSliderValue}
                setSpicinessLevelSliderValue={setSpicinessLevelSliderValue}
                selectedCookingMethods={selectedCookingMethods}
                setSelectedCookingMethods={setSelectedCookingMethods}
                selectedCookingMethodsSearch={selectedCookingMethodsSearch}
                setSelectedCookingMethodsSearch={
                  setSelectedCookingMethodsSearch
                }
              />
            )}
          </Form>
        </div>
      </div>

      <div>
        <FormFooter
          formStep={formStep}
          setFormStep={setFormStep}
          totalNumberOfSteps={totalNumberOfSteps}
          handleFormSubmit={handleFormSubmit}
          profileSavingInProgress={profileSavingInProgress}
        />
      </div>
    </div>
  )
}

type DietaryPreferencesFormProps = {
  setEditProfile: React.Dispatch<React.SetStateAction<boolean>>
}

/**
 * Displays a form that allows the user to input or update their dietary preferences and manages screen size adaptations for large or small displays.
 */
const DietaryPreferencesForm: React.FC<DietaryPreferencesFormProps> = ({
  setEditProfile,
}) => {
  return (
    <div className="dietary-preferences-form-screen">
      <div className="d-lg-none h-100 form-small-screen-container">
        <ActualDietaryPreferencesForm setEditProfile={setEditProfile} />
      </div>

      <div className="d-none d-lg-block h-100">
        <Row className="form-background-color position-relative h-100">
          <Col>
            <Card className="dietary-preferences-form-card position-absolute top-50 start-50 translate-middle">
              <Card.Body className="h-100">
                <ActualDietaryPreferencesForm setEditProfile={setEditProfile} />
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </div>
    </div>
  )
}

export default DietaryPreferencesForm
