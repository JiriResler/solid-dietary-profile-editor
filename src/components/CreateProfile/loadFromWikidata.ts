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

export async function fetchCuisines() {}

export function transformCuisinesResponse(cuisinesResponseArr) {}
