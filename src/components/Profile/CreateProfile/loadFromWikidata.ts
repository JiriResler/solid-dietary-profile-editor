import {
  WikidataCuisineResponse,
  CuisineResponseBinding,
} from './DBPediaResponseType'
import SelectMenuOption from './selectMenuOptionType'

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
