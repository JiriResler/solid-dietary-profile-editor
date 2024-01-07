import { useState } from 'react'
import Button from 'react-bootstrap/Button'
import Stack from 'react-bootstrap/Stack'
import './CreateProfile.css'
import SelectAllergens from './SelectAllergens'
import CreateProfileNavigation from './CreateProfileNavigation'
import SelectDiets from './SelectDiets'
import { Allergen, TastePreferences } from './profileDataTypes'
import SelectMenuOption from './selectMenuOptionType'
import { LoginMethod } from '../loginMethodEnum'
import { useSession } from '@inrupt/solid-ui-react'
import { fetch } from '@inrupt/solid-client-authn-browser'
import {
  SolidDataset,
  addUrl,
  createSolidDataset,
  createThing,
  getPodUrlAll,
  getSolidDataset,
  getThingAll,
  removeThing,
  saveSolidDatasetAt,
  setThing,
} from '@inrupt/solid-client'
import SelectTastePreferences from './SelectTastePreferences'

type Props = {
  loginMethod: LoginMethod
}

const CreateProfile: React.FC<Props> = ({ loginMethod }) => {
  const { session } = useSession()

  const [currentStep, setCurrentStep] = useState(0)

  const numberOfSteps = 3

  const [selectedAllergens, setSelectedAllergens] = useState(
    new Set<Allergen>(),
  )

  const [selectedDiets, setSelectedDiets] = useState<
    ReadonlyArray<SelectMenuOption>
  >([])

  const [selectedTastePreferences, setSelectedTastePreferences] =
    useState<TastePreferences>({
      cuisines: [],
      desserts: '',
      spiciness: 0,
    })

  function saveProfile() {
    if (loginMethod === LoginMethod.SOLID) {
      void saveProfileSolid()
    }

    if (loginMethod === LoginMethod.FIREBASE) {
      saveProfileFirebase()
    }
  }

  async function saveProfileSolid() {
    const podUrl = await getPodUrl()

    const profileLocation = 'eatingPreferencesProfile/profile'

    const profileUrl = podUrl + profileLocation

    let eatingPreferencesProfile: SolidDataset

    try {
      // Attempt to retrieve the profile in case it already exists.
      eatingPreferencesProfile = await getSolidDataset(profileUrl, {
        fetch: fetch as undefined,
      })

      // Clear the profile
      const items = getThingAll(eatingPreferencesProfile)
      items.forEach((item) => {
        eatingPreferencesProfile = removeThing(eatingPreferencesProfile, item)
      })
    } catch (error) {
      if (typeof error.statusCode === 'number' && error.statusCode === 404) {
        // if not found, create a new SolidDataset
        eatingPreferencesProfile = createSolidDataset()
      } else {
        console.error(error.message)
      }
    }

    let user = createThing({ name: 'me' })

    for (const allergen of selectedAllergens) {
      user = addUrl(
        user,
        'https://github.com/JiriResler/solid-choose-well-ontology/blob/main/choosewell#allergicTo',
        allergen.IRI,
      )
    }

    for (const diet of selectedDiets) {
      user = addUrl(
        user,
        'https://github.com/JiriResler/solid-choose-well-ontology/blob/main/choosewell#isOnDiet',
        diet.value,
      )
    }

    eatingPreferencesProfile = setThing(eatingPreferencesProfile, user)

    await saveSolidDatasetAt(profileUrl, eatingPreferencesProfile, {
      fetch: fetch as undefined,
    })

    alert('Profile saved')
  }

  async function getPodUrl() {
    const userWebID: string =
      session.info.webId !== undefined ? session.info.webId : ''

    const podUrls = await getPodUrlAll(userWebID, {
      fetch: fetch as undefined,
    }).catch((error: Error) => console.log(error.message))

    const firstPodUrl = podUrls[0]

    return firstPodUrl
  }

  function saveProfileFirebase() {}

  return (
    <>
      <div className="mainContainer mt-3 mx-auto">
        {currentStep === 0 && (
          <Stack
            gap={3}
            className="welcome-screen-stack mt-5 text-center mx-auto"
          >
            <h1>Welcome!</h1>
            <div>
              You can create a new profile or import an already existing one.
            </div>
            <Button
              onClick={() => {
                setCurrentStep(currentStep + 1)
              }}
              className="welcome-screen-button mx-auto"
            >
              Create a new profile
            </Button>
            <Button className="welcome-screen-button mx-auto">
              Import an existing profile
            </Button>
          </Stack>
        )}

        {currentStep === 1 && (
          <SelectAllergens
            currentStep={currentStep}
            selectedAllergens={selectedAllergens}
            setSelectedAllergens={setSelectedAllergens}
          />
        )}

        {currentStep === 2 && (
          <SelectDiets
            currentStep={currentStep}
            selectedDiets={selectedDiets}
            setSelectedDiets={setSelectedDiets}
          />
        )}

        {currentStep === 3 && (
          <SelectTastePreferences
            currentStep={currentStep}
            selectedTastePreferences={selectedTastePreferences}
            setSelectedTastePreferences={setSelectedTastePreferences}
          />
        )}
      </div>

      <CreateProfileNavigation
        currentStep={currentStep}
        numberOfSteps={numberOfSteps}
        setCurrentStep={setCurrentStep}
        saveProfile={saveProfile}
      />
    </>
  )
}

export default CreateProfile
