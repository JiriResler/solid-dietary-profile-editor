import Form from 'react-bootstrap/Form'
import Select from 'react-select'
import { useEffect, useState } from 'react'
import Option from './optionType'
import CustomSelectMenu from './CustomSelectMenu'
import selectMenuOptionFilter from './selectMenuOptionFilter'
import { fetchDiets, transformDietsResponse } from './fetchData'
import { Diet } from './profileDataTypes'

const SelectComponents = {
  DropdownIndicator: () => null,
  IndicatorSeparator: () => null,
  ClearIndicator: () => null,
  Menu: CustomSelectMenu,
}

type Props = {
  selectedDiets: Set<Diet>
  setSelectedDiets: React.Dispatch<React.SetStateAction<Set<Diet>>>
}

const SelectDiets: React.FC<Props> = ({ selectedDiets, setSelectedDiets }) => {
  const [selectedDiets, setSelectedDiets] = useState<ReadonlyArray<Option>>([])

  const [dietOptions, setDietOptions] = useState<Option[]>([])

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

    setDietOptions(dietsList)
  }

  return (
    <>
      <ul>
        {selectedDiets.map((diet) => {
          return <li key={diet.value}>{diet.label}</li>
        })}
      </ul>

      <h1>2. Which diets are you on?</h1>
      <Form.Check type={'checkbox'} id={'id'} label="Vegan" />
      <Form.Check type={'checkbox'} id={'id'} label="Vegetarian" />

      <h3>Other diets</h3>
      <Select
        options={dietOptions}
        value={selectedDiets}
        filterOption={selectMenuOptionFilter}
        isMulti
        onChange={setSelectedDiets}
        components={SelectComponents}
        isDisabled={loadingDiets ? true : false}
        isLoading={loadingDiets ? true : false}
        placeholder={loadingDiets ? 'Loading data...' : 'Search for a diet'}
      />
    </>
  )
}

export default SelectDiets
