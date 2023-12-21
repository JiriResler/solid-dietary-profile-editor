import { useEffect, useState } from 'react'
import Select from 'react-select'
import CustomSelectMenu from './CustomSelectMenu'
import SelectMenuOption from './selectMenuOptionType'
import selectMenuOptionFilter from './selectMenuOptionFilter'
import { fetchIngredients, transformIngredientsResponse } from './fetchData'

const SelectComponents = {
  DropdownIndicator: () => null,
  IndicatorSeparator: () => null,
  ClearIndicator: () => null,
  Menu: CustomSelectMenu,
}

type Props = {
  selectedFavoredIngredients: ReadonlyArray<SelectMenuOption>
  setSelectedFavoredIngredients: React.Dispatch<
    React.SetStateAction<ReadonlyArray<SelectMenuOption>>
  >
  selectedDislikedIngredients: ReadonlyArray<SelectMenuOption>
  setSelectedDislikedIngredients: React.Dispatch<
    React.SetStateAction<ReadonlyArray<SelectMenuOption>>
  >
}

const SelectIngredients: React.FC<Props> = ({
  selectedFavoredIngredients,
  setSelectedFavoredIngredients,
  selectedDislikedIngredients,
  setSelectedDislikedIngredients,
}) => {
  const [ingredientOptions, setIngredientOptions] = useState<
    SelectMenuOption[]
  >([])

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
        onChange={(newArray) => {
          setSelectedFavoredIngredients(newArray)
        }}
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
        onChange={(newArray) => {
          setSelectedDislikedIngredients(newArray)
        }}
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

export default SelectIngredients
