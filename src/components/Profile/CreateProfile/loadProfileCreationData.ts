import {
  getThing,
  getUrl,
  getStringWithLocale,
  getStringEnglish,
  getInteger,
  fromRdfJsDataset,
  Thing,
} from '@inrupt/solid-client'
import { Allergen, Diet } from './profileDataTypes'
import N3 from 'n3'
import { RDFS, OWL } from '@inrupt/vocab-common-rdf'
import ONTOLOGY from './commonRdfVocab'

// Loads a list of major allergens from the internet.
export async function loadAllergenList(locale: string): Promise<Allergen[]> {
  const allergenListFileUrl =
    'https://raw.githubusercontent.com/JiriResler/personalized-restaurant-menu-viewer-application-ontology/main/resource/List_of_major_allergens'

  const allergenListTurtle = await fetchTurtleFile(allergenListFileUrl + '.ttl')

  const listAsRdfDataset = parseTurtleFile(allergenListTurtle)

  const listOfAllergens = getThing(listAsRdfDataset, allergenListFileUrl)

  if (listOfAllergens === null) {
    throw new Error(
      'Could not find list of allergens Thing in parsed turtle file.',
    )
  }

  // Get sequence from a thing
  const allergenUrlArray = readUrlSequenceFromThing(listOfAllergens)

  const allergenList: Allergen[] = []

  // Load information about each allergen
  for (const allergenUrl of allergenUrlArray) {
    const allergen = await loadAllergenData(allergenUrl, locale)

    allergenList.push(allergen)
  }

  return allergenList
}

// Loads a list of most popular diets from the internet.
// The list can be found here:
// https://github.com/JiriResler/personalized-restaurant-menu-viewer-application-ontology/blob/main/resource/List_of_popular_diets.ttl
export async function loadDietList(locale: string): Promise<Diet[]> {
  const dietListFileUrl =
    'https://raw.githubusercontent.com/JiriResler/personalized-restaurant-menu-viewer-application-ontology/main/resource/List_of_popular_diets'

  const dietListInTurtle = await fetchTurtleFile(dietListFileUrl + '.ttl')

  const dietListAsRdfDataset = parseTurtleFile(dietListInTurtle)

  const dietListThing = getThing(dietListAsRdfDataset, dietListFileUrl)

  if (dietListThing === null) {
    throw new Error('Could not find list of diets Thing in parsed turtle file.')
  }

  // Array with URLs of diets
  const dietsUrlArray = readUrlSequenceFromThing(dietListThing)

  // Final diet array
  const listOfDiets: Diet[] = []

  // Load information about each diet
  for (const dietUrl of dietsUrlArray) {
    const diet = await loadDietData(dietUrl, locale)

    listOfDiets.push(diet)
  }

  return listOfDiets
}

// Loads a prefetched result of a SPARQL query which retrieves diets from DBPedia. It can be found here:
// https://github.com/JiriResler/personalized-restaurant-menu-viewer-application-ontology/blob/main/prefetched-dbpedia-sparql-query-results/diets-en.ttl
export async function loadDietsFromDBPedia() {
  const prefetchedSparqlQueryResultUrl =
    'https://raw.githubusercontent.com/JiriResler/personalized-restaurant-menu-viewer-application-ontology/main/prefetched-dbpedia-sparql-query-results/diets-en'

  const queryResult = await fetchTurtleFile(
    prefetchedSparqlQueryResultUrl + '.ttl',
  )

  const queryResultDataset = parseTurtleFile(queryResult)

  console.log(queryResultDataset)
}

// Retrieves a turtle file from the internet and returns a string containing its RDF data.
async function fetchTurtleFile(turtleFileUrl: string) {
  const fetchedResponse = await fetch(turtleFileUrl)

  if (!fetchedResponse.ok) {
    throw new Error(
      'Retreiving a turtle file from ' +
        turtleFileUrl +
        ' failed with HTTP status ' +
        fetchedResponse.status +
        '.',
    )
  }

  const allergenListInTurtle = await fetchedResponse.text()

  return allergenListInTurtle
}

