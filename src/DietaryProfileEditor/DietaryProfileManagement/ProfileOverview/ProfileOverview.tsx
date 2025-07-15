import { useState, useContext } from 'react'
import LanguageContext from '../../LanguageContext'
import { useSession } from '@inrupt/solid-ui-react'
import { useAuthState } from 'react-firebase-hooks/auth'
import { auth, db } from '../../../firebase'
import { signOut } from 'firebase/auth'
import { useNavigate } from 'react-router-dom'
import './ProfileOverview.css'
import { FormattedMessage, useIntl } from 'react-intl'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Card from 'react-bootstrap/Card'
import Stack from 'react-bootstrap/Stack'
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'
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
  deleteSolidDataset,
} from '@inrupt/solid-client'
import { FOAF } from '@inrupt/vocab-common-rdf'
import Spinner from 'react-bootstrap/Spinner'
import axios from 'axios'
import { doc, getDoc } from 'firebase/firestore'

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

const cuisineIntlMessageList = [
  {
    cuisineIntlMessageId: 'italianCuisine',
    cuisineIri: 'http://www.wikidata.org/entity/Q192786',
    label: 'Italian',
  },
  {
    cuisineIntlMessageId: 'greekCuisine',
    cuisineIri: 'http://www.wikidata.org/entity/Q744027',
    label: 'Greek',
  },
  {
    cuisineIntlMessageId: 'mexicanCuisine',
    cuisineIri: 'http://www.wikidata.org/entity/Q207965',
    label: 'Mexican',
  },
  {
    cuisineIntlMessageId: 'chineseCuisine',
    cuisineIri: 'http://www.wikidata.org/entity/Q10876842',
    label: 'Chinese',
  },
  {
    cuisineIntlMessageId: 'turkishCuisine',
    cuisineIri: 'http://www.wikidata.org/entity/Q654493',
    label: 'Turkish',
  },
  {
    cuisineIntlMessageId: 'spanishCuisine',
    cuisineIri: 'http://www.wikidata.org/entity/Q622512',
    label: 'Spanish',
  },
  {
    cuisineIntlMessageId: 'japaneseCuisine',
    cuisineIri: 'http://www.wikidata.org/entity/Q234138',
    label: 'Japanese',
  },
  {
    cuisineIntlMessageId: 'frenchCuisine',
    cuisineIri: 'http://www.wikidata.org/entity/Q6661',
    label: 'French',
  },
]

const cookingMethodIntlMessageList = [
  {
    cookingMethodIntlMessageId: 'bakingMethod',
    cookingMethodIri: 'http://www.wikidata.org/entity/Q720398',
    label: 'Baking',
  },
  {
    cookingMethodIntlMessageId: 'grillingMethod',
    cookingMethodIri: 'http://www.wikidata.org/entity/Q264619',
    label: 'Grilling',
  },
  {
    cookingMethodIntlMessageId: 'boilingMethod',
    cookingMethodIri: 'http://www.wikidata.org/entity/Q20074315',
    label: 'Boiling',
  },
  {
    cookingMethodIntlMessageId: 'deepFryingMethod',
    cookingMethodIri: 'http://www.wikidata.org/entity/Q854618',
    label: 'Deep-frying',
  },
  {
    cookingMethodIntlMessageId: 'steamingMethod',
    cookingMethodIri: 'http://www.wikidata.org/entity/Q1415859',
    label: 'Steaming',
  },
  {
    cookingMethodIntlMessageId: 'sauteingMethod',
    cookingMethodIri: 'http://www.wikidata.org/entity/Q1521462',
    label: 'Sauteing',
  },
]

type ProfileOverviewProps = {
  setEditProfile: React.Dispatch<React.SetStateAction<boolean>>
}

interface SolidPodResponseError extends Error {
  statusCode?: number
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

  const [showDeleteProfileModal, setShowDeleteProfileModal] = useState(false)

  const [showProfileLoadErrorModal, setShowProfileLoadErrorModal] =
    useState(false)

  const [profileWasDeleted, setProfileWasDeleted] = useState(false)

  const [profileDeleteInProgress, setProfileDeleteInProgress] = useState(false)

