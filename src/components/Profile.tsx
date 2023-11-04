import React, { useState } from 'react'
import Button from 'react-bootstrap/Button'
import Container from 'react-bootstrap/Container'
import { LogoutButton } from '@inrupt/solid-ui-react'
import { signOut } from 'firebase/auth'
import { auth } from '../firebase'

type Props = {
  selectedSignInMethod: string
}

const Profile: React.FC<Props> = ({ selectedSignInMethod }) => {
  const [currentStep, setCurrentStep] = useState<number>(1)

  async function logOut() {
    if (selectedSignInMethod === 'firebase') {
      try {
        await signOut(auth)
        alert('Log out successful')
      } catch {
        alert('Log out failed.')
      }
    }
  }

  return (
    <>
      <Container fluid>
        <p>Logged in with {selectedSignInMethod}</p>
        {currentStep === 1 && (
          <div>
            <h1>Step 1: Specify your allergies</h1>
            <button
              onClick={() => {
                setCurrentStep(currentStep + 1)
              }}
            >
              Next step
            </button>
          </div>
        )}

        {currentStep === 2 && (
          <div>
            <h1>Step 2: Specify your diets</h1>
            <button
              onClick={() => {
                setCurrentStep(currentStep - 1)
              }}
            >
              Previous step
            </button>
            <button
              onClick={() => {
                setCurrentStep(currentStep + 1)
              }}
            >
              Next step
            </button>
          </div>
        )}

        {currentStep === 3 && (
          <div>
            <h1>Step 3: Specify what food you like and dislike</h1>
            <button
              onClick={() => {
                setCurrentStep(currentStep - 1)
              }}
            >
              Previous step
            </button>
          </div>
        )}
        <Button className="mt-3" onClick={() => alert('Save profile clicked')}>
          Save profile
        </Button>
        <br />
        <br />
        <LogoutButton>
          <button
            onClick={() => {
              void logOut()
            }}
          >
            Log out
          </button>
        </LogoutButton>
      </Container>
    </>
  )
}

export default Profile