// Parses a text containing RDF data in turtle and returns a SolidDataset.
function parseTurtleFile(turtleFile: string) {
  const parser = new N3.Parser()

  try {
    const store = new N3.Store(parser.parse(turtleFile))

    // Create a solid dataset from parsed store
    return fromRdfJsDataset(store)
  } catch (error) {
    console.error(error)

    console.error('Error: Failed to parse this file:' + turtleFile)

    throw new Error('Parsing of turtle file failed.')
  }
}

// Reads a sequence from a Thing and returns an array of URLs as string[].
function readUrlSequenceFromThing(thing: Thing) {
  const allergenUrlArray = []

  let counter = 1

  const sequenceContainsItemPredicate =
    'http://www.w3.org/1999/02/22-rdf-syntax-ns#_'

  // eslint-disable-next-line no-constant-condition
  while (true) {
    const sequencePredicateWithCounter = sequenceContainsItemPredicate + counter

    const allergenUrl = getUrl(thing, sequencePredicateWithCounter)

    if (allergenUrl === null) {
      break
    }

    allergenUrlArray.push(allergenUrl)

    counter = counter + 1
  }

  return allergenUrlArray
}

// Loads a turtle file describing an allergen from the internet and returns an Allergen.
async function loadAllergenData(allergenUrl: string, locale: string) {
  const allergenFileUrl = allergenUrl + '.ttl'

  const turtleFile = await fetchTurtleFile(allergenFileUrl)

  const allergenDataset = parseTurtleFile(turtleFile)

  const allergenThing = getThing(allergenDataset, allergenUrl)

  if (allergenThing === null) {
    throw new Error('Allergen definition was not found in file.')
  }

  return getAllergenFromThing(allergenThing, locale)
}

// Reads allergen data from a Thing and returns an Allergen.
function getAllergenFromThing(thing: Thing, locale: string): Allergen {
  const allergenNumber = getInteger(thing, ONTOLOGY.allergenNumber)

  if (allergenNumber === null) {
    throw new Error('Alergen number value is missing in RDF allergen file.')
  }

  const allergenLabel = getStringWithLocale(thing, RDFS.label, locale)

  if (allergenLabel === null) {
    throw new Error(
      'Allergen label value for ' +
        locale +
        ' is missing in RDF allergen file.',
    )
  }

  const allergenIconUrl = getUrl(thing, ONTOLOGY.hasIcon)

  if (allergenIconUrl === null) {
    throw new Error('Allergen icon URL value is missing in RDF allergen file.')
  }

  const allergenSameAsIri = getUrl(thing, OWL.sameAs)

  if (allergenSameAsIri === null) {
    throw new Error(
      'Allergen same as IRI value is missing in RDF allergen file.',
    )
  }

  return {
    iri: thing.url,
    currentLanguageLabel: allergenLabel,
    menuLegendNumber: allergenNumber,
    iconUrl: allergenIconUrl,
    sameAsIri: allergenSameAsIri,
  }
}

// Loads a turtle file describing a diet from the internet and returns a Diet.
async function loadDietData(dietUrl: string, locale: string) {
  const dietFileUrl = dietUrl + '.ttl'

  const turtleFile = await fetchTurtleFile(dietFileUrl)

  const dietDataset = parseTurtleFile(turtleFile)

  const dietThing = getThing(dietDataset, dietUrl)

  if (dietThing === null) {
    throw new Error('Diet definition was not found in file.')
  }

  return getDietFromThing(dietThing, locale)
}

// Reads information about a diet from a Thing and returns a Diet.
function getDietFromThing(thing: Thing, locale: string): Diet {
  let dietLabel = getStringWithLocale(thing, RDFS.label, locale)

  if (dietLabel === null) {
    console.error(
      'Label in ' +
        locale +
        ' locale is missing for resource ' +
        thing.url +
        '.',
    )

    dietLabel = getStringEnglish(thing, RDFS.label)

    if (dietLabel === null) {
      throw new Error('Label is missing for resource ' + thing.url + '.')
    }
  }

  const dietSameAsIri = getUrl(thing, OWL.sameAs)

  if (dietSameAsIri === null) {
    throw new Error(
      'The owl:sameAs value is missing in RDF file for resource ' +
        thing.url +
        '.',
    )
  }

  return {
    iri: thing.url,
    currentLanguageLabel: dietLabel,
    sameAsIri: dietSameAsIri,
  }
}
