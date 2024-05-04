import React, { useEffect, useState } from 'react'
import CreateProfile from './CreateProfile/CreateProfile'
import { LoginMethod } from '../loginMethodEnum'
import './Profile.css'
import { useSession } from '@inrupt/solid-ui-react'
import { getSolidDataset, getThing, getUrlAll } from '@inrupt/solid-client'
import { fetch } from '@inrupt/solid-client-authn-browser'
import { doc, getDoc } from 'firebase/firestore'
import { db, auth } from '../../firebase'
import Card from 'react-bootstrap/Card'
import Stack from 'react-bootstrap/Stack'
import getPodUrl from '../getPodUrl'
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import Container from 'react-bootstrap/Container'
import Dropdown from 'react-bootstrap/Dropdown'

type UserProfile = {
  allergicTo: string[]
  onDiets: string[]
  likesCuisines: string[]
  likesDessertTaste: string[]
  likesSpiciness: string[]
}

type CustomToggleProps = {
  children?: React.ReactNode
  onClick?: (
    event: React.MouseEvent<HTMLAnchorElement, MouseEvent>,
  ) => NonNullable<unknown>
}

const CustomToggle = React.forwardRef(
  (props: CustomToggleProps, ref: React.Ref<HTMLAnchorElement>) => (
    <a
      href=""
      ref={ref}
      onClick={(e) => {
        e.preventDefault()
        if (props.onClick) props.onClick(e)
      }}
    >
      {props.children}
      <span style={{ paddingLeft: '5px' }}>&#x25bc;</span>
    </a>
  ),
)

type Props = {
  loginMethod: LoginMethod
}

const userProfileTestData = {
  allergicTo: ['Celery', 'Gluten'],
  onDiets: ['Vegetarian'],
}

