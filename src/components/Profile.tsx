import React, { useEffect, useState } from 'react'
import Button from 'react-bootstrap/Button'
import Container from 'react-bootstrap/Container'
import { LogoutButton } from '@inrupt/solid-ui-react'
import { signOut } from 'firebase/auth'
import { auth } from '../firebase'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Form from 'react-bootstrap/Form'

type Props = {
  selectedSignInMethod: string
}

interface dbpediaResponse {
  results: {
    bindings: Array<{
      desc: { value: string }
    }>
  }
}

const Profile: React.FC<Props> = ({ selectedSignInMethod }) => {
  const [currentStep, setCurrentStep] = useState<number>(1)

  const [checkedAllergens, setCheckedAllergens] = useState(new Set<string>())

  const allergens = [
    'Celery',
    'Gluten',
    'Crustaceans',
    'Eggs',
    'Fish',
    'Lupin',
    'Milk',
    'Molluscs',
    'Mustard',
    'Tree nuts',
    'Peanuts',
    'Sesame',
    'Soya',
    'Sulphites',
  ]

  useEffect(() => {
    const api = async () => {
      const response = await fetch(
        'https://dbpedia.org/sparql?default-graph-uri=http%3A%2F%2Fdbpedia.org&query=SELECT+%3Fdesc+WHERE+%7B%0D%0A%3Chttp%3A%2F%2Fdbpedia.org%2Fresource%2FGluten%3E+dbo%3Aabstract+%3Fdesc+.%0D%0AFILTER+%28LANG%28%3Fdesc+%29%3D%27en%27%29%0D%0A%7D%0D%0A++++%0D%0A&format=application%2Fsparql-results%2Bjson&timeout=30000&signal_void=on&signal_unconnected=on',
      )
      const descObject = (await response.json()) as dbpediaResponse
      console.log(descObject.results.bindings[0].desc.value)
    }

    void api()
  }, [])

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

  function handleAllergenClick(allergen: string) {
    const newAllergenSet = new Set(checkedAllergens)

    if (newAllergenSet.has(allergen)) {
      newAllergenSet.delete(allergen)
    } else {
      newAllergenSet.add(allergen)
    }

    setCheckedAllergens(newAllergenSet)
  }

  return (
    <>
      <Container fluid>
        <p>Logged in with {selectedSignInMethod}</p>
        {currentStep === 1 && (
          <div>
            <h3 className="mt-3">Select what you are allergic to</h3>
            <Row className="w-25 mt-2">
              {allergens.map((allergen) => (
                <Col lg={6}>
                  <Form.Check
                    type="checkbox"
                    label={allergen}
                    checked={checkedAllergens.has(allergen)}
                    onChange={() => handleAllergenClick(allergen)}
                  />
                </Col>
              ))}
            </Row>
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
