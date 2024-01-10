import {
  WikidataDietResponse,
  DietResponseBinding,
  WikidataCuisineResponse,
  CuisineResponseBinding,
} from './fetchResponseInterfaces'
import SelectMenuOption from './selectMenuOptionType'

export async function fetchDiets() {
  const dietsResponse = await fetch(
    'https://raw.githubusercontent.com/JiriResler/solid-choose-well-ontology/main/diets_data.json',
  )

  const dietsResponseObj = (await dietsResponse.json()) as WikidataDietResponse

  return dietsResponseObj.results.bindings
}

export function transformDietsResponse(
  dietsResponseArr: DietResponseBinding[],
) {
  const resultDietsArr: SelectMenuOption[] = []

  for (const responseDiet of dietsResponseArr) {
    const resultDiet: SelectMenuOption = {
      value: responseDiet.dietIRI.value,
      label: responseDiet.dietLabel.value,
    }

    resultDietsArr.push(resultDiet)
  }

  return resultDietsArr
}

export async function fetchCuisines() {
  const endpointUrl = 'https://query.wikidata.org/sparql'

  const sparqlQuery = `SELECT ?cuisineIRI ?cuisineLabel WHERE {
    ?cuisineIRI wdt:P31 wd:Q1968435;
      rdfs:label ?cuisineLabel.
    FILTER((LANG(?cuisineLabel)) = "en")
  }`

  const fullUrl = endpointUrl + '?query=' + encodeURIComponent(sparqlQuery)
  const headers = { Accept: 'application/sparql-results+json' }

  const cuisinesResponse = await fetch(fullUrl, { headers })

  const cuisinesResponseJSON =
    (await cuisinesResponse.json()) as WikidataCuisineResponse

  return cuisinesResponseJSON.results.bindings
}

export function transformCuisinesResponse(
  cuisinesResponseArr: CuisineResponseBinding[],
) {
  const resultCuisinesArr: SelectMenuOption[] = []

  for (const responseCuisine of cuisinesResponseArr) {
    // Make result labels have capital first letter
    let resultLabel = ''

    resultLabel += responseCuisine.cuisineLabel.value.charAt(0).toUpperCase()

    resultLabel += responseCuisine.cuisineLabel.value.slice(1)

    const resultCuisine: SelectMenuOption = {
      value: responseCuisine.cuisineIRI.value,
      label: resultLabel,
    }

    resultCuisinesArr.push(resultCuisine)
  }

  return resultCuisinesArr
}
