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
import { signOut } from 'firebase/auth'

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
    event: React.MouseEvent<HTMLDivElement, MouseEvent>,
  ) => NonNullable<unknown>
}

const CustomToggle = React.forwardRef(
  (props: CustomToggleProps, ref: React.Ref<HTMLDivElement>) => (
    <div
      ref={ref}
      onClick={(e) => {
        e.preventDefault()
        if (props.onClick) props.onClick(e)
      }}
    >
      <svg
        className='me-4'
        xmlns="http://www.w3.org/2000/svg"
        width="32"
        height="32"
        fill="white"
        viewBox="0 0 16 16"
      >
        <path d="M9.5 13a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0m0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0m0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0" />
      </svg>
    </div>
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

        <div className="position-absolute top-0 end-0 mt-4">
          <Dropdown>
            <Dropdown.Toggle as={CustomToggle}/>

            <Dropdown.Menu className="mt-2">
              <Dropdown.Item>
                <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" fill="currentColor" viewBox="0 0 16 16">
                  <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
                  <path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5z"/>
                </svg>
                Edit profile
              </Dropdown.Item>

              <Dropdown.Item>
              <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" fill="currentColor" viewBox="0 0 16 16">
                <path d="M8 6.5a.5.5 0 0 1 .5.5v1.5H10a.5.5 0 0 1 0 1H8.5V11a.5.5 0 0 1-1 0V9.5H6a.5.5 0 0 1 0-1h1.5V7a.5.5 0 0 1 .5-.5"/>
                <path d="M14 4.5V14a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V2a2 2 0 0 1 2-2h5.5zm-3 0A1.5 1.5 0 0 1 9.5 3V1H4a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1V4.5z"/>
              </svg>
              Import profile
              </Dropdown.Item>

              <Dropdown.Item>
              <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" fill="currentColor" viewBox="0 0 16 16">
                <path d="M.5 9.9a.5.5 0 0 1 .5.5v2.5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2.5a.5.5 0 0 1 1 0v2.5a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2v-2.5a.5.5 0 0 1 .5-.5"/>
                <path d="M7.646 11.854a.5.5 0 0 0 .708 0l3-3a.5.5 0 0 0-.708-.708L8.5 10.293V1.5a.5.5 0 0 0-1 0v8.793L5.354 8.146a.5.5 0 1 0-.708.708z"/>
              </svg>
                Download profile
              </Dropdown.Item>

              <Dropdown.Item
                onClick={() => {
                  signOut(auth).catch((error: Error) => {
                    console.log(error.message)
                  })

                  session.logout().catch((error: Error) => {
                    console.log(error.message)
                  })
                }}
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" fill="currentColor" viewBox="0 0 16 16">
                  <path fill-rule="evenodd" d="M10 12.5a.5.5 0 0 1-.5.5h-8a.5.5 0 0 1-.5-.5v-9a.5.5 0 0 1 .5-.5h8a.5.5 0 0 1 .5.5v2a.5.5 0 0 0 1 0v-2A1.5 1.5 0 0 0 9.5 2h-8A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h8a1.5 1.5 0 0 0 1.5-1.5v-2a.5.5 0 0 0-1 0z"/>
                  <path fill-rule="evenodd" d="M15.854 8.354a.5.5 0 0 0 0-.708l-3-3a.5.5 0 0 0-.708.708L14.293 7.5H5.5a.5.5 0 0 0 0 1h8.793l-2.147 2.146a.5.5 0 0 0 .708.708z"/>
                </svg>
                Sign out
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </div>
      </div>

      <Container>
        <Stack gap={3} className="mt-4">
          <Card>
            <Card.Body className='profile-card-body'>
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

            <Card.Body className='profile-card-body'>
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

            <Card.Body>
              <Card.Title>Taste preferences</Card.Title>
              <Card.Subtitle className="mb-2 text-muted">
                Favored world cuisines
              </Card.Subtitle>

              <Card.Text>  
                <div>
                  {'Chinese'}{' '}
                  <img
                    src="images/info_icon.svg"
                    alt="information icon"
                    onClick={() => {
                      alert('click')
                    }}
                  />
                </div>
              </Card.Text>

              <Card.Subtitle className="mb-2 text-muted">
                Preferred taste of desserts
              </Card.Subtitle>

              <Card.Text>  
                <div>Sweet</div>
              </Card.Text>

              <Card.Subtitle className="mb-2 text-muted">
                Liked level of spiciness
              </Card.Subtitle>

              <Card.Text>  
                <div>Mild</div>
              </Card.Text>
            </Card.Body>
          </Card>
        </Stack>
      </Container>
    </>
  )
}

export default Profile
