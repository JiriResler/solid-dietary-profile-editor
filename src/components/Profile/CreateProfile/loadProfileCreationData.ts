import {
  getThing,
  getUrl,
  getStringEnglish,
  getInteger,
  fromRdfJsDataset,
  SolidDataset,
} from '@inrupt/solid-client'
import { Allergen } from './profileDataTypes'
import N3 from 'n3'

// Loads a list of most common allergens from the internet and returns an array of Allergens.
export async function loadAllergenList() {
  const allergenList: Allergen[] = []

  const allergenListFileUrl =
    'https://raw.githubusercontent.com/JiriResler/personalized-restaurant-menu-viewer-application-ontology/main/resource/List_of_most_common_allergens.ttl'

  const listAsRdfDataset = await fetchRdfDataset(allergenListFileUrl)

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

  // Load information about each allergen
  for (const allergenUrl of allergenUrlArray) {
    const allergenFileUrl = allergenUrl + '.ttl'

    const allergenDataset = await fetchRdfDataset(allergenFileUrl)

    const allergenThing = getThing(allergenDataset, allergenUrl)

    if (allergenThing === null) {
      return
    }

    const allergenNumber = getInteger(
      allergenThing,
      'https://raw.githubusercontent.com/JiriResler/personalized-restaurant-menu-viewer-application-ontology/main/ontology#allergenNumber',
    )

    const allergenLabel = getStringEnglish(
      allergenThing,
      'http://www.w3.org/2000/01/rdf-schema#label',
    )

    const allergenIconUrl = getUrl(
      allergenThing,
      'https://raw.githubusercontent.com/JiriResler/personalized-restaurant-menu-viewer-application-ontology/main/ontology#hasIcon',
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
      console.log('Some value is missing in parsed RDF allergen file.')
      return
    }

    const allergen: Allergen = {
      IRI: allergenUrl,
      label: allergenLabel,
      menuLegendNumber: allergenNumber,
      iconUrl: allergenIconUrl,
      sameAsIri: allergenSameAsIri,
    }

    allergenList.push(allergen)
  }

  return allergenList
}

// Retrieves a turtle file from the internet and uses a parser to create a Dataset
async function fetchRdfDataset(url: string): Promise<SolidDataset> {
  const fetchedResponse = await fetch(url)

  const allergenListInTurtle = await fetchedResponse.text()

  const parser = new N3.Parser()

  try {
    const store = new N3.Store(parser.parse(allergenListInTurtle))

    // Create a solid dataset from parsed store
    return fromRdfJsDataset(store)
  } catch (error) {
    throw new Error('Parsing of turtle file failed.')
  }
}
