import { useEffect, useState } from 'react'
import Select from 'react-select'
import CustomSelectMenu from './CustomSelectMenu'
import Option from './OptionType'

interface IngredientResponseObj {
  food: string
  foodLabel: string
}

const SelectComponents = {
  DropdownIndicator: () => null,
  IndicatorSeparator: () => null,
  ClearIndicator: () => null,
  Menu: CustomSelectMenu,
}

const SelectFoodIngredients: React.FC = () => {
  // eslint-disable-next-line prettier/prettier
  const [selectedFavoredIngredients, setSelectedFavoredIngredients] = useState<
    ReadonlyArray<Option>
  >([])

  const [selectedDislikedIngredients, setSelectedDislikedIngredients] =
    useState<ReadonlyArray<Option>>([])

  // eslint-disable-next-line prettier/prettier
  const [ingredientOptions, setIngredientOptions] = useState<Option[]>([])

  const [loadingIngredients, setLoadingIngredients] = useState(false)

  // Load list of food ingredients upon initial render
  useEffect(() => {
    setLoadingIngredients(true)

    void fetchAndSetIngredients()

    setLoadingIngredients(false)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  async function fetchAndSetIngredients() {
    const ingredientsResponse = await fetchIngredients()

    const ingredientsList = transformIngredientsResponse(ingredientsResponse)

    setIngredientOptions(ingredientsList)
  }

  async function fetchIngredients() {
    const ingredientsResponse = await fetch(
      'https://raw.githubusercontent.com/JiriResler/solid-choose-well-ontology/main/food_ingredients_data.json',
    )

    const ingredientsResponseArr =
      (await ingredientsResponse.json()) as Array<IngredientResponseObj>

    return ingredientsResponseArr
  }

  function transformIngredientsResponse(
    ingredientsResponseArr: IngredientResponseObj[],
  ) {
    const resultIngredientsArr: Option[] = []

    for (const responseIngredient of ingredientsResponseArr) {
      const resultIngredient: Option = {
        value: responseIngredient.food,
        label: responseIngredient.foodLabel,
      }

      resultIngredientsArr.push(resultIngredient)
    }

    return resultIngredientsArr
  }

  const selectMenuIngredientFilter = (option: Option, searchText: string) => {
    if (option.label.toLowerCase().startsWith(searchText.toLowerCase())) {
      return true
    }

    return false
  }

  return (
    <>
      <h1>2. What are your food ingredient preferences?</h1>
      <h3>Select what you like</h3>
      <Select
        options={ingredientOptions}
        value={selectedFavoredIngredients}
        filterOption={selectMenuIngredientFilter}
        isMulti
        onChange={setSelectedFavoredIngredients}
        components={SelectComponents}
        isDisabled={loadingIngredients ? true : false}
        isLoading={loadingIngredients ? true : false}
        placeholder={
          loadingIngredients ? 'Loading data...' : 'Search for an ingredient'
        }
      />

      <h3>Select what you don't like</h3>
      <Select
        options={ingredientOptions}
        value={selectedDislikedIngredients}
        filterOption={selectMenuIngredientFilter}
        isMulti
        onChange={setSelectedDislikedIngredients}
        components={SelectComponents}
        isDisabled={loadingIngredients ? true : false}
        isLoading={loadingIngredients ? true : false}
        placeholder={
          loadingIngredients ? 'Loading data...' : 'Search for an ingredient'
        }
      />
    </>
  )
}

export default SelectFoodIngredients
