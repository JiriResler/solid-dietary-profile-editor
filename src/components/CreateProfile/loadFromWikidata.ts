import { DietResponse, DietResponseBinding } from './fetchResponseInterfaces'
import SelectMenuOption from './selectMenuOptionType'

export async function fetchDiets() {
  const dietsResponse = await fetch(
    'https://raw.githubusercontent.com/JiriResler/solid-choose-well-ontology/main/diets_data.json',
  )

  const dietsResponseObj = (await dietsResponse.json()) as DietResponse

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

  const cuisinesResponseJson = await cuisinesResponse.json()

  return cuisinesResponseJson.results.bindings
}

export function transformCuisinesResponse(cuisinesResponseArr) {

}
