import Form from 'react-bootstrap/Form'
import Select from 'react-select'
import { useEffect, useState } from 'react'

type DietOption = { label: string; value: string }

interface DBPediaResponse {
  results: {
    bindings: ResponseBinding[]
  }
}

interface ResponseBinding {
  dietIRI: {
    value: string
  }
  dietLabel: {
    value: string
  }
}

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

  const [loadingDiets, setLoadingDiets] = useState(false)

  // Load list of diets upon initial render
  useEffect(() => {
    setLoadingDiets(true)

    void getDiets()

    setLoadingDiets(false)
  }, [])

  async function getDiets() {
    const dietsResponse = await fetchDiets()

    const dietsList = transformDietsResponse(dietsResponse)

    setDietOptions(dietsList)
  }

  async function fetchDiets() {
    const dietsResponse = await fetch(
      'https://raw.githubusercontent.com/JiriResler/solid-choose-well-ontology/main/diets_data.json',
    )

    const dietsResponseObj = (await dietsResponse.json()) as DBPediaResponse

    return dietsResponseObj.results.bindings
  }

  function transformDietsResponse(dietsResponseArr: ResponseBinding[]) {
    const resultDietsArr: DietOption[] = []

    for (const responseDiet of dietsResponseArr) {
      const resultDiet: DietOption = {
        value: responseDiet.dietIRI.value,
        label: responseDiet.dietLabel.value,
      }

      resultDietsArr.push(resultDiet)
    }

    return resultDietsArr
  }

  function handleSelectChange(dietArray: ReadonlyArray<DietOption>) {
    setSelectedDiets(dietArray)
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
        isMulti
        onChange={(value) => {
          handleSelectChange(value)
        }}
        openMenuOnClick={false}
        components={SelectComponents}
        isDisabled={loadingDiets ? true : false}
        isLoading={loadingDiets ? true : false}
        placeholder={loadingDiets ? 'Loading data...' : 'Search for a diet'}
      />
    </>
  )
}

export default SelectDiets
