import { db } from '../../firebase'
import { doc, setDoc } from 'firebase/firestore'
import { SolidPodResponseError } from '../Profile/SolidPodResponseError'
import getPodUrl from '../getPodUrl'
import { fetch } from '@inrupt/solid-client-authn-browser'
import {
  SolidDataset,
  addUrl,
  createSolidDataset,
  createThing,
  getSolidDataset,
  getThingAll,
  removeThing,
  saveSolidDatasetAt,
  setThing,
} from '@inrupt/solid-client'
import { Session } from "@inrupt/solid-client-authn-browser"
import { Auth } from '@firebase/auth'
import { Allergen, Diet, TastePreferences } from './profileDataTypes'


// todo change to general user profile used in application
type FirestoreUserProfile = {
    allergicTo: string[]
    onDiets: string[]
    likesCuisines: string[]
    likesDessertTaste: string[]
    likesSpiciness: string[]
  }

export async function saveProfileSolid(currentSession: Session, selectedAllergens: Set<Allergen>, selectedDiets: Set<Diet>, selectedTastePreferences: TastePreferences) {
    const podUrl = await getPodUrl(currentSession)

    const profileLocation = 'eatingPreferencesProfile/profile'

    const profileUrl = podUrl + profileLocation

    let eatingPreferencesProfile: SolidDataset

    try {
      // Attempt to retrieve the profile in case it already exists.
      eatingPreferencesProfile = await getSolidDataset(profileUrl, {
        fetch: fetch as undefined,
      })

      // Clear the profile
      const items = getThingAll(eatingPreferencesProfile)
      items.forEach((item) => {
        eatingPreferencesProfile = removeThing(eatingPreferencesProfile, item)
      })
    } catch (error) {
      if (
        typeof (error as SolidPodResponseError).statusCode === 'number' &&
        (error as SolidPodResponseError).statusCode === 404
      ) {
        // if not found, create a new SolidDataset
        eatingPreferencesProfile = createSolidDataset()
      } else {
        console.error((error as Error).message)
        alert(
          'There was an error while saving the profile with the code ' +
            (error as SolidPodResponseError).statusCode,
        )

        return
      }
    }

    let user = createThing({ name: 'me' })

    for (const allergen of selectedAllergens) {
      user = addUrl(
        user,
        'https://github.com/JiriResler/solid-choose-well-ontology/blob/main/choosewell#allergicTo',
        allergen.iri,
      )
    }

    for (const diet of selectedDiets) {
      user = addUrl(
        user,
        'https://github.com/JiriResler/solid-choose-well-ontology/blob/main/choosewell#onDiet',
        diet.iri,
      )
    }

    for (const cuisine of selectedTastePreferences.cuisines) {
      user = addUrl(
        user,
        'https://github.com/JiriResler/solid-choose-well-ontology/blob/main/choosewell#likesCuisine',
        cuisine.value,
      )
    }

    for (const dessertValueIRI of selectedTastePreferences.desserts) {
      user = addUrl(
        user,
        'https://github.com/JiriResler/solid-choose-well-ontology/blob/main/choosewell#likesDessert',
        dessertValueIRI,
      )
    }

    for (const spicinessValueIRI of selectedTastePreferences.spiciness) {
      user = addUrl(
        user,
        'https://github.com/JiriResler/solid-choose-well-ontology/blob/main/choosewell#likesSpicyFood',
        spicinessValueIRI,
      )
    }

    eatingPreferencesProfile = setThing(eatingPreferencesProfile, user)

    await saveSolidDatasetAt(profileUrl, eatingPreferencesProfile, {
      fetch: fetch as undefined,
    })

    alert('Profile saved')

    // todo loadProfile()
  }

export async function saveProfileFirebase(auth: Auth, selectedAllergens: Set<Allergen>, selectedDiets: Set<Diet>, selectedTastePreferences: TastePreferences) {
const loggedInUser = auth.currentUser

//  Get rid of a TypeScript error
if (loggedInUser === null) {
    return
}

// todo: make this code easier to read by splitting it to more lines
const profileData: FirestoreUserProfile = {
    allergicTo: Array.from(selectedAllergens.values()).map(
    (allergen) => allergen.iri,
    ),
    onDiets: Array.from(selectedDiets.values()).map((diet) => diet.iri),
    likesCuisines: selectedTastePreferences.cuisines.map(
    (cuisine) => cuisine.value,
    ),
    likesDessertTaste: selectedTastePreferences.desserts,
    likesSpiciness: selectedTastePreferences.spiciness,
}

await setDoc(doc(db, 'users', loggedInUser.uid), profileData)

alert('Profile saved')

// todo loadProfile()
}
