import { useEffect, useState } from 'react'
import Select from 'react-select'
import CustomSelectMenu from './CustomSelectMenu'
import Option from './optionType'
import selectMenuOptionFilter from './selectMenuOptionFilter'
import { fetchIngredients, transformIngredientsResponse } from './fetchData'

const SelectComponents = {
  DropdownIndicator: () => null,
  IndicatorSeparator: () => null,
  ClearIndicator: () => null,
  Menu: CustomSelectMenu,
}

const SelectFoodIngredients: React.FC = () => {
  const [selectedFavoredIngredients, setSelectedFavoredIngredients] = useState<
    ReadonlyArray<Option>
  >([])

  const [selectedDislikedIngredients, setSelectedDislikedIngredients] =
    useState<ReadonlyArray<Option>>([])

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

  return (
    <>
      <h1>2. What are your food ingredient preferences?</h1>
      <h3>Select what you like</h3>
      <Select
        options={ingredientOptions}
        value={selectedFavoredIngredients}
        filterOption={selectMenuOptionFilter}
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
        filterOption={selectMenuOptionFilter}
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