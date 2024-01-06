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
  currentStep: number
  selectedDiets: ReadonlyArray<SelectMenuOption>
  setSelectedDiets: React.Dispatch<
    React.SetStateAction<ReadonlyArray<SelectMenuOption>>
  >
}

const SelectDiets: React.FC<Props> = ({
  currentStep,
  selectedDiets,
  setSelectedDiets,
}) => {
  const [menuOptions, setMenuOptions] = useState<
    ReadonlyArray<SelectMenuOption>
  >([])

  const veganIRI = 'http://dbpedia.org/resource/Veganism'

  const [veganChecked, setVeganChecked] = useState(
    selectedDietsInclude(veganIRI),
  )

  const vegetarianIRI = 'http://dbpedia.org/resource/Vegetarianism'

  const [vegetarianChecked, setVegetarianChecked] = useState(
    selectedDietsInclude(vegetarianIRI),
  )

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

  function selectedDietsInclude(dietIRI: string) {
    let result = false

    for (const diet of selectedDiets) {
      if (diet.value === dietIRI) {
        result = true
      }
    }

    return result
  }

  function handleCheckboxOnChange(dietIRI: string, dietLabel: string) {
    const newDietsArray: SelectMenuOption[] = []

    if (selectedDietsInclude(dietIRI)) {
      for (const existingDiet of selectedDiets) {
        if (existingDiet.value === dietIRI) {
          continue
        }

        newDietsArray.push(existingDiet)
      }
    } else {
      for (const existingDiet of selectedDiets) {
        newDietsArray.push(existingDiet)
      }

      const newDiet: SelectMenuOption = { label: dietLabel, value: dietIRI }

      newDietsArray.push(newDiet)
    }

    setSelectedDiets(newDietsArray)

    if (dietLabel === 'Vegan') {
      setVeganChecked(!veganChecked)
    } else {
      setVegetarianChecked(!vegetarianChecked)
    }
  }

  // Filters out the vegan and vegetarian diets from selectedDiets
  function selectedDietsWithoutVeg() {
    const filteredDiets: SelectMenuOption[] = []

    for (const diet of selectedDiets) {
      if (diet.value === veganIRI || diet.value === vegetarianIRI) {
        continue
      }

      filteredDiets.push(diet)
    }

    return filteredDiets
  }

  return (
    <>
      <h1>{currentStep}. Which diets are you on?</h1>
      <Form.Check
        checked={veganChecked}
        onChange={() => {
          handleCheckboxOnChange(
            'http://dbpedia.org/resource/Veganism',
            'Vegan',
          )
        }}
        type="checkbox"
        label="Vegan"
      />
      <Form.Check
        checked={vegetarianChecked}
        onChange={() => {
          handleCheckboxOnChange(
            'http://dbpedia.org/resource/Vegetarianism',
            'Vegetarian',
          )
        }}
        type="checkbox"
        label="Vegetarian"
      />

      <h3>Other diets</h3>
      <Select
        options={menuOptions}
        value={selectedDietsWithoutVeg()}
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
