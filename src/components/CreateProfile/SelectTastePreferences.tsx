import { useEffect, useState } from 'react'
import { TastePreferences } from './profileDataTypes'
import Select, { MultiValue } from 'react-select'
import selectMenuOptionFilter from './selectMenuOptionFilter'
import SelectMenuOption from './selectMenuOptionType'
import { fetchCuisines, transformCuisinesResponse } from './loadFromWikidata'
import CustomSelectMenu from './CustomSelectMenu'

type Props = {
  currentStep: number
  selectedTastePreferences: TastePreferences
  setSelectedTastePreferences: React.Dispatch<
    React.SetStateAction<TastePreferences>
  >
}

const SelectComponents = {
  DropdownIndicator: () => null,
  IndicatorSeparator: () => null,
  ClearIndicator: () => null,
  Menu: CustomSelectMenu,
}

const SelectTastePreferences: React.FC<Props> = ({
  currentStep,
  selectedTastePreferences,
  setSelectedTastePreferences,
}) => {
  const [menuOptions, setMenuOptions] = useState<
    ReadonlyArray<SelectMenuOption>
  >([])

  const [loadingCuisines, setLoadingCuisines] = useState(false)

  useEffect(() => {
    setLoadingCuisines(true)

    void fetchAndSetCuisines()

    setLoadingCuisines(false)
  }, [])

  async function fetchAndSetCuisines() {
    const cuisinesResponse = await fetchCuisines()

    const cuisinesList = transformCuisinesResponse(cuisinesResponse)

    setMenuOptions(cuisinesList)
  }

  function handleSelectOnChange(cuisinesArray: MultiValue<SelectMenuOption>) {
    const newTastePreferences = {
      ...selectedTastePreferences,
      cuisines: cuisinesArray,
    }

    setSelectedTastePreferences(newTastePreferences)
  }

  return (
    <>
      <h1>{currentStep}. Specify your taste preferences</h1>
      <h3>Which world cuisines do you like?</h3>
      <Select
        options={menuOptions}
        value={selectedTastePreferences.cuisines}
        filterOption={selectMenuOptionFilter}
        isMulti
        onChange={(newArray) => {
          handleSelectOnChange(newArray)
        }}
        components={SelectComponents}
        isDisabled={loadingCuisines ? true : false}
        isLoading={loadingCuisines ? true : false}
        placeholder={
          loadingCuisines ? 'Loading data...' : 'Search for cuisines...'
        }
      />
      <h3>desserts - sweet or non sweet</h3>
      <h3>spicyness - 3 levels</h3>
    </>
  )
}

export default SelectTastePreferences
