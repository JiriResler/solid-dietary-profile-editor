import { useEffect, useState } from 'react'
// import { auth } from '../../../firebase'
import Button from 'react-bootstrap/Button'
import Stack from 'react-bootstrap/Stack'
import './CreateProfile.css'
import SelectAllergens from './SelectAllergens'
import SelectDiets from './SelectDiets'
import { Allergen, Diet, TastePreferences } from './profileDataTypes'
import { LoginMethod } from '../../loginMethodEnum'
// import { useSession } from '@inrupt/solid-ui-react'
import SelectTastePreferences from './SelectTastePreferences'
// import { saveProfileFirebase, saveProfileSolid } from './saveProfile'
import { loadProfileCreationData } from './loadProfileCreationData'
import Box from '@mui/material/Box'
import Stepper from '@mui/material/Stepper'
import Step from '@mui/material/Step'
import StepLabel from '@mui/material/StepLabel'

type Props = {
  loginMethod: LoginMethod
  setEditProfile: React.Dispatch<React.SetStateAction<boolean>>
  startStep: number
}

const CreateProfile: React.FC<Props> = ({
  // loginMethod,
  startStep,
  // setEditProfile,
}) => {
  // const { session } = useSession()

  // Number of steps in profile creation
  // const numberOfSteps = 3

  const steps = [
    'Select master blaster campaign settings',
    'Create an ad group',
    'Create an ad',
  ]

  const [currentStep, setCurrentStep] = useState(startStep)

  const [allergenArray, setAllergenArray] = useState<Allergen[]>([])

  const [selectedAllergens, setSelectedAllergens] = useState(
    new Set<Allergen>(),
  )

  const [selectedDiets, setSelectedDiets] = useState(new Set<Diet>())

  const [selectedTastePreferences, setSelectedTastePreferences] =
    useState<TastePreferences>({
      cuisines: [],
      desserts: [],
      spiciness: [],
    })

  useEffect(() => {
    void loadProfileCreationData(setAllergenArray)
  }, [])

  // function saveProfile() {
  //   if (loginMethod === LoginMethod.SOLID) {
  //     void saveProfileSolid(
  //       session,
  //       selectedAllergens,
  //       selectedDiets,
  //       selectedTastePreferences,
  //     )
  //   }

  //   if (loginMethod === LoginMethod.FIREBASE) {
  //     void saveProfileFirebase(
  //       auth,
  //       selectedAllergens,
  //       selectedDiets,
  //       selectedTastePreferences,
  //     )
  //   }

  //   setEditProfile(false)
  // }

  return (
    <>
      <h1>{'<'}</h1>
      <Box sx={{ width: '100%' }}>
        <Stepper activeStep={1} alternativeLabel>
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>
      </Box>
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
          allergenArray={allergenArray}
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
    </>
  )
}

export default CreateProfile
