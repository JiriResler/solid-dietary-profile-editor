import React, { useState } from 'react'
import { useSession } from '@inrupt/solid-ui-react'
import {
  addStringNoLocale,
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
// import { SCHEMA_INRUPT } from '@inrupt/vocab-common-rdf'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import { LogoutButton } from '@inrupt/solid-ui-react'
import { signOut } from 'firebase/auth'
import { auth } from '../firebase'

interface ResponseError extends Error {
  statusCode?: number
}

const Profile: React.FC = () => {
  const { session } = useSession()

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

  // const diets = ["vegan", "vegetarian", "low-carb", "keto", "raw"];

  async function logOut() {
    try {
      await signOut(auth)
      alert('Log out successful')
    } catch {
      alert('Log out failed.')
    }
  }

  async function handleWrite() {
    const userWebId: string =
      session.info.webId === undefined ? '' : session.info.webId
    const podsUrls: string[] = await getPodUrlAll(userWebId, {
      fetch: session.fetch as undefined,
    })
    const readingListUrl = `${podsUrls[0]}dietary-profile/my-profile`
    let myReadingList: SolidDataset = setThing(
      createSolidDataset(),
      createThing(),
    )

    try {
      // Attempt to retrieve the reading list in case it already exists.
      let myReadingList = await getSolidDataset(readingListUrl, {
        fetch: session.fetch as undefined,
      })
      // Clear the list to override the whole list
      const items = getThingAll(myReadingList)
      items.forEach((item) => {
        myReadingList = removeThing(myReadingList, item)
      })
    } catch (error) {
      if (
        typeof (error as ResponseError).statusCode === 'number' &&
        (error as ResponseError).statusCode === 404
      ) {
        // if not found, create a new SolidDataset (i.e., the reading list)
        myReadingList = createSolidDataset()
      } else {
        console.error((error as Error).message)
      }
    }

    let item = createThing({ name: userWebId })

    for (const allergen of checkedAllergens) {
      item = addStringNoLocale(
        item,
        'https://github.com/JiriResler/solid-choose-well-ontology/blob/main/choosewell#isAllergicTo',
        allergen.toLowerCase(),
      )
    }

    myReadingList = setThing(myReadingList, item)

    await saveSolidDatasetAt(readingListUrl, myReadingList, {
      fetch: session.fetch as undefined,
    })

    alert('Profile saved')
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

        {/* <h3>Select your diets</h3>
      {diets.map(diet =>
        <Form.Check
          type="checkbox"
          label={diet}
          checked={false}
          // onChange={() => handleAllergenClick(allergen)}
        />
      )} */}

        <Button className="mt-3" onClick={() => void handleWrite()}>
          Save profile
        </Button>
        <br />
        <br />
        <LogoutButton>
          <button>Log out Solid</button>
        </LogoutButton>
        <br />
        <button
          onClick={() => {
            void logOut()
          }}
        >
          Log out Firebase
        </button>
      </Container>
    </>
  )
}

export default Profile
