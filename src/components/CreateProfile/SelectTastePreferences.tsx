import { useEffect, useState } from 'react'
import { TastePreferences } from './profileDataTypes'
import Select, { MultiValue } from 'react-select'
import selectMenuOptionFilter from './selectMenuOptionFilter'
import SelectMenuOption from './selectMenuOptionType'
import { fetchCuisines, transformCuisinesResponse } from './loadFromWikidata'
import CustomSelectMenu from './CustomSelectMenu'
import Form from 'react-bootstrap/Form'
import Stack from 'react-bootstrap/Stack'

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
      <h3>What kind of desserts do you like?</h3>
      <Stack direction="horizontal" gap={2}>
        <Form.Check type="checkbox" />
        Sweet
      </Stack>
      <Stack direction="horizontal" gap={2}>
        <Form.Check type="checkbox" />
        Savory
      </Stack>
      <Stack direction="horizontal" gap={2}>
        <Form.Check type="checkbox" />I like every kind of dessert
      </Stack>

      <h3>How spicy do you like your food to be?</h3>
      <Stack direction="horizontal" gap={2}>
        <Form.Check type="checkbox" />
        Mild
      </Stack>
      <Stack direction="horizontal" gap={2}>
        <Form.Check type="checkbox" />
        Medium
      </Stack>
      <Stack direction="horizontal" gap={2}>
        <Form.Check type={'checkbox'} />
        Hot
      </Stack>
    </>
  )
}

export default SelectTastePreferences
