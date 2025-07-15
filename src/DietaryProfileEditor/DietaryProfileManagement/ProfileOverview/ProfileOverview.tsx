import { useState, useContext } from 'react'
import LanguageContext from '../../LanguageContext'
import { useSession } from '@inrupt/solid-ui-react'
import { useAuthState } from 'react-firebase-hooks/auth'
import { auth } from '../../../firebase'
import { signOut } from 'firebase/auth'
import { useNavigate } from 'react-router-dom'
import './ProfileOverview.css'
import { FormattedMessage, useIntl } from 'react-intl'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Card from 'react-bootstrap/Card'
import Stack from 'react-bootstrap/Stack'
import Button from 'react-bootstrap/Button'
import Offcanvas from 'react-bootstrap/Offcanvas'
import { useQuery } from '@tanstack/react-query'
import {
  getInteger,
  getPodUrlAll,
  getSolidDataset,
  getStringEnglish,
  getStringNoLocale,
  getThing,
  getUrlAll,
  SolidDataset,
} from '@inrupt/solid-client'
import { FOAF } from '@inrupt/vocab-common-rdf'
import Spinner from 'react-bootstrap/Spinner'
import axios from 'axios'

const allergenIntlMessageList = [
  {
    allergenIntlMessageId: 'gluten',
    allergenIri: 'http://www.wikidata.org/entity/Q188251',
  },
  {
    allergenIntlMessageId: 'crustaceans',
    allergenIri: 'http://www.wikidata.org/entity/Q25364',
  },
  {
    allergenIntlMessageId: 'eggs',
    allergenIri: 'http://www.wikidata.org/entity/Q93189',
  },
  {
    allergenIntlMessageId: 'fish',
    allergenIri: 'http://www.wikidata.org/entity/Q152',
  },
  {
    allergenIntlMessageId: 'peanuts',
    allergenIri: 'http://www.wikidata.org/entity/Q37383',
  },
  {
    allergenIntlMessageId: 'soya',
    allergenIri: 'http://www.wikidata.org/entity/Q11006',
  },
  {
    allergenIntlMessageId: 'milk',
    allergenIri: 'http://www.wikidata.org/entity/Q8495',
  },
  {
    allergenIntlMessageId: 'nuts',
    allergenIri: 'http://www.wikidata.org/entity/Q11009',
  },
  {
    allergenIntlMessageId: 'celery',
    allergenIri: 'http://www.wikidata.org/entity/Q28298',
  },
  {
    allergenIntlMessageId: 'mustard',
    allergenIri: 'http://www.wikidata.org/entity/Q1937700',
  },
  {
    allergenIntlMessageId: 'sesame',
    allergenIri: 'http://www.wikidata.org/entity/Q2763698',
  },
  {
    allergenIntlMessageId: 'sulphites',
    allergenIri: 'http://www.wikidata.org/entity/Q413363',
  },
  {
    allergenIntlMessageId: 'lupin',
    allergenIri: 'http://www.wikidata.org/entity/Q13582643',
  },
  {
    allergenIntlMessageId: 'molluscs',
    allergenIri: 'http://www.wikidata.org/entity/Q6501235',
  },
]

const dietIntlMessageList = [
  {
    dietIntlMessageId: 'vegetarianDiet',
    dietIri: 'http://www.wikidata.org/entity/Q83364',
    label: 'Vegetarian',
  },
  {
    dietIntlMessageId: 'mediterraneanDiet',
    dietIri: 'http://www.wikidata.org/entity/Q47564',
    label: 'Mediterranean',
  },
  {
    dietIntlMessageId: 'lowCarbDiet',
    dietIri: 'http://www.wikidata.org/entity/Q1570280',
    label: 'Low-carb',
  },
  {
    dietIntlMessageId: 'dashDiet',
    dietIri: 'http://www.wikidata.org/entity/Q5204325',
    label: 'DASH',
  },
  {
    dietIntlMessageId: 'veganDiet',
    dietIri: 'http://www.wikidata.org/entity/Q181138',
    label: 'Vegan',
  },
  {
    dietIntlMessageId: 'ketoDiet',
    dietIri: 'http://www.wikidata.org/entity/Q1070684',
    label: 'Keto',
  },
  {
    dietIntlMessageId: 'atkinsDiet',
    dietIri: 'http://www.wikidata.org/entity/Q756030',
    label: 'Atkins',
  },
  {
    dietIntlMessageId: 'paleoDiet',
    dietIri: 'http://www.wikidata.org/entity/Q533945',
    label: 'Paleo',
  },
]

