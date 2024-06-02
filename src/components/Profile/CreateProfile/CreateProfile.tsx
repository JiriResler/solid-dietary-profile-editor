import { useState } from 'react'
// import { auth } from '../../../firebase'
import Button from 'react-bootstrap/Button'
import Stack from 'react-bootstrap/Stack'
import './CreateProfile.css'
import SelectAllergens from './SelectAllergens'
import SelectDiets from './SelectDiets'
import { LoginMethod } from '../../loginMethodEnum'
// import { useSession } from '@inrupt/solid-ui-react'
import SelectTastePreferences from './SelectTastePreferences'
// import { saveProfileFirebase, saveProfileSolid } from './saveProfile'
import Stepper from '@mui/material/Stepper'
import Step from '@mui/material/Step'
import StepLabel from '@mui/material/StepLabel'
import Container from 'react-bootstrap/Container'
import { FormattedMessage } from 'react-intl'
import selectSearchOptionType from './selectSearchOptionType'
import { DessertTaste } from './dessertTasteEnum'
import { SpicinessLevel } from './spicinessLevelEnum'
import { styled } from '@mui/material/styles'
import StepConnector, {
  stepConnectorClasses,
} from '@mui/material/StepConnector'

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

  const [currentStep, setCurrentStep] = useState(startStep)

  // URLs of allergens which are selected by the user.
  const [selectedAllergens, setSelectedAllergens] = useState<string[]>([])

  // Diets selected with checkboxes.
  const [selectedDietsViaCheckboxes, setSelectedDietsViaCheckboxes] = useState<
    string[]
  >([])

  // Diets which are chosen via Select component.
  const [selectedDietsViaSearch, setSelectedDietsViaSearch] = useState<
    ReadonlyArray<selectSearchOptionType>
  >([])

  // World cuisines selected with checkboxes.
  const [
    selectedWorldCuisinesViaCheckboxes,
    setSelectedWorldCuisinesViaCheckboxes,
  ] = useState<string[]>([])

  // World cuisines which are chosen via Select component.
  const [selectedWorldCuisinesViaSearch, setSelectedWorldCuisinesViaSearch] =
    useState<ReadonlyArray<selectSearchOptionType>>([])

  // Preferred taste of desserts by the user.
  const [dessertTastePreference, setDessertTastePreference] = useState<
    DessertTaste | undefined
  >(undefined)

  // Whether user likes spicy food or not.
  const [userLikesSpicyFood, setUserLikesSpicyFood] = useState(false)

  // Preferred spiciness level of food by the user.
  const [levelOfSpicinessPreference, setLevelOfSpicinessPreference] = useState<
    SpicinessLevel | undefined
  >(undefined)

  // function saveProfile() {
  //   if (loginMethod === LoginMethod.SOLID) {
  //     void saveProfileSolid(
  //       session,
  //       selectedAllergens,
  //       selectedDietsViaCheckboxes,
  //       selectedTastePreferences,
  //     )
  //   }

  //   if (loginMethod === LoginMethod.FIREBASE) {
  //     void saveProfileFirebase(
  //       auth,
  //       selectedAllergens,
  //       selectedDietsViaCheckboxes,
  //       selectedTastePreferences,
  //     )
  //   }

  //   setEditProfile(false)
  // }

  const CustomStepConnector = styled(StepConnector)(() => ({
    [`&.${stepConnectorClasses.alternativeLabel}`]: {
      top: 10,
      left: 'calc(-50% + 12px)',
      right: 'calc(50% + 12px)',
    },
    [`&.${stepConnectorClasses.active}`]: {
      [`& .${stepConnectorClasses.line}`]: {
        borderColor: '#1c3bb8',
      },
    },
    [`&.${stepConnectorClasses.completed}`]: {
      [`& .${stepConnectorClasses.line}`]: {
        borderColor: '#1c3bb8',
      },
    },
    [`& .${stepConnectorClasses.line}`]: {
      borderColor: '#eaeaf0',
      borderTopWidth: 3,
      borderRadius: 1,
    },
  }))

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
          connector={<CustomStepConnector />}
          sx={{
            '& .MuiStepLabel-iconContainer.Mui-active > .MuiSvgIcon-root.Mui-active':
              {
                color: '#2541b2',
              },
            '& .MuiStepLabel-iconContainer.Mui-completed > .MuiSvgIcon-root.Mui-completed':
              {
                color: '#2541b2',
              },
            '& .MuiStepLabel-labelContainer': {
              height: '50px',
              position: 'relative',
            },
          }}
        >
          <Step key="step1">
            <StepLabel>
              <FormattedMessage id="allergens" defaultMessage="Allergens" />
            </StepLabel>
          </Step>

          <Step key="step2">
            <StepLabel>
              <FormattedMessage id="diets" defaultMessage="Diets" />
            </StepLabel>
          </Step>

          <Step key="step3">
            <StepLabel>
              <div className="position-absolute top-50 start-50 translate-middle">
                <FormattedMessage
                  id="tastePreferences"
                  defaultMessage="Taste preferences"
                />
              </div>
            </StepLabel>
          </Step>
        </Stepper>

        {currentStep === 1 && (
          <>
            <div className="select-allergens-input-controls overflow-auto text-center">
              <h3 className="mb-3">
                <FormattedMessage
                  id="whatAreYouAllergicTo"
                  defaultMessage="What are you allergic to?"
                />
              </h3>

              <SelectAllergens
                selectedAllergens={selectedAllergens}
                setSelectedAllergens={setSelectedAllergens}
              />
            </div>

            <Button
              className="position-absolute bottom-0 start-50 translate-middle-x step-forward-navigation-button app-primary-color-button mb-2"
              onClick={() => setCurrentStep(currentStep + 1)}
            >
              <FormattedMessage id="nextStep" defaultMessage="Next" />
            </Button>
          </>
        )}

        {currentStep === 2 && (
          <>
            <div className="select-diet-and-taste-preferences-input-controls overflow-auto text-center">
              <SelectDiets
                selectedDietsViaCheckboxes={selectedDietsViaCheckboxes}
                setSelectedDietsViaCheckboxes={setSelectedDietsViaCheckboxes}
                selectedDietsViaSearch={selectedDietsViaSearch}
                setSelectedDietsViaSearch={setSelectedDietsViaSearch}
              />
            </div>

            <div className="select-diet-and-taste-preferences-step-navigation-buttons position-absolute bottom-0 start-50 translate-middle-x mb-2 w-100">
              <Button
                className="step-navigation-button app-primary-color-button"
                onClick={() => setCurrentStep(currentStep + 1)}
              >
                <FormattedMessage id="nextStep" defaultMessage="Next" />
              </Button>
              <Button
                className="step-navigation-button app-secondary-color-button mt-2"
                onClick={() => setCurrentStep(currentStep - 1)}
              >
                <FormattedMessage id="goBack" defaultMessage="Back" />
              </Button>
            </div>
          </>
        )}

        {currentStep === 3 && (
          <>
            <div className="select-diet-and-taste-preferences-input-controls overflow-auto text-center">
              <SelectTastePreferences
                selectedWorldCuisinesViaCheckboxes={
                  selectedWorldCuisinesViaCheckboxes
                }
                setSelectedWorldCuisinesViaCheckboxes={
                  setSelectedWorldCuisinesViaCheckboxes
                }
                selectedWorldCuisinesViaSearch={selectedWorldCuisinesViaSearch}
                setSelectedWorldCuisinesViaSearch={
                  setSelectedWorldCuisinesViaSearch
                }
                dessertTastePreference={dessertTastePreference}
                setDessertTastePreference={setDessertTastePreference}
                levelOfSpicinessPreference={levelOfSpicinessPreference}
                setLevelOfSpicinessPreference={setLevelOfSpicinessPreference}
                userLikesSpicyFood={userLikesSpicyFood}
                setUserLikesSpicyFood={setUserLikesSpicyFood}
              />
            </div>

            <div className="select-diet-and-taste-preferences-step-navigation-buttons position-absolute bottom-0 start-50 translate-middle-x mb-2 w-100">
              <Button
                variant="success"
                className="step-navigation-button"
                // onClick={() => saveProfile()}
              >
                <FormattedMessage
                  id="saveProfile"
                  defaultMessage="Save profile"
                />
              </Button>
              <Button
                className="step-navigation-button app-secondary-color-button mt-2"
                onClick={() => setCurrentStep(currentStep - 1)}
              >
                <FormattedMessage id="goBack" defaultMessage="Back" />
              </Button>
            </div>
          </>
        )}
      </Stack>
    </Container>
  )
}

export default CreateProfile
