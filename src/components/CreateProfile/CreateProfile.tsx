import { useState } from 'react'
import Button from 'react-bootstrap/Button'
import Stack from 'react-bootstrap/Stack'
import './CreateProfile.css'
import SelectAllergens from './SelectAllergens'
import CreateProfileNavigation from './CreateProfileNavigation'
import SelectDiets from './SelectDiets'
import SelectIngredients from './SelectIngredients'
import { Allergen } from './profileDataTypes'
import SelectMenuOption from './selectMenuOptionType'

const CreateProfile: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(0)

  const [selectedAllergens, setSelectedAllergens] = useState(
    new Set<Allergen>(),
  )

  const [selectedDiets, setSelectedDiets] = useState<
    ReadonlyArray<SelectMenuOption>
  >([])

  const [selectedFavoredIngredients, setSelectedFavoredIngredients] = useState<
    ReadonlyArray<SelectMenuOption>
  >([])

  const [selectedDislikedIngredients, setSelectedDislikedIngredients] =
    useState<ReadonlyArray<SelectMenuOption>>([])

  function saveProfile() {
    // for (const member of selectedAllergens) {
    //   console.log(JSON.stringify(member))
    // }
  }

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
          <SelectIngredients
            selectedFavoredIngredients={selectedFavoredIngredients}
            setSelectedFavoredIngredients={setSelectedFavoredIngredients}
            selectedDislikedIngredients={selectedDislikedIngredients}
            setSelectedDislikedIngredients={setSelectedDislikedIngredients}
          />
        )}
      </div>

      <CreateProfileNavigation
        currentStep={currentStep}
        setCurrentStep={setCurrentStep}
        saveProfile={saveProfile}
      />
    </>
  )
}

export default CreateProfile