type ProfileOverviewProps = {
  setEditProfile: React.Dispatch<React.SetStateAction<boolean>>
}

/**
 * Displays the logged in user's dietary profile.
 * @param setEditProfile Changes a state variable to indicate whether the user wants to edit their dietary profile.
 */
const ProfileOverview: React.FC<ProfileOverviewProps> = ({
  setEditProfile,
}) => {
  const { session: solidSession } = useSession()

  const [firebaseUser] = useAuthState(auth)

  const signedInWithSolid = solidSession.info.isLoggedIn

  const signedInWithFirebase = firebaseUser !== null

  const routerNavigate = useNavigate()

  const intl = useIntl()

  const { selectedLanguage } = useContext(LanguageContext)

  const [showOffcanvas, setShowOffCanvas] = useState(false)

  const dietaryProfileQuery = useQuery({
    queryKey: ['getUserDietaryProfile'],
    queryFn: fetchDietaryProfile,
  })

  const userNameQuery = useQuery({
    queryKey: ['getUserName'],
    queryFn: fetchUserName,
  })

  interface SolidPodResponseError extends Error {
    statusCode?: number
  }

  type DietBinding = {
    diet: {
      type: string
      value: string
    }
    dietLabel: {
      type: string
      value: string
    }
  }

  type DietResponse = {
    head: {
      vars: string[]
    }
    results: {
      bindings: DietBinding[]
    }
  }

  type DietaryProfileObject = {
    allergens: string[]
    diets: string[]
    calories: number
    cuisines: string[]
    likedIngredients: string[]
    dislikedIngredients: string[]
    spicinessLevel: string
    cookingMethods: string[]
  }

  /**
   * Retrieves dietary profile of the signed-in user.
   */
  async function fetchDietaryProfile() {
    if (signedInWithSolid) {
      return await fetchDietaryProfileSolidPod()
    }

    // if (signedInWithFirebase) {

    // }

    return null
  }

  /**
   * Retrieves full name of the signed-in user.
   */
  async function fetchUserName() {
    if (signedInWithSolid) {
      const userWebId = solidSession.info.webId

      if (userWebId === undefined) {
        return ''
      }

      let userName = ''

      // Read user name from profile card
      await getSolidDataset(userWebId, {
        fetch: solidSession.fetch as undefined,
      })
        .then((profileDataset) => {
          const userThing = getThing(profileDataset, userWebId)

          if (userThing === null) {
            return
          }

          const foafName = getStringNoLocale(userThing, FOAF.name)

          if (foafName === null) {
            return
          }

          userName = foafName
        })
        .catch((error) => {
          console.error('Fetching user name failed', error)
          throw error
        })

      return userName
    }

    if (signedInWithFirebase) {
      if (firebaseUser === undefined) {
        return ''
      }

      return firebaseUser.displayName
    }

    return ''
  }

  /**
   * Retrieves dietary profile of the signed-in user from their Solid Pod.
   */
  async function fetchDietaryProfileSolidPod() {
    const userWebId = solidSession.info.webId

    if (userWebId === undefined) {
      return null
    }

    const podUrls = await getPodUrlAll(userWebId, {
      fetch: solidSession.fetch as undefined,
    })

    const podUrl = podUrls[0]

    const dietaryProfileLocation =
      'dietary-profile-editor-application/dietary-profile'

    const profileUrl = podUrl + dietaryProfileLocation

    let dietaryProfileDataset: SolidDataset

    try {
      // Attempt to retrieve the profile
      dietaryProfileDataset = await getSolidDataset(profileUrl, {
        fetch: solidSession.fetch as undefined,
      })
    } catch (error) {
      if (
        typeof (error as SolidPodResponseError).statusCode === 'number' &&
        (error as SolidPodResponseError).statusCode === 404
      ) {
        // If not found, return null
        return null
      } else {
        console.error((error as Error).message)
        alert(
          'There was an error while retrieving the profile with the code ' +
            (error as SolidPodResponseError).statusCode,
        )
        throw error
      }
    }

    const dietaryProfileWithIris: DietaryProfileObject = {
      allergens: [],
      diets: [],
      calories: 0,
      cuisines: [],
      likedIngredients: [],
      dislikedIngredients: [],
      spicinessLevel: '',
      cookingMethods: [],
    }

    let dietaryProfileThing = getThing(dietaryProfileDataset, profileUrl)

    if (dietaryProfileThing === null) {
      dietaryProfileThing = getThing(dietaryProfileDataset, profileUrl + '#')
    }

    if (dietaryProfileThing === null) {
      return null
    }

    const ontologyIri =
      'https://jiriresler.solidcommunity.net/public/dietary-profile-and-customized-menus-ontology#'

    dietaryProfileWithIris.allergens = getUrlAll(
      dietaryProfileThing,
      ontologyIri + 'allergicTo',
    )

    dietaryProfileWithIris.diets = getUrlAll(
      dietaryProfileThing,
      ontologyIri + 'onDiet',
    )

    const calories = getInteger(
      dietaryProfileThing,
      ontologyIri + 'dailyCalorieIntakeGoal',
    )

    if (calories !== null) {
      dietaryProfileWithIris.calories = calories
    }

    dietaryProfileWithIris.cuisines = getUrlAll(
      dietaryProfileThing,
      ontologyIri + 'favoriteCuisine',
    )

    dietaryProfileWithIris.likedIngredients = getUrlAll(
      dietaryProfileThing,
      ontologyIri + 'likedIngredient',
    )

    dietaryProfileWithIris.dislikedIngredients = getUrlAll(
      dietaryProfileThing,
      ontologyIri + 'dislikedIngredient',
    )

    const spicinessLevel = getStringEnglish(
      dietaryProfileThing,
      ontologyIri + 'foodSpicinessPreference',
    )

    if (spicinessLevel !== null) {
      if (spicinessLevel === 'extra-hot') {
        dietaryProfileWithIris.spicinessLevel = intl.formatMessage({
          id: 'extraHot',
          defaultMessage: 'Extra-hot',
        })
      } else {
        const capitalizedSpicinessLevel =
          spicinessLevel.charAt(0).toUpperCase() + spicinessLevel.slice(1)

        dietaryProfileWithIris.spicinessLevel = intl.formatMessage({
          id: spicinessLevel,
          defaultMessage: capitalizedSpicinessLevel,
        })
      }
    }

    dietaryProfileWithIris.cookingMethods = getUrlAll(
      dietaryProfileThing,
      ontologyIri + 'preferredCookingMethod',
    )

    return await formatDietaryProfileResponse(dietaryProfileWithIris)
  }

  /**
   * Creates an object with resource labels instead of IRIs.
   */
  async function formatDietaryProfileResponse(
    dietaryProfileIris: DietaryProfileObject | null,
  ) {
    // Non-existing profile
    if (dietaryProfileIris === null) {
      return null
    }

    const dietaryProfileLabels: DietaryProfileObject = {
      allergens: [],
      diets: [],
      calories: dietaryProfileIris.calories,
      cuisines: [],
      likedIngredients: [],
      dislikedIngredients: [],
      spicinessLevel: dietaryProfileIris.spicinessLevel,
      cookingMethods: [],
    }

    // Find allergen labels based on their IRIs
    for (const allergenIri of dietaryProfileIris.allergens) {
      let allergenIntlMessageid = ''

      for (const allergen of allergenIntlMessageList) {
        if (allergen.allergenIri === allergenIri) {
          allergenIntlMessageid = allergen.allergenIntlMessageId
        }
      }

      // Capitalized intl message id
      const allergenEnglishlabel =
        allergenIntlMessageid.charAt(0).toUpperCase() +
        allergenIntlMessageid.slice(1)

      dietaryProfileLabels.allergens.push(
        intl.formatMessage({
          id: allergenIntlMessageid,
          defaultMessage: allergenEnglishlabel,
        }),
      )
    }

    // Find diet labels based on their IRIs
    const dietLabelsToFetch = []

    for (const dietIri of dietaryProfileIris.diets) {
      let dietIntlMessageId = ''

      for (const diet of dietIntlMessageList) {
        if (diet.dietIri === dietIri) {
          dietIntlMessageId = diet.dietIntlMessageId

          dietaryProfileLabels.diets.push(
            intl.formatMessage({
              id: dietIntlMessageId,
              defaultMessage: diet.label,
            }),
          )
        }
      }

      if (dietIntlMessageId === '') {
        dietLabelsToFetch.push(dietIri)
      }
    }

    const dietIrisInBrackets = dietLabelsToFetch.map((dietIri) => {
      return '<' + dietIri + '>'
    })

    // SPARQL query to retrieve diet labels from Wikidata
    const sparqlQuery = `
      SELECT DISTINCT ?diet ?dietLabel WHERE {
        ?diet (wdt:P31|wdt:P279) wd:Q474191.
        FILTER(?diet IN(${dietIrisInBrackets.join(', ')}))
        SERVICE wikibase:label { bd:serviceParam wikibase:language "${selectedLanguage},en,mul". }
      }
    `

    const endpointUrl = 'https://query.wikidata.org/sparql'

    const requestUrl = endpointUrl + '?query=' + encodeURI(sparqlQuery)

    const requestHeaders = {
      Accept: 'application/sparql-results+json',
    }

    await axios
      .get<DietResponse>(requestUrl, { headers: requestHeaders })
      .then((response) => {
        for (const dietBinding of response.data.results.bindings) {
          const dietLabelValue = dietBinding.dietLabel.value

          const capitalizedDietLabel =
            dietLabelValue.charAt(0).toUpperCase() + dietLabelValue.slice(1)

          dietaryProfileLabels.diets.push(capitalizedDietLabel)
        }
      })
      .catch((error) => {
        console.error('Error while fetching diet labels.', error)
        throw error
      })
    console.log(dietaryProfileLabels)
    return dietaryProfileLabels
  }

  /**
   * Signs the user out of the application.
   */
  async function applicationSignOut() {
    if (signedInWithSolid) {
      await solidSession.logout({ logoutType: 'app' }).catch((error: Error) => {
        console.log(error.message)
      })
    }

    if (signedInWithFirebase) {
      await signOut(auth).catch((error: Error) => {
        console.log(error.message)
      })
    }

    routerNavigate('/login')
  }

  return (
    <div className="position-relative profile-overview-screen">
      <Offcanvas
        show={showOffcanvas}
        onHide={() => setShowOffCanvas(false)}
        placement="end"
        className="profile-overview-offcanvas"
      >
        <button
          className="invisible-button position-absolute top-0 end-0"
          aria-label="Close offcanvas"
          onClick={() => setShowOffCanvas(false)}
        >
          <img
            src="images/close-x.svg"
            alt="Close offcanvas icon"
            className="offcanvas-close-icon"
          />
        </button>

        <div className="user-information">
          <div className="user-name mb-2">{userNameQuery.data}</div>
        </div>

        <hr className="mb-2" />

        <button
          className="invisible-button offcanvas-item-button text-start position-relative"
          onClick={() => setEditProfile(true)}
        >
          <img
            src="images/pencil-square-black.svg"
            alt="Edit profile icon"
            className="offcanvas-item-button-icon position-absolute"
          />

          <span className="ms-5">
            <FormattedMessage id="editProfile" defaultMessage="Edit profile" />
          </span>
        </button>

        <button
          className="invisible-button offcanvas-item-button text-start position-relative"
          onClick={() => alert('Delete pressed')}
        >
          <img
            src="images/trash.svg"
            alt="Delete profile icon"
            className="offcanvas-item-button-icon position-absolute"
          />

          <span className="ms-5">
            <FormattedMessage
              id="deleteProfile"
              defaultMessage="Delete profile"
            />
          </span>
        </button>

        <button
          onClick={() => {
            void applicationSignOut()
          }}
          className="invisible-button offcanvas-item-button text-start position-relative"
        >
          <img
            src="images/box-arrow-right.svg"
            alt="Sign out icon"
            className="offcanvas-signout-icon position-absolute"
          />

          <span className="ms-5 text-danger">
            <FormattedMessage id="signOut" defaultMessage="Sign out" />
          </span>
        </button>
      </Offcanvas>

      <Row className="sticky-top profile-overview-head-section align-items-center">
        <Col className="ms-2" xs={8}>
          <FormattedMessage
            id="profileOverviewHeading"
            defaultMessage="Dietary profile"
          />
        </Col>

        <Col className="text-end">
          <button
            onClick={() => setShowOffCanvas(true)}
            className="invisible-button"
            aria-label="Open offcanvas"
          >
            <img
              src="images/list.svg"
              alt="Hamburger icon"
              className="offcanvas-menu-icon"
            />
          </button>
        </Col>
      </Row>

      {dietaryProfileQuery.isPending && (
        <Spinner
          animation="border"
          role="status"
          variant="primary"
          className="position-absolute top-50 start-50"
        >
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      )}

      {!dietaryProfileQuery.isPending && dietaryProfileQuery.data === null && (
        <div className="position-absolute top-50 start-50 translate-middle empty-profile-text">
          <FormattedMessage
            id="emptyProfileText"
            defaultMessage="Profile is empty, click the Edit Profile button to start."
          />
        </div>
      )}

      {dietaryProfileQuery.data !== null && !dietaryProfileQuery.isPending && (
        <Stack gap={3} className="preferences-card-stack mt-3 mb-3">
          <Card>
            <Card.Body>
              <Card.Title>
                <img
                  src="images/exclamation-triangle.svg"
                  alt="allergen-warning-icon"
                  className="me-2 mb-1 preference-card-icon"
                />

                <FormattedMessage
                  id="allergenPreferencesHeading"
                  defaultMessage="Allergens"
                />
              </Card.Title>

              <Card.Subtitle className="mt-2 mb-2">
                <span className="text-muted">
                  <FormattedMessage
                    id="allergicTo"
                    defaultMessage="You are allergic to: "
                  />
                </span>

                {dietaryProfileQuery.data !== undefined && (
                  <span>{dietaryProfileQuery.data.allergens.join(', ')}</span>
                )}
              </Card.Subtitle>
            </Card.Body>
          </Card>

          <Card>
            <Card.Body>
              <Card.Title>
                <img
                  src="images/leaf.svg"
                  alt="diet-leaf-icon"
                  className="me-2 mb-1 preference-card-icon"
                />

                <FormattedMessage
                  id="dietPreferencesHeading"
                  defaultMessage="Diets"
                />
              </Card.Title>

              <Card.Subtitle className="mt-2 mb-2">
                <Stack gap={2}>
                  <div>
                    <span className="text-muted">
                      <FormattedMessage
                        id="onDiets"
                        defaultMessage="Your are on diets: "
                      />
                    </span>

                    <span>{dietaryProfileQuery.data?.diets.join(', ')}</span>
                  </div>

                  <div>
                    <span className="text-muted">
                      <FormattedMessage
                        id="dailyCalorieIntakeGoal"
                        defaultMessage="Daily calorie intake: "
                      />
                    </span>

                    {dietaryProfileQuery.data?.calories !== undefined && (
                      <span>
                        {dietaryProfileQuery.data?.calories > 0
                          ? dietaryProfileQuery.data?.calories + ' kcal'
                          : ''}
                      </span>
                    )}
                  </div>
                </Stack>
              </Card.Subtitle>
            </Card.Body>
          </Card>

          <Card>
            <Card.Body>
              <Card.Title>
                <img
                  src="images/fork-knife.svg"
                  alt="fork-knife-icon"
                  className="me-2 mb-1 preference-card-icon"
                />

                <FormattedMessage
                  id="tastePreferencesHeading"
                  defaultMessage="Taste Preferences"
                />
              </Card.Title>

              <Card.Subtitle className="mt-2 mb-2">
                <Stack gap={2}>
                  <div>
                    <span className="text-muted">
                      <FormattedMessage
                        id="yourFavoriteCuisines"
                        defaultMessage="Favorite cuisines: "
                      />
                    </span>

                    <span>{dietaryProfileQuery.data?.cuisines.join(', ')}</span>
                  </div>

                  <div>
                    <span className="text-muted">
                      <FormattedMessage
                        id="howSpicyYouLikeYourFood"
                        defaultMessage="Preferred level of spiciness: "
                      />
                    </span>

                    <span>{dietaryProfileQuery.data?.spicinessLevel}</span>
                  </div>

                  <div>
                    <span className="text-muted">
                      <FormattedMessage
                        id="likedIngredients"
                        defaultMessage="Liked ingredients: "
                      />
                    </span>

                    <span>
                      {dietaryProfileQuery.data?.likedIngredients.join(', ')}
                    </span>
                  </div>

                  <div>
                    <span className="text-muted">
                      <FormattedMessage
                        id="dislikedIngredients"
                        defaultMessage="Disliked ingredients: "
                      />
                    </span>

                    <span>
                      {dietaryProfileQuery.data?.dislikedIngredients.join(', ')}
                    </span>
                  </div>

                  <div>
                    <span className="text-muted">
                      <FormattedMessage
                        id="preferredCookingMethodsOverview"
                        defaultMessage="Preferred cooking methods: "
                      />
                    </span>

                    <span>
                      {dietaryProfileQuery.data?.cookingMethods.join(', ')}
                    </span>
                  </div>
                </Stack>
              </Card.Subtitle>
            </Card.Body>
          </Card>
        </Stack>
      )}

      <Button
        className="position-absolute position-fixed bottom-0 end-0 mb-4 me-4 edit-profile-round-button shadow"
        onClick={() => setEditProfile(true)}
      >
        <img
          src="images/pencil-square-blue.svg"
          alt="Edit profile icon"
          className="edit-profile-round-icon"
        />
      </Button>
    </div>
  )
}

export default ProfileOverview
