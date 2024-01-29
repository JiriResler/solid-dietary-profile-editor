import { useEffect, useState } from 'react'
import CreateProfile from '../CreateProfile/CreateProfile'
import { LoginMethod } from '../loginMethodEnum'
import './Profile.css'
import { useSession } from '@inrupt/solid-ui-react'
import {
  getPodUrlAll,
  getSolidDataset,
  getThing,
  getUrlAll,
} from '@inrupt/solid-client'
import { fetch } from '@inrupt/solid-client-authn-browser'
import { doc, getDoc } from 'firebase/firestore'
import { db, auth } from '../../firebase'
import Card from 'react-bootstrap/Card'
import Stack from 'react-bootstrap/Stack'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import OffCanvasMenu from './OffCanvasMenu'

type UserProfile = {
  allergicTo: string[]
  onDiets: string[]
  likesCuisines: string[]
  likesDessertTaste: string[]
  likesSpiciness: string[]
}

type Props = {
  loginMethod: LoginMethod
}

const Profile: React.FC<Props> = ({ loginMethod }) => {
  const { session } = useSession()

  const [loadingProfile, setLoadingProfile] = useState(true)

  const [userProfile, setUserProfile] = useState<UserProfile | null>(null)

  useEffect(() => {
    void loadUserProfile()
  }, [])

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

  async function loadUserProfile() {
    setLoadingProfile(true)

    if (loginMethod === LoginMethod.SOLID) {
      const podUrl = await getPodUrl()

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

    setLoadingProfile(false)
  }

  if (loadingProfile) {
    return <h1>Loading profile data</h1>
  }

  if (userProfile === null) {
    return <CreateProfile loginMethod={loginMethod} />
  }

  return (
    <>
      <OffCanvasMenu />

      <Stack gap={3} className="mt-4">
        <Row className="w-75">
          <Col xs={4}>
            <img
              src="images/profile_picture_default.svg"
              alt="Profile icon"
              style={{ width: '75px' }}
            />
          </Col>
          <Col className="my-auto">
            <Row>
              <Col xs={12}>
                <span className="text-bold">Name</span>
              </Col>
              <Col>Email</Col>
            </Row>
          </Col>
        </Row>

        <Card>
          <Card.Header>
            <span className="text-bold">Allergens</span>
          </Card.Header>
          <Card.Body>
            <Card.Subtitle className="mb-2 text-muted">
              You are allergic to
            </Card.Subtitle>
            <Card.Text>
              {userProfile.allergicTo.map((allergen) => {
                return (
                  <span key={allergen}>
                    - {allergen}{' '}
                    <img
                      src="images/info_icon.svg"
                      alt="information icon"
                      onClick={() => {
                        alert('click')
                      }}
                    />
                  </span>
                )
              })}
            </Card.Text>
          </Card.Body>
        </Card>
      </Stack>
    </>
  )
}

export default Profile
