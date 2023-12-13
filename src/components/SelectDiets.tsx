import Form from 'react-bootstrap/Form'
import Select from 'react-select'
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

  const [dietOptions, setDietOptions] = useState<DietOption[]>([])

  function handleSelectChange(dietArray: ReadonlyArray<DietOption>) {
    setSelectedDiets(dietArray)
  }

  async function fetchDiets() {
    const response = await fetch(
      'https://raw.githubusercontent.com/JiriResler/solid-choose-well-ontology/main/diets_data.json',
    )
    const movies = await response.json()
    console.log(movies)

    setDietOptions([
      { value: 1, label: 'aaa' },
      { value: 2, label: 'abb' },
      { value: 3, label: 'abc' },
      { value: 4, label: 'aba' },
    ])
  }

  return (
    <>
      <button
        onClick={() => {
          void fetchDiets()
        }}
      >
        Fetch diets
      </button>
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
