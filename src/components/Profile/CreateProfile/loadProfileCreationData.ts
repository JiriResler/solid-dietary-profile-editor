import {
  getSolidDataset,
  getThing,
  getUrl,
  getStringEnglish,
  getInteger,
  fromRdfJsDataset,
} from '@inrupt/solid-client'
import { Allergen } from './profileDataTypes'
import N3 from 'n3'

export async function loadAllergenList() {
  const allergenListFileUrl =
    'https://raw.githubusercontent.com/JiriResler/personalized-restaurant-menu-viewer-application-ontology/main/resource/List_of_most_common_allergens.ttl'

  const fetchedResponse = await fetch(allergenListFileUrl)

  const allergenListInTurtle = await fetchedResponse.text()

  const parser = new N3.Parser()

  try {
    const store = new N3.Store(parser.parse(allergenListInTurtle))

    // Create a solid dataset from parsed store
    const listAsRdfDataset = fromRdfJsDataset(store)

    const listOfAllergens = getThing(
      listAsRdfDataset,
      'https://raw.githubusercontent.com/JiriResler/personalized-restaurant-menu-viewer-application-ontology/main/resource/List_of_most_common_allergens',
    )

    if (listOfAllergens === null) {
      return
    }

    // Get sequence from a thing
    const allergenUrlArray = []
    let counter = 1

    const sequenceContainsItemPredicate =
      'http://www.w3.org/1999/02/22-rdf-syntax-ns#_'

    // eslint-disable-next-line no-constant-condition
    while (true) {
      const sequenceContainsItemPredicateFull =
        sequenceContainsItemPredicate + counter

      const allergenUrl = getUrl(
        listOfAllergens,
        sequenceContainsItemPredicateFull,
      )

      if (allergenUrl === null) {
        break
      }

      allergenUrlArray.push(allergenUrl)

      counter = counter + 1
    }

    console.log(allergenUrlArray)
  } catch (error) {
    console.log(error)
  }

  return [
    {
      IRI: 'iri1',
      label: 'Celery',
      menuLegendNumber: 0,
      iconUrl:
        'https://personal-restaurant-menu-viewer-app.solidcommunity.net/public/allergen_icons/celery.svg',
      sameAsIri: 'iri',
    },
    {
      IRI: 'iri2',
      label: 'Gluten',
      menuLegendNumber: 0,
      iconUrl:
        'https://personal-restaurant-menu-viewer-app.solidcommunity.net/public/allergen_icons/gluten.svg',
      sameAsIri: 'iri',
    },
  ]
}

// async function loadProfileCreationData(
//   setAllergenArray: React.Dispatch<React.SetStateAction<Allergen[]>>,
// ) {
//   await fetchAllergenArray(setAllergenArray)
// }

async function fetchAllergenArray(
  setAllergenArray: React.Dispatch<React.SetStateAction<Allergen[]>>,
) {
  const dataset = await getSolidDataset(
    'https://personal-restaurant-menu-viewer-app.solidcommunity.net/public/resource/List_of_allergens.ttl',
    {
      fetch: fetch as undefined,
    },
  )

  const thing = getThing(
    dataset,
    'https://personal-restaurant-menu-viewer-app.solidcommunity.net/public/resource/List_of_allergens',
  )

  if (thing === null) {
    return
  }

  // get sequence from thing
  let counter = 1

  let itemExists = true

  const containsPropertyUrl = 'http://www.w3.org/1999/02/22-rdf-syntax-ns#_'

  const allergenUrlArray = []

  while (itemExists) {
    const propertyUrl = containsPropertyUrl + counter

    const allergenUrl = getUrl(thing, propertyUrl)

    if (allergenUrl === null) {
      itemExists = false
      break
    }

    allergenUrlArray.push(allergenUrl)

    counter = counter + 1
  }

  // Load allergens
  const allergenArray: Allergen[] = []

  for (const allergenUrl of allergenUrlArray) {
    const allergenDataset = await getSolidDataset(allergenUrl + '.ttl', {
      fetch: fetch as undefined,
    })

    const allergenThing = getThing(allergenDataset, allergenUrl)

    if (allergenThing === null) {
      return
    }

    const allergenNumber = getInteger(
      allergenThing,
      'https://personal-restaurant-menu-viewer-app.solidcommunity.net/public/ontology#allergenNumber',
    )

    const allergenLabel = getStringEnglish(
      allergenThing,
      'http://www.w3.org/2000/01/rdf-schema#label',
    )

    const allergenIconUrl = getUrl(
      allergenThing,
      'https://personal-restaurant-menu-viewer-app.solidcommunity.net/public/ontology#hasIcon',
    )

    const allergenSameAsIri = getUrl(
      allergenThing,
      'http://www.w3.org/2002/07/owl#sameAs',
    )

    if (
      allergenNumber === null ||
      allergenLabel === null ||
      allergenIconUrl === null ||
      allergenSameAsIri === null
    ) {
      return
    }

    const allergen: Allergen = {
      IRI: allergenUrl,
      label: allergenLabel,
      menuLegendNumber: allergenNumber,
      iconUrl: allergenIconUrl,
      sameAsIri: allergenSameAsIri,
    }

    allergenArray.push(allergen)
  }

  setAllergenArray(allergenArray)
}
