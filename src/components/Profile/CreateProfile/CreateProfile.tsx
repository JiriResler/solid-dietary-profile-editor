import { useState } from 'react'
import { auth } from '../../../firebase'
import Button from 'react-bootstrap/Button'
import Stack from 'react-bootstrap/Stack'
import './CreateProfile.css'
import SelectAllergens from './SelectAllergens'
import SelectDiets from './SelectDiets'
import { Diet, TastePreferences } from './profileDataTypes'
import { LoginMethod } from '../../loginMethodEnum'
import { useSession } from '@inrupt/solid-ui-react'
import SelectTastePreferences from './SelectTastePreferences'
import { saveProfileFirebase, saveProfileSolid } from './saveProfile'
import Stepper from '@mui/material/Stepper'
import Step from '@mui/material/Step'
import StepLabel from '@mui/material/StepLabel'
import Container from 'react-bootstrap/Container'
import { FormattedMessage } from 'react-intl'

type Props = {
  loginMethod: LoginMethod
  setEditProfile: React.Dispatch<React.SetStateAction<boolean>>
  startStep: number
}

const CreateProfile: React.FC<Props> = ({
  loginMethod,
  startStep,
  setEditProfile,
}) => {
  const { session } = useSession()

  const steps = ['Allergens', 'Diets', 'Taste preferences']

  const [currentStep, setCurrentStep] = useState(startStep)

  // An array of allergen URLs currently selected by the user.
  const [selectedAllergens, setSelectedAllergens] = useState<string[]>([])

  const [selectedDiets, setSelectedDiets] = useState(new Set<Diet>())

  const [selectedTastePreferences, setSelectedTastePreferences] =
    useState<TastePreferences>({
      cuisines: [],
      desserts: [],
      spiciness: [],
    })

  function saveProfile() {
    if (loginMethod === LoginMethod.SOLID) {
      void saveProfileSolid(
        session,
        selectedAllergens,
        selectedDiets,
        selectedTastePreferences,
      )
    }

    if (loginMethod === LoginMethod.FIREBASE) {
      void saveProfileFirebase(
        auth,
        selectedAllergens,
        selectedDiets,
        selectedTastePreferences,
      )
    }

    setEditProfile(false)
  }

  if (currentStep === 0) {
    return (
      <Stack
        gap={3}
        className="welcome-screen-stack position-absolute top-50 start-50 translate-middle pb-5 text-center mx-auto"
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
    )
  }

  return (
    <Container>
      <Stack gap={3} className="create-profile-stack position-relative">
        <Stepper
          activeStep={currentStep - 1}
          alternativeLabel
          className="create-profile-stepper mt-3"
        >
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>

        <div className="user-preferences-controls overflow-auto text-center">
          {currentStep === 1 && (
            <SelectAllergens
              selectedAllergens={selectedAllergens}
              setSelectedAllergens={setSelectedAllergens}
            />
          )}

          {currentStep === 2 && (
            <SelectDiets
              selectedDiets={selectedDiets}
              setSelectedDiets={setSelectedDiets}
            />
          )}

          {currentStep === 3 && (
            <SelectTastePreferences
              selectedTastePreferences={selectedTastePreferences}
              setSelectedTastePreferences={setSelectedTastePreferences}
            />
          )}
        </div>

        <div className="create-profile-step-navigation position-absolute bottom-0 start-50 translate-middle-x mb-2 w-100">
          {currentStep === 1 && (
            <Button
              className="create-profile-navigation-button app-primary-color-button"
              onClick={() => setCurrentStep(currentStep + 1)}
            >
              <FormattedMessage
                id="nextStep"
                defaultMessage="Next"
              />
            </Button>
          )}

          {currentStep === 2 && (
            <>
              <Button
                className="create-profile-navigation-button app-primary-color-button"
                onClick={() => setCurrentStep(currentStep + 1)}
              >
                <FormattedMessage
                  id="nextStep"
                  defaultMessage="Next"
                />
              </Button>
              <Button
                className="create-profile-navigation-button app-secondary-color-button mt-2"
                onClick={() => setCurrentStep(currentStep - 1)}
              >
                <FormattedMessage
                  id="goBack"
                  defaultMessage="Back"
                />
              </Button>
            </>
          )}

          {currentStep === 3 && (
            <>
              <Button
                variant="success"
                className="create-profile-navigation-button"
                onClick={() => saveProfile()}
              >
                <FormattedMessage
                id="saveProfile"
                defaultMessage="Back"
              />
              </Button>
              <Button
                className="create-profile-navigation-button app-secondary-color-button mt-2"
                onClick={() => setCurrentStep(currentStep - 1)}
              >
                <FormattedMessage
                  id="goBack"
                  defaultMessage="Back"
                />
              </Button>
            </>
          )}
        </div>
      </Stack>
    </Container>
  )
}

export default CreateProfile
