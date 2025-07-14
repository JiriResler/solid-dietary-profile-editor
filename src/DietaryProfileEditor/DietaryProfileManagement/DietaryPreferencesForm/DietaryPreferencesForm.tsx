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
import { auth } from '../../../firebase'
import {
  addStringEnglish,
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

export const SelectComponents = {
  DropdownIndicator: () => null,
  IndicatorSeparator: () => null,
}

/**
 * Renders controls of the dietary preferences form.
 */
const ActualDietaryPreferencesForm: React.FC = () => {
  const { session: solidSession } = useSession()

  const [firebaseUser] = useAuthState(auth)

  const signedInWithSolid = solidSession.info.isLoggedIn

  const signedInWithFirebase = firebaseUser !== null

  const [formStep, setFormStep] = useState(0)

  const totalNumberOfSteps = 3

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

    let dietaryProfile: SolidDataset

    try {
      // Attempt to retrieve the profile in case it already exists.
      dietaryProfile = await getSolidDataset(profileUrl, {
        fetch: solidSession.fetch as undefined,
      })

      // Clear the profile
      const items = getThingAll(dietaryProfile)
      items.forEach((item) => {
        dietaryProfile = removeThing(dietaryProfile, item)
      })
    } catch (error) {
      if (
        typeof (error as SolidPodResponseError).statusCode === 'number' &&
        (error as SolidPodResponseError).statusCode === 404
      ) {
        // If not found, create a new SolidDataset
        dietaryProfile = createSolidDataset()
      } else {
        console.error((error as Error).message)
        alert(
          'There was an error while saving the profile with the code ' +
            (error as SolidPodResponseError).statusCode,
        )
        return
      }
    }

    let user = createThing({ name: 'me' })

    user = addStringEnglish(
      user,
      'https://github.com/JiriResler/solid-choose-well-ontology/blob/main/choosewell#allergicTo',
      'testAllergenName',
    )

    dietaryProfile = setThing(dietaryProfile, user)

    await saveSolidDatasetAt(profileUrl, dietaryProfile, {
      fetch: solidSession.fetch as undefined,
    })

    alert('Profile saved')
  }

  /**
   * Saves user profile to Google Firestore.
   */
  function saveDietaryProfileFirebase() {}

  return (
    <div className="d-flex flex-column h-100">
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
        />
      </div>
    </div>
  )
}

/**
 * Displays a form that allows the user to input or update their dietary preferences and manages screen size adaptations for large or small displays.
 */
const DietaryPreferencesForm: React.FC = () => {
  return (
    <div className="dietary-preferences-form-screen">
      <div className="d-lg-none h-100 form-small-screen-container">
        <ActualDietaryPreferencesForm />
      </div>

      <div className="d-none d-lg-block h-100">
        <Row className="form-background-color position-relative h-100">
          <Col>
            <Card className="dietary-preferences-form-card position-absolute top-50 start-50 translate-middle">
              <Card.Body className="h-100">
                <ActualDietaryPreferencesForm />
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </div>
    </div>
  )
}

export default DietaryPreferencesForm
