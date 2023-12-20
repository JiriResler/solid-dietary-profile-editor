import {
  DietResponse,
  DietResponseBinding,
  IngredientResponse,
} from './fetchResponseInterfaces'
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

export async function fetchIngredients() {
  const ingredientsUrl =
    'https://raw.githubusercontent.com/JiriResler/solid-choose-well-ontology/main/food_ingredients_data.json'

  const ingredientsResponse = await fetch(ingredientsUrl)

  const ingredientsResponseArr =
    (await ingredientsResponse.json()) as Array<IngredientResponse>

  return ingredientsResponseArr
}

export function transformIngredientsResponse(
  ingredientsResponseArr: IngredientResponse[],
) {
  const resultIngredientsArr: SelectMenuOption[] = []

  for (const responseIngredient of ingredientsResponseArr) {
    const resultIngredient: SelectMenuOption = {
      value: responseIngredient.food,
      label: responseIngredient.foodLabel,
    }

    resultIngredientsArr.push(resultIngredient)
  }

  return resultIngredientsArr
}
