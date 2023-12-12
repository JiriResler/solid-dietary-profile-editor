import Form from 'react-bootstrap/Form'
import AsyncSelect from 'react-select/async'
import { useState } from 'react'

type DietOption = { label: string; value: number }

const SelectComponents = {
  DropdownIndicator: () => null,
  IndicatorSeparator: () => null,
  ClearIndicator: () => null,
}

const SelectDiets: React.FC = () => {
  const [selectedDiets, setSelectedDiets] = useState<ReadonlyArray<DietOption>>(
    [],
  )

  function handleSelectChange(dietArray: ReadonlyArray<DietOption>) {
    setSelectedDiets(dietArray)
  }

  const filterDiets = (inputValue: string) => {
    return [
      { value: 1, label: 'aaa' },
      { value: 2, label: 'abb' },
      { value: 3, label: 'abc' },
      { value: 4, label: 'aba' },
    ].filter((i) => i.label.toLowerCase().includes(inputValue.toLowerCase()))
  }

  async function fetchDiets(inputValue: string) {
    const response = await fetch(
      'https://raw.githubusercontent.com/JiriResler/solid-choose-well-ontology/main/diets_data.json',
    )
    const movies = await response.json()
    console.log(movies)

    return filterDiets(inputValue)
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
      <AsyncSelect
        loadOptions={fetchDiets}
        defaultOptions
        isMulti
        // value={selectedDiets}
        onChange={(value) => {
          handleSelectChange(value)
        }}
        openMenuOnClick={false}
        components={SelectComponents}
        placeholder="Search for a diet"
      />
    </>
  )
}

export default SelectDiets