  const [profileDeleteModalMessage, setProfileDeleteModalMessage] = useState(
    intl.formatMessage({
      id: 'profileDeletionConfirm',
      defaultMessage: 'Are you sure you want to delete your dietary profile?',
    }),
  )

  const dietaryProfileQuery = useQuery({
    queryKey: ['getUserDietaryProfile'],
    queryFn: fetchDietaryProfile,
  })

  const userNameQuery = useQuery({
    queryKey: ['getUserName'],
    queryFn: fetchUserName,
  })

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

  type CuisineBinding = {
    cuisine: {
      type: string
      value: string
    }
    cuisineLabel: {
      type: string
      value: string
    }
  }

  type CuisineResponse = {
    head: {
      vars: string[]
    }
    results: {
      bindings: CuisineBinding[]
    }
  }

  type IngredientBinding = {
    ingredient: {
      type: string
      value: string
    }
    ingredientLabel: {
      type: string
      value: string
    }
  }

  type IngredientResponse = {
    head: {
      vars: string[]
    }
    results: {
      bindings: IngredientBinding[]
    }
  }

  type CookingMethodBinding = {
    cookingMethod: {
      type: string
      value: string
    }
    cookingMethodLabel: {
      type: string
      value: string
    }
  }

  type CookingMethodResponse = {
    head: {
      vars: string[]
    }
    results: {
      bindings: CookingMethodBinding[]
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

    if (signedInWithFirebase) {
      return await fetchDietaryProfileFirebase()
    }

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

        setShowProfileLoadErrorModal(true)
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
   * Retrieves dietary profile of the signed-in user from Firestore.
   */
  async function fetchDietaryProfileFirebase() {
    let dietaryProfileWithIris: DietaryProfileObject = {
      allergens: [],
      diets: [],
      calories: 0,
      cuisines: [],
      likedIngredients: [],
      dislikedIngredients: [],
      spicinessLevel: '',
      cookingMethods: [],
    }

    if (firebaseUser === null || firebaseUser === undefined) {
      return null
    }

    const dietaryProfileDoc = await getDoc(doc(db, 'users', firebaseUser.uid))

    if (dietaryProfileDoc.exists()) {
      dietaryProfileWithIris = dietaryProfileDoc.data() as DietaryProfileObject
    } else {
      setShowProfileLoadErrorModal(true)
    }

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
    const sparqlQueryDiets = `
      SELECT DISTINCT ?diet ?dietLabel WHERE {
        ?diet (wdt:P31|wdt:P279) wd:Q474191.
        FILTER(?diet IN(${dietIrisInBrackets.join(', ')}))
        SERVICE wikibase:label { bd:serviceParam wikibase:language "${selectedLanguage},en,mul". }
      }
    `

    const endpointUrlDiets = 'https://query.wikidata.org/sparql'

    const requestUrlDiets =
      endpointUrlDiets + '?query=' + encodeURI(sparqlQueryDiets)

    const requestHeadersDiets = {
      Accept: 'application/sparql-results+json',
    }

    await axios
      .get<DietResponse>(requestUrlDiets, { headers: requestHeadersDiets })
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
        setShowProfileLoadErrorModal(true)
        throw error
      })

    // Find cuisine labels based on their IRIs
    const cuisineLabelsToFetch = []

    for (const cuisineIri of dietaryProfileIris.cuisines) {
      let cuisineIntlMessageId = ''

      for (const cuisine of cuisineIntlMessageList) {
        if (cuisine.cuisineIri === cuisineIri) {
          cuisineIntlMessageId = cuisine.cuisineIntlMessageId

          dietaryProfileLabels.cuisines.push(
            intl.formatMessage({
              id: cuisineIntlMessageId,
              defaultMessage: cuisine.label,
            }),
          )
        }
      }

      if (cuisineIntlMessageId === '') {
        cuisineLabelsToFetch.push(cuisineIri)
      }
    }

    const cuisineIrisInBrackets = cuisineLabelsToFetch.map((cuisineIri) => {
      return '<' + cuisineIri + '>'
    })

    // SPARQL query to retrieve cuisine labels from Wikidata
    const sparqlQueryCuisines = `
      SELECT DISTINCT ?cuisine ?cuisineLabel WHERE {
        ?cuisine (wdt:P31|wdt:P279) wd:Q1968435.
        FILTER(?cuisine IN(${cuisineIrisInBrackets.join(', ')}))
        SERVICE wikibase:label { bd:serviceParam wikibase:language "${selectedLanguage},en,mul". }
      }
    `

    const endpointUrlCuisines = 'https://query.wikidata.org/sparql'

    const requestUrlCuisines =
      endpointUrlCuisines + '?query=' + encodeURI(sparqlQueryCuisines)

    const requestHeadersCuisines = {
      Accept: 'application/sparql-results+json',
    }

    await axios
      .get<CuisineResponse>(requestUrlCuisines, {
        headers: requestHeadersCuisines,
      })
      .then((response) => {
        for (const cuisineBinding of response.data.results.bindings) {
          const cuisineLabelValue = cuisineBinding.cuisineLabel.value

          const capitalizedCuisineLabel =
            cuisineLabelValue.charAt(0).toUpperCase() +
            cuisineLabelValue.slice(1)

          dietaryProfileLabels.cuisines.push(capitalizedCuisineLabel)
        }
      })
      .catch((error) => {
        console.error('Error while fetching cuisine labels.', error)
        setShowProfileLoadErrorModal(true)
        throw error
      })

    // Find liked ingredient labels based on their IRIs
    const likedIngredientIrisInBrackets =
      dietaryProfileIris.likedIngredients.map((ingredientIri) => {
        return '<' + ingredientIri + '>'
      })

    // SPARQL query to retrieve liked ingredient labels from Wikidata
    const sparqlQueryLikedIngredients = `
      SELECT DISTINCT ?ingredient ?ingredientLabel WHERE {
        ?ingredient (wdt:P31|wdt:P279) wd:Q25403900.
        FILTER(?ingredient IN(${likedIngredientIrisInBrackets.join(', ')}))
        SERVICE wikibase:label { bd:serviceParam wikibase:language "${selectedLanguage},en,mul". }
      }
    `

    const endpointUrlLikedIngredients = 'https://query.wikidata.org/sparql'

    const requestUrlLikedIngredients =
      endpointUrlLikedIngredients +
      '?query=' +
      encodeURI(sparqlQueryLikedIngredients)

    const requestHeadersLikedIngredients = {
      Accept: 'application/sparql-results+json',
    }

    await axios
      .get<IngredientResponse>(requestUrlLikedIngredients, {
        headers: requestHeadersLikedIngredients,
      })
      .then((response) => {
        for (const ingredientBinding of response.data.results.bindings) {
          const ingredientLabelValue = ingredientBinding.ingredientLabel.value

          const capitalizedIngredientLabel =
            ingredientLabelValue.charAt(0).toUpperCase() +
            ingredientLabelValue.slice(1)

          dietaryProfileLabels.likedIngredients.push(capitalizedIngredientLabel)
        }
      })
      .catch((error) => {
        console.error('Error while fetching ingredient labels.', error)
        setShowProfileLoadErrorModal(true)
        throw error
      })

    // Find disliked ingredient labels based on their IRIs
    const dislikedIngredientIrisInBrackets =
      dietaryProfileIris.dislikedIngredients.map((ingredientIri) => {
        return '<' + ingredientIri + '>'
      })

    // SPARQL query to retrieve disliked ingredient labels from Wikidata
    const sparqlQueryDislikedIngredients = `
      SELECT DISTINCT ?ingredient ?ingredientLabel WHERE {
        ?ingredient (wdt:P31|wdt:P279) wd:Q25403900.
        FILTER(?ingredient IN(${dislikedIngredientIrisInBrackets.join(', ')}))
        SERVICE wikibase:label { bd:serviceParam wikibase:language "${selectedLanguage},en,mul". }
      }
    `

    const endpointUrlDislikedIngredients = 'https://query.wikidata.org/sparql'

    const requestUrlDislikedIngredients =
      endpointUrlDislikedIngredients +
      '?query=' +
      encodeURI(sparqlQueryDislikedIngredients)

    const requestHeadersDislikedIngredients = {
      Accept: 'application/sparql-results+json',
    }

    await axios
      .get<IngredientResponse>(requestUrlDislikedIngredients, {
        headers: requestHeadersDislikedIngredients,
      })
      .then((response) => {
        for (const ingredientBinding of response.data.results.bindings) {
          const ingredientLabelValue = ingredientBinding.ingredientLabel.value

          const capitalizedIngredientLabel =
            ingredientLabelValue.charAt(0).toUpperCase() +
            ingredientLabelValue.slice(1)

          dietaryProfileLabels.dislikedIngredients.push(
            capitalizedIngredientLabel,
          )
        }
      })
      .catch((error) => {
        console.error('Error while fetching ingredient labels.', error)
        setShowProfileLoadErrorModal(true)
        throw error
      })

    // Find cooking method labels based on their IRIs
    const cookingMethodLabelsToFetch = []

    for (const cookingMethodIri of dietaryProfileIris.cookingMethods) {
      let cookingMethodIntlMessageId = ''

      for (const cookingMethod of cookingMethodIntlMessageList) {
        if (cookingMethod.cookingMethodIri === cookingMethodIri) {
          cookingMethodIntlMessageId = cookingMethod.cookingMethodIntlMessageId

          dietaryProfileLabels.cookingMethods.push(
            intl.formatMessage({
              id: cookingMethodIntlMessageId,
              defaultMessage: cookingMethod.label,
            }),
          )
        }
      }

      if (cookingMethodIntlMessageId === '') {
        cookingMethodLabelsToFetch.push(cookingMethodIri)
      }
    }

    const cookingMethodIrisInBrackets = cookingMethodLabelsToFetch.map(
      (cookingMethodIri) => {
        return '<' + cookingMethodIri + '>'
      },
    )

    // SPARQL query to retrieve cooking method labels from Wikidata
    const sparqlQueryCookingMethods = `
      SELECT DISTINCT ?cookingMethod ?cookingMethodLabel WHERE {
        ?cookingMethod (wdt:P31|wdt:P279) wd:Q1039303.
        FILTER(?cookingMethod IN(${cookingMethodIrisInBrackets.join(', ')}))
        SERVICE wikibase:label { bd:serviceParam wikibase:language "${selectedLanguage},en,mul". }
      }
    `

    const endpointUrlCookingMethods = 'https://query.wikidata.org/sparql'

    const requestUrlCookingMethods =
      endpointUrlCookingMethods +
      '?query=' +
      encodeURI(sparqlQueryCookingMethods)

    const requestHeadersCookingMethods = {
      Accept: 'application/sparql-results+json',
    }

    await axios
      .get<CookingMethodResponse>(requestUrlCookingMethods, {
        headers: requestHeadersCookingMethods,
      })
      .then((response) => {
        for (const cookingMethodBinding of response.data.results.bindings) {
          const cookingMethodLabelValue =
            cookingMethodBinding.cookingMethodLabel.value

          const capitalizedCookingMethodLabel =
            cookingMethodLabelValue.charAt(0).toUpperCase() +
            cookingMethodLabelValue.slice(1)

          dietaryProfileLabels.cookingMethods.push(
            capitalizedCookingMethodLabel,
          )
        }
      })
      .catch((error) => {
        console.error('Error while fetching cooking method labels.', error)
        setShowProfileLoadErrorModal(true)
        throw error
      })

    return dietaryProfileLabels
  }