const Profile: React.FC<Props> = ({ loginMethod }) => {
  const { session } = useSession()

  const [userProfile, setUserProfile] = useState<UserProfile | null>(null)

  const [showExportProfileModal, setShowExportProfileModal] = useState(false)

  const [showImportProfileModal, setShowImportProfileModal] = useState(false)

  const [editProfile, setEditProfile] = useState(false)

  useEffect(() => {
    void loadUserProfile()

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  async function loadUserProfile() {
    if (loginMethod === LoginMethod.SOLID) {
      const podUrl = await getPodUrl(session)

      const profileLocation = 'eatingPreferencesProfile/profile'

      const profileUrl = podUrl + profileLocation

      // todo If profile not found, ...
      const profileDataset = await getSolidDataset(profileUrl, {
        fetch: fetch as undefined,
      })

      const userThing = getThing(profileDataset, profileUrl + '#me')

      // Get rid of a TypeScript error
      if (userThing === null) {
        return
      }

      const profile: UserProfile = {
        allergicTo: [],
        onDiets: [],
        likesCuisines: [],
        likesDessertTaste: [],
        likesSpiciness: [],
      }

      profile.allergicTo = getUrlAll(
        userThing,
        'https://github.com/JiriResler/solid-choose-well-ontology/blob/main/choosewell#allergicTo',
      )

      profile.onDiets = getUrlAll(
        userThing,
        'https://github.com/JiriResler/solid-choose-well-ontology/blob/main/choosewell#onDiet',
      )

      profile.likesCuisines = getUrlAll(
        userThing,
        'https://github.com/JiriResler/solid-choose-well-ontology/blob/main/choosewell#likesCuisine',
      )

      profile.likesDessertTaste = getUrlAll(
        userThing,
        'https://github.com/JiriResler/solid-choose-well-ontology/blob/main/choosewell#likesDessert',
      )

      profile.likesSpiciness = getUrlAll(
        userThing,
        'https://github.com/JiriResler/solid-choose-well-ontology/blob/main/choosewell#likesSpicyFood',
      )

      setUserProfile(profile)
    }

    if (loginMethod === LoginMethod.FIREBASE) {
      const loggedInUser = auth.currentUser

      //  Get rid of a TypeScript error
      if (loggedInUser === null) {
        return
      }

      const profileRef = doc(db, 'users', loggedInUser?.uid)

      const userProfile = await getDoc(profileRef)

      //  Get rid of a TypeScript error
      if (!userProfile.exists()) {
        return
      }

      setUserProfile(userProfile.data() as UserProfile)
    }

    const profilePodUrl = await getPodUrl(session)

    // todo: throw error
    if (profilePodUrl === undefined) {
      return
    }
  }

  function downloadProfileFile() {
    const linkElement = document.createElement('a')
    const profileFile = new Blob([JSON.stringify(userProfile)], {
      type: 'application/json',
    })
    linkElement.href = URL.createObjectURL(profileFile)
    const profileFileName = 'eating_preferences_profile.json'
    linkElement.download = profileFileName
    document.body.appendChild(linkElement) // Required for this to work in FireFox
    linkElement.click()
    document.body.removeChild(linkElement)
  }

  const readJsonFile = (file: Blob) =>
    new Promise((resolve, reject) => {
      const fileReader = new FileReader()

      fileReader.onload = (event) => {
        if (event.target) {
          resolve(JSON.parse(event.target.result as string))
        }
      }

      fileReader.onerror = (error) => reject(error)
      fileReader.readAsText(file)
    })

  const handleOnChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      const parsedData = await readJsonFile(event.target.files[0])

      console.log(parsedData)
    }
  }

  // if (loadingProfile) {
  //   return <h1>Loading profile data</h1>
  // }

  // if (userProfile === null) {
  //   return (
  //     <CreateProfile
  //       loginMethod={loginMethod}
  //       startStep={1}
  //       setEditProfile={setEditProfile}
  //     />
  //   )
  // }

  if (editProfile) {
    return (
      <CreateProfile
        loginMethod={loginMethod}
        startStep={1}
        setEditProfile={setEditProfile}
      />
    )
  }

  return (
    <>
      <Modal
        show={showExportProfileModal}
        onHide={() => {
          setShowExportProfileModal(false)
        }}
      >
        <Modal.Header closeButton>
          <Modal.Title>Export profile</Modal.Title>
        </Modal.Header>
        <Modal.Body>Choose format</Modal.Body>
        <Modal.Footer>
          <Button
            variant="success"
            onClick={() => {
              downloadProfileFile()
            }}
          >
            Download
          </Button>
          <Button
            variant="secondary"
            onClick={() => {
              setShowExportProfileModal(false)
            }}
          >
            Cancel
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal
        show={showImportProfileModal}
        onHide={() => {
          setShowImportProfileModal(false)
        }}
      >
        <Modal.Header closeButton>
          <Modal.Title>Import profile</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <input
            type="file"
            accept=".json,application/json"
            onChange={(e) => {
              void handleOnChange(e)
            }}
          />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="success" onClick={() => {}}>
            Import
          </Button>
          <Button
            variant="secondary"
            onClick={() => {
              setShowImportProfileModal(false)
            }}
          >
            Cancel
          </Button>
        </Modal.Footer>
      </Modal>

      <div className="profile-overview-user-information position-relative">
        <Stack className="w-50 text-center mx-auto bg-warning">
          <img
            src="images/profile_picture_default.svg"
            alt="Profile icon"
            style={{ width: '75px' }}
            className="mx-auto mt-5"
          />
          <span className="text-bold">Name</span>
          Email
        </Stack>

        <div className="position-absolute top-0 end-0 mt-4 me-4">
          <Dropdown>
            <Dropdown.Toggle as={CustomToggle} />

            <Dropdown.Menu className="mt-1 me-4">
              <Dropdown.Item eventKey="1">Red</Dropdown.Item>
              <Dropdown.Item eventKey="2">Blue</Dropdown.Item>
              <Dropdown.Item eventKey="3" active>
                Orange
              </Dropdown.Item>
              <Dropdown.Item eventKey="1">Red-Orange</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </div>
      </div>

      <Container>
        <Stack gap={3} className="mt-4">
          <Card>
            <Card.Body>
              <Card.Title>Allergens</Card.Title>

              <Card.Subtitle className="mb-2 text-muted">
                You are allergic to
              </Card.Subtitle>

              <Card.Text>
                {userProfileTestData.allergicTo.map((allergen) => {
                  return (
                    <div key={allergen}>
                      {allergen}{' '}
                      <img
                        src="images/info_icon.svg"
                        alt="information icon"
                        onClick={() => {
                          alert('click')
                        }}
                      />
                    </div>
                  )
                })}
              </Card.Text>
            </Card.Body>
          </Card>

          <Card>
            <Card.Body>
              <Card.Title>Diets</Card.Title>
              <Card.Subtitle className="mb-2 text-muted">
                Your diets are
              </Card.Subtitle>

              <Card.Text>
                {userProfileTestData.onDiets.map((diet) => {
                  return (
                    <div key={diet}>
                      {diet}{' '}
                      <img
                        src="images/info_icon.svg"
                        alt="information icon"
                        onClick={() => {
                          alert('click')
                        }}
                      />
                    </div>
                  )
                })}
              </Card.Text>
            </Card.Body>
          </Card>
        </Stack>
      </Container>
    </>
  )
}

export default Profile
