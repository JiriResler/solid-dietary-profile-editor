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
import { FormattedMessage } from 'react-intl'

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
        className="onHoverPointer"
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
  onDiets: ['Vegetarian', 'Vegan'],
  worldCuisines: ['Chinese', 'Itailan'],
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
        startStep={1}
        setEditProfile={setEditProfile}
        loginMethod={loginMethod}
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
        <Stack
          gap={1}
          className="w-50 text-center position-absolute top-50 start-50 translate-middle"
        >
          <img
            src="images/profile_picture_default.svg"
            alt="Profile icon"
            style={{ width: '75px' }}
            className="mx-auto"
          />
          <span className="user-name">John Smith</span>
          <span className="user-email">john.smith@email.com</span>
        </Stack>

        <div className="position-absolute top-0 end-0 mt-4 me-4">
          <Dropdown>
            <Dropdown.Toggle as={CustomToggle} />

            <Dropdown.Menu className="mt-2">
              <Dropdown.Item
                className="dropdown-menu-item position-relative"
                onClick={() => setEditProfile(true)}
              >
                <div className="position-absolute top-50 translate-middle-y">
                  <svg
                    className="dropdown-item-icon me-3"
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    viewBox="0 0 16 16"
                  >
                    <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
                    <path
                      fill-rule="evenodd"
                      d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5z"
                    />
                  </svg>

                  <FormattedMessage
                    id="editProfile"
                    defaultMessage="Edit profile"
                  />
                </div>
              </Dropdown.Item>

              <Dropdown.Item className="dropdown-menu-item position-relative">
                <div className="position-absolute top-50 translate-middle-y">
                  <svg
                    className="dropdown-item-icon me-3"
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    viewBox="0 0 16 16"
                  >
                    <path d="M8 6.5a.5.5 0 0 1 .5.5v1.5H10a.5.5 0 0 1 0 1H8.5V11a.5.5 0 0 1-1 0V9.5H6a.5.5 0 0 1 0-1h1.5V7a.5.5 0 0 1 .5-.5" />
                    <path d="M14 4.5V14a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V2a2 2 0 0 1 2-2h5.5zm-3 0A1.5 1.5 0 0 1 9.5 3V1H4a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1V4.5z" />
                  </svg>

                  <FormattedMessage
                    id="importProfile"
                    defaultMessage="Import profile"
                  />
                </div>
              </Dropdown.Item>

              <Dropdown.Item className="dropdown-menu-item position-relative">
                <div className="position-absolute top-50 translate-middle-y">
                  <svg
                    className="dropdown-item-icon me-3"
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    viewBox="0 0 16 16"
                  >
                    <path d="M.5 9.9a.5.5 0 0 1 .5.5v2.5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2.5a.5.5 0 0 1 1 0v2.5a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2v-2.5a.5.5 0 0 1 .5-.5" />
                    <path d="M7.646 11.854a.5.5 0 0 0 .708 0l3-3a.5.5 0 0 0-.708-.708L8.5 10.293V1.5a.5.5 0 0 0-1 0v8.793L5.354 8.146a.5.5 0 1 0-.708.708z" />
                  </svg>

                  <FormattedMessage
                    id="downloadProfile"
                    defaultMessage="Download profile"
                  />
                </div>
              </Dropdown.Item>

              <Dropdown.Item className="dropdown-menu-item position-relative">
                <div className="position-absolute top-50 translate-middle-y">
                  <svg
                    className="dropdown-item-icon me-3"
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    viewBox="0 0 16 16"
                  >
                    <path d="M1 2.828c.885-.37 2.154-.769 3.388-.893 1.33-.134 2.458.063 3.112.752v9.746c-.935-.53-2.12-.603-3.213-.493-1.18.12-2.37.461-3.287.811zm7.5-.141c.654-.689 1.782-.886 3.112-.752 1.234.124 2.503.523 3.388.893v9.923c-.918-.35-2.107-.692-3.287-.81-1.094-.111-2.278-.039-3.213.492zM8 1.783C7.015.936 5.587.81 4.287.94c-1.514.153-3.042.672-3.994 1.105A.5.5 0 0 0 0 2.5v11a.5.5 0 0 0 .707.455c.882-.4 2.303-.881 3.68-1.02 1.409-.142 2.59.087 3.223.877a.5.5 0 0 0 .78 0c.633-.79 1.814-1.019 3.222-.877 1.378.139 2.8.62 3.681 1.02A.5.5 0 0 0 16 13.5v-11a.5.5 0 0 0-.293-.455c-.952-.433-2.48-.952-3.994-1.105C10.413.809 8.985.936 8 1.783" />
                  </svg>

                  <FormattedMessage
                    id="userManual"
                    defaultMessage="User manual"
                  />
                </div>
              </Dropdown.Item>

              <Dropdown.Item
                className="dropdown-menu-item position-relative"
                onClick={() => {
                  signOut(auth).catch((error: Error) => {
                    console.log(error.message)
                  })

                  session.logout().catch((error: Error) => {
                    console.log(error.message)
                  })
                }}
              >
                <div className="position-absolute top-50 translate-middle-y">
                  <svg
                    className="dropdown-item-icon me-3"
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    viewBox="0 0 16 16"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M10 12.5a.5.5 0 0 1-.5.5h-8a.5.5 0 0 1-.5-.5v-9a.5.5 0 0 1 .5-.5h8a.5.5 0 0 1 .5.5v2a.5.5 0 0 0 1 0v-2A1.5 1.5 0 0 0 9.5 2h-8A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h8a1.5 1.5 0 0 0 1.5-1.5v-2a.5.5 0 0 0-1 0z"
                    />
                    <path
                      fill-rule="evenodd"
                      d="M15.854 8.354a.5.5 0 0 0 0-.708l-3-3a.5.5 0 0 0-.708.708L14.293 7.5H5.5a.5.5 0 0 0 0 1h8.793l-2.147 2.146a.5.5 0 0 0 .708.708z"
                    />
                  </svg>

                  <span className="sign-out">
                    <FormattedMessage id="signOut" defaultMessage="Sign out" />
                  </span>
                </div>
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </div>
      </div>

      <Container>
        <Stack gap={3} className="mt-3 mb-3">
          <Card>
            <Card.Body className="profile-card-body">
              <Card.Title>
                <FormattedMessage id="allergens" defaultMessage="Allergens" />
              </Card.Title>

              <Card.Subtitle className="mb-2 text-muted">
                <FormattedMessage
                  id="allergicTo"
                  defaultMessage="You are allergic to"
                />
              </Card.Subtitle>

              <Card.Text className="width-fit-content">
                {userProfileTestData.allergicTo.map((allergen) => {
                  return (
                    <Stack key={allergen} direction="horizontal" gap={2}>
                      <span className="w-100">{allergen}</span>
                      <img
                        src="images/info_icon.svg"
                        alt="information icon"
                        className="onHoverPointer"
                        onClick={() => {
                          alert('click')
                        }}
                      />
                    </Stack>
                  )
                })}
              </Card.Text>
            </Card.Body>

            <Card.Body className="profile-card-body">
              <Card.Title>
                <FormattedMessage id="diets" defaultMessage="Diets" />
              </Card.Title>
              <Card.Subtitle className="mb-2 text-muted">
                <FormattedMessage
                  id="onDiets"
                  defaultMessage="Your diets are"
                />
              </Card.Subtitle>

              <Card.Text className="width-fit-content">
                {userProfileTestData.onDiets.map((diet) => {
                  return (
                    <Stack key={diet} direction="horizontal" gap={2}>
                      <span className="w-100">{diet}</span>
                      <img
                        src="images/info_icon.svg"
                        alt="information icon"
                        onClick={() => {
                          alert('click')
                        }}
                      />
                    </Stack>
                  )
                })}
              </Card.Text>
            </Card.Body>

            <Card.Body>
              <Card.Title>
                <FormattedMessage
                  id="tastePreferences"
                  defaultMessage="Taste preferences"
                />
              </Card.Title>
              <Card.Subtitle className="mb-2 text-muted">
                <FormattedMessage
                  id="worldCuisines"
                  defaultMessage="Favored world cuisines"
                />
              </Card.Subtitle>

              <Card.Text className="width-fit-content">
                {userProfileTestData.worldCuisines.map((cuisine) => {
                  return (
                    <Stack key={cuisine} direction="horizontal" gap={2}>
                      <span className="w-100">{cuisine}</span>
                      <img
                        src="images/info_icon.svg"
                        alt="information icon"
                        onClick={() => {
                          alert('click')
                        }}
                      />
                    </Stack>
                  )
                })}
              </Card.Text>

              <Card.Subtitle className="mb-2 text-muted">
                <FormattedMessage
                  id="tasteOfDesserts"
                  defaultMessage="Preferred taste of desserts"
                />
              </Card.Subtitle>

              <Card.Text>
                <div>Sweet</div>
              </Card.Text>

              <Card.Subtitle className="mb-2 text-muted">
                <FormattedMessage
                  id="tasteSpiciness"
                  defaultMessage="Liked level of spiciness"
                />
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