  /**
   * Deletes the signed in user's dietary profile
   */
  async function deleteProfile() {
    if (signedInWithSolid) {
      setProfileDeleteInProgress(true)

      const userWebId = solidSession.info.webId

      if (userWebId === undefined) {
        return
      }

      const podUrls = await getPodUrlAll(userWebId, {
        fetch: solidSession.fetch as undefined,
      })

      const podUrl = podUrls[0]

      const profileUrl =
        podUrl + 'dietary-profile-editor-application/dietary-profile'

      deleteSolidDataset(profileUrl, {
        fetch: solidSession.fetch as undefined,
      })
        .then(() => {
          setProfileDeleteModalMessage(
            intl.formatMessage({
              id: 'profileDeletionSuccessMessage',
              defaultMessage: 'Profile was deleted successfully.',
            }),
          )
          setProfileWasDeleted(true)
        })
        .catch((error) => {
          if (
            typeof (error as SolidPodResponseError).statusCode === 'number' &&
            (error as SolidPodResponseError).statusCode === 404
          ) {
            setProfileDeleteModalMessage(
              intl.formatMessage({
                id: 'profileDeletionNotFoundMessage',
                defaultMessage: 'No profile was found.',
              }),
            )
            console.error(error)
          } else {
            setProfileDeleteModalMessage(
              intl.formatMessage({
                id: 'profileDeletionErrorMessage',
                defaultMessage: 'Profile could not be deleted.',
              }),
            )
            console.error(error)
          }
        })
        .finally(() => {
          setProfileDeleteInProgress(false)
        })
    }

    // if (signedInWithFirebase) {

    // }
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
          onClick={() => {
            setShowOffCanvas(false)
            setShowDeleteProfileModal(true)
          }}
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

      <Modal
        show={showDeleteProfileModal}
        centered
        onHide={() => {
          setProfileDeleteModalMessage(
            intl.formatMessage({
              id: 'profileDeletionConfirm',
              defaultMessage:
                'Are you sure you want to delete your dietary profile?',
            }),
          )
          setShowDeleteProfileModal(false)
        }}
      >
        <Modal.Header closeButton>
          <Modal.Title>
            <FormattedMessage
              id="profileDeletion"
              defaultMessage="Profile deletion"
            />
          </Modal.Title>
        </Modal.Header>

        <Modal.Body>{profileDeleteModalMessage}</Modal.Body>

        <Modal.Footer>
          <Button
            variant="danger"
            disabled={profileDeleteInProgress}
            className="delete-profile-button"
            onClick={() => void deleteProfile()}
          >
            {!profileDeleteInProgress && (
              <FormattedMessage id="delete" defaultMessage="Delete" />
            )}

            {profileDeleteInProgress && (
              <Spinner animation="border" role="status" size="sm">
                <span className="visually-hidden">Loading...</span>
              </Spinner>
            )}
          </Button>

          <Button
            variant="secondary"
            onClick={() => {
              setProfileDeleteModalMessage(
                intl.formatMessage({
                  id: 'profileDeletionConfirm',
                  defaultMessage:
                    'Are you sure you want to delete your dietary profile?',
                }),
              )
              setShowDeleteProfileModal(false)
            }}
          >
            <FormattedMessage id="closeModal" defaultMessage="Close" />
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal
        show={showProfileLoadErrorModal}
        centered
        onHide={() => {
          setShowProfileLoadErrorModal(false)
        }}
      >
        <Modal.Header closeButton>
          <Modal.Title>
            <FormattedMessage
              id="profileLoading"
              defaultMessage="Loading profile"
            />
          </Modal.Title>
        </Modal.Header>

        <Modal.Body>
          {intl.formatMessage({
            id: 'loadingProfileError',
            defaultMessage: 'Loading dietary profile failed',
          })}
        </Modal.Body>

        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={() => {
              setShowProfileLoadErrorModal(false)
            }}
          >
            <FormattedMessage id="closeModal" defaultMessage="Close" />
          </Button>
        </Modal.Footer>
      </Modal>

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
        <div className="position-absolute top-50 start-50 translate-middle empty-profile-text w-75 text-center">
          <FormattedMessage
            id="emptyProfileText"
            defaultMessage="Profile is empty, click the Edit Profile button to start."
          />
        </div>
      )}

      {profileWasDeleted && (
        <div className="position-absolute top-50 start-50 translate-middle empty-profile-text w-75 text-center">
          <FormattedMessage
            id="emptyProfileText"
            defaultMessage="Profile is empty, click the Edit Profile button to start."
          />
        </div>
      )}

      {dietaryProfileQuery.data !== null &&
        !dietaryProfileQuery.isPending &&
        !profileWasDeleted && (
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

                      <span>
                        {dietaryProfileQuery.data?.cuisines.join(', ')}
                      </span>
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
                        {dietaryProfileQuery.data?.dislikedIngredients.join(
                          ', ',
                        )}
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
