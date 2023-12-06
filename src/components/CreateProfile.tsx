import { useState } from 'react'
import Button from 'react-bootstrap/Button'
import Stack from 'react-bootstrap/Stack'
import './CreateProfile.css'

const CreateProfile: React.FC = () => {
  const [currentStep, setCurrentStep] = useState<number>(0)

  return (
    <>
      {currentStep === 0 && (
        <Stack
          gap={3}
          className="welcome-screen-stack mt-5 text-center mx-auto"
        >
          <h1>Welcome!</h1>
          <div>
            You can create a new profile or import an already existing one.
          </div>
          <Button className="welcome-screen-button mx-auto">
            Create a new profile
          </Button>
          <Button className="welcome-screen-button mx-auto">
            Import an existing profile
          </Button>
        </Stack>
      )}
    </>
  )
}

export default CreateProfile
