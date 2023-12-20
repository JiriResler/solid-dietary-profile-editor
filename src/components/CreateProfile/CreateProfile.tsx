import { useState } from 'react'
import Button from 'react-bootstrap/Button'
import Stack from 'react-bootstrap/Stack'
import './CreateProfile.css'
import SelectAllergens from './SelectAllergens'
import CreateProfileNavigation from './CreateProfileNavigation'
import SelectDiets from './SelectDiets'
import SelectFoodIngredients from './SelectFoodIngredients'
import { Allergen } from './allergenType'

// type ProfileData = {
//   allergens: Set<Resource>
//   diets: Set<Resource>
//   preferences: {
//     favored: Set<Resource>
//     disliked: Set<Resource>
//   }
// }

const CreateProfile: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(0)

  const [selectedAllergens, setSelectedAllergens] = useState(
    new Set<Allergen>(),
  )

  function saveProfile() {}

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
            newProfileData={newProfileData}
            setNewProfileData={setNewProfileData}
          />
        )}

        {currentStep === 3 && (
          <SelectFoodIngredients
            newProfileData={newProfileData}
            setNewProfileData={setNewProfileData}
          />
        )}
      </div>

      <CreateProfileNavigation
        currentStep={currentStep}
        setCurrentStep={setCurrentStep}
      />
    </>
  )
}

export default CreateProfile
