import { useEffect, useState } from 'react'
import CreateProfile from './CreateProfile/CreateProfile'
import { LoginMethod } from './loginMethodEnum'
import Offcanvas from 'react-bootstrap/Offcanvas'
import Button from 'react-bootstrap/Button'
import './Profile.css'
import { signOut } from 'firebase/auth'
import { useSession } from '@inrupt/solid-ui-react'
import { getPodUrlAll, getSolidDataset } from '@inrupt/solid-client'
import { fetch } from '@inrupt/solid-client-authn-browser'
import { doc, getDoc } from 'firebase/firestore'
import { db, auth } from '../firebase'

type UserProfile = {
  allergicTo: string[]
  onDiets: string[]
  likesCuisines: string[]
  likesDessertTaste: string[]
  likesSpiciness: string[]
}

//  todo: move type to separate file
interface SolidPodResponseError extends Error {
  statusCode?: number
}

type Props = {
  loginMethod: LoginMethod
}

const Profile: React.FC<Props> = ({ loginMethod }) => {
  const { session } = useSession()

  const [userProfileExists, setUserProfileExists] = useState(false)

  const [showSidebar, setShowSidebar] = useState(false)

  const [loadingProfile, setLoadingProfile] = useState(true)

  const [userProfile, setUserProfile] = useState<UserProfile>({
    allergicTo: [],
    onDiets: [],
    likesCuisines: [],
    likesDessertTaste: [],
    likesSpiciness: [],
  })

  useEffect(() => {
    // todo: add a loading state
    void checkIfProfileExists()
  }, [])

  async function checkIfProfileExists() {
    if (loginMethod === LoginMethod.SOLID) {
      const podUrl = await getPodUrl()

      const profileLocation = 'eatingPreferencesProfile/profile'

      const profileUrl = podUrl + profileLocation

      try {
        // Attempt to retrieve a profile
        await getSolidDataset(profileUrl, {
          fetch: fetch as undefined,
        })

        setUserProfileExists(true)
      } catch (error) {
        if (
          typeof (error as SolidPodResponseError).statusCode === 'number' &&
          (error as SolidPodResponseError).statusCode === 404
        ) {
          setUserProfileExists(false)
        }
      }
    }

    if (loginMethod === LoginMethod.FIREBASE) {
      const loggedInUser = auth.currentUser

      //  Get rid of a TypeScript error
      if (loggedInUser === null) {
        return
      }

      const profileRef = doc(db, 'users', loggedInUser?.uid)
      const userProfile = await getDoc(profileRef)

      if (userProfile.exists()) {
        console.log('Document data:', userProfile.data())

        setUserProfileExists(true)
      } else {
        console.log('No such document!')
        setUserProfileExists(false)
      }
    }

    setLoadingProfile(false)
  }

  async function getPodUrl() {
    const userWebID: string =
      session.info.webId !== undefined ? session.info.webId : ''

    const podUrls = await getPodUrlAll(userWebID, {
      fetch: fetch as undefined,
    }).catch((error: Error) => console.log(error.message))

    // todo: add better error handling
    // Get rid of a TypeScript error
    if (podUrls === undefined) {
      throw new Error('Array with pod URLs is undefined')
    }

    const firstPodUrl = podUrls[0]

    return firstPodUrl
  }

  if (loadingProfile) {
    return <h1>Loading profile data</h1>
  }

  if (!userProfileExists) {
    return (
      <CreateProfile
        loginMethod={loginMethod}
        setUserProfileExists={setUserProfileExists}
      />
    )
  }

  return (
    <>
      <h1 className="mt-3">Profile overview</h1>
      <p>
        Signed in with{' '}
        {loginMethod === LoginMethod.SOLID ? 'solid' : 'firebase'}
      </p>
      <button>Load profile</button>

      <h2>You are allergic to</h2>
      <ul>
        {userProfile.allergicTo.map((allergen) => {
          return <li>{allergen}</li>
        })}
      </ul>

      <h2>You are on diets</h2>
      <ul>
        {userProfile.onDiets.map((diet) => {
          return <li>{diet}</li>
        })}
      </ul>

      <h2>You like cuisines</h2>
      <ul>
        {userProfile.likesCuisines.map((cuisine) => {
          return <li>{cuisine}</li>
        })}
      </ul>

      <h2>You like desserts</h2>
      <ul>
        {userProfile.likesDessertTaste.map((dessertTaste) => {
          return <li>{dessertTaste}</li>
        })}
      </ul>

      <h2>You like spiciness</h2>
      <ul>
        {userProfile.likesSpiciness.map((spiciness) => {
          return <li>{spiciness}</li>
        })}
      </ul>

      <Button
        variant="primary"
        onClick={() => setShowSidebar(true)}
        className="position-absolute top-0 end-0 mt-4 me-4"
      >
        <img src="images/hamburger_menu_icon.svg" className="hamburger-icon" />
      </Button>

      <Offcanvas
        show={showSidebar}
        onHide={() => setShowSidebar(false)}
        placement="end"
        className="sidebar-menu"
      >
        <Offcanvas.Header className="border">
          <Offcanvas.Title>
            <img
              className="w-25 mb-2"
              src="images/app_logo.svg"
              alt="application_logo"
            />
            <span className="ms-4">Menu</span>
          </Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <div className="mt-2">Edit profile</div>
          <div className="mt-4">Select Solid Pod</div>
          <div className="mt-4">Import profile</div>
          <div className="mt-4">Export profile</div>
          <div
            onClick={() => {
              signOut(auth).catch((error: Error) => {
                console.log(error.message)
              })

              session.logout().catch((error: Error) => {
                console.log(error.message)
              })
            }}
            className="mt-4"
          >
            Log out
          </div>
        </Offcanvas.Body>
      </Offcanvas>
    </>
  )
}

export default Profile
