import Form from 'react-bootstrap/Form'
import Select from 'react-select'
import { useEffect, useState } from 'react'
import SelectMenuOption from './selectMenuOptionType'
import CustomSelectMenu from './CustomSelectMenu'
import selectMenuOptionFilter from './selectMenuOptionFilter'
import { fetchDiets, transformDietsResponse } from './fetchData'

const SelectComponents = {
  DropdownIndicator: () => null,
  IndicatorSeparator: () => null,
  ClearIndicator: () => null,
  Menu: CustomSelectMenu,
}

type Props = {
  selectedDiets: ReadonlyArray<SelectMenuOption>
  setSelectedDiets: React.Dispatch<
    React.SetStateAction<ReadonlyArray<SelectMenuOption>>
  >
}

const SelectDiets: React.FC<Props> = ({ selectedDiets, setSelectedDiets }) => {
  const [menuOptions, setMenuOptions] = useState<
    ReadonlyArray<SelectMenuOption>
  >([])

  const [loadingDiets, setLoadingDiets] = useState(false)

  // Load list of diets upon initial render
  useEffect(() => {
    setLoadingDiets(true)

    void fetchAndSetDiets()

    setLoadingDiets(false)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  async function fetchAndSetDiets() {
    const dietsResponse = await fetchDiets()

    const dietsList = transformDietsResponse(dietsResponse)

    setMenuOptions(dietsList)
  }

  return (
    <>
      <h1>2. Which diets are you on?</h1>
      <Form.Check type={'checkbox'} id={'id'} label="Vegan" />
      <Form.Check type={'checkbox'} id={'id'} label="Vegetarian" />

      <h3>Other diets</h3>
      <Select
        options={menuOptions}
        value={selectedDiets}
        filterOption={selectMenuOptionFilter}
        isMulti
        onChange={(newArray) => {
          setSelectedDiets(newArray)
        }}
        components={SelectComponents}
        isDisabled={loadingDiets ? true : false}
        isLoading={loadingDiets ? true : false}
        placeholder={loadingDiets ? 'Loading data...' : 'Search for a diet'}
      />
    </>
  )
}

export default SelectDiets
