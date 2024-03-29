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
  }, [])

  async function fetchAndSetCuisines() {
    const cuisinesResponse = await fetchCuisines()

    const cuisinesList = transformCuisinesResponse(cuisinesResponse)

    setLoadingCuisines(false)

    setMenuOptions(cuisinesList)
  }

  function handleSelectOnChange(cuisinesArray: MultiValue<SelectMenuOption>) {
    const newTastePreferences: TastePreferences = {
      cuisines: cuisinesArray,
      desserts: [...selectedTastePreferences.desserts],
      spiciness: [...selectedTastePreferences.spiciness],
    }

    setSelectedTastePreferences(newTastePreferences)
  }

  function handleDessertCheckboxOnChange(dessertValueIRI: string) {
    const newTastePreferences: TastePreferences = {
      cuisines: [],
      desserts: [],
      spiciness: [...selectedTastePreferences.spiciness],
    }

    const cuisinesCopy: SelectMenuOption[] = []

    // Create a deep copy of the cuisines array
    selectedTastePreferences.cuisines.forEach((cuisine) =>
      cuisinesCopy.push(Object.assign({}, cuisine)),
    )

    newTastePreferences.cuisines = cuisinesCopy

    if (selectedTastePreferences.desserts.includes(dessertValueIRI)) {
      newTastePreferences.desserts = selectedTastePreferences.desserts.filter(
        (value) => {
          return value !== dessertValueIRI
        },
      )
    } else {
      newTastePreferences.desserts = [...selectedTastePreferences.desserts]
      newTastePreferences.desserts.push(dessertValueIRI)
    }

    setSelectedTastePreferences(newTastePreferences)
  }

  function handleSpicinessCheckboxOnChange(spicinessValueIRI: string) {
    const newTastePreferences: TastePreferences = {
      cuisines: [],
      desserts: [...selectedTastePreferences.desserts],
      spiciness: [],
    }

    const cuisinesCopy: SelectMenuOption[] = []

    // Create a deep copy of the cuisines array
    selectedTastePreferences.cuisines.forEach((cuisine) =>
      cuisinesCopy.push(Object.assign({}, cuisine)),
    )

    newTastePreferences.cuisines = cuisinesCopy

    if (selectedTastePreferences.spiciness.includes(spicinessValueIRI)) {
      newTastePreferences.spiciness = selectedTastePreferences.spiciness.filter(
        (value) => {
          return value !== spicinessValueIRI
        },
      )
    } else {
      newTastePreferences.spiciness = [...selectedTastePreferences.spiciness]
      newTastePreferences.spiciness.push(spicinessValueIRI)
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
        <Form.Check
          type="checkbox"
          checked={selectedTastePreferences.desserts.includes(
            'http://dbpedia.org/resource/Sweetness',
          )}
          onChange={() => {
            handleDessertCheckboxOnChange(
              'http://dbpedia.org/resource/Sweetness',
            )
          }}
        />
        Sweet
      </Stack>
      <Stack direction="horizontal" gap={2}>
        <Form.Check
          type="checkbox"
          checked={selectedTastePreferences.desserts.includes(
            'http://www.wikidata.org/entity/Q3324978',
          )}
          onChange={() => {
            handleDessertCheckboxOnChange(
              'http://www.wikidata.org/entity/Q3324978',
            )
          }}
        />
        Savory
      </Stack>

      <h3>How spicy do you like your food to be?</h3>
      <Stack direction="horizontal" gap={2}>
        <Form.Check
          type="checkbox"
          checked={selectedTastePreferences.spiciness.includes(
            'http://www.wikidata.org/entity/Q96278776',
          )}
          onChange={() => {
            handleSpicinessCheckboxOnChange(
              'http://www.wikidata.org/entity/Q96278776',
            )
          }}
        />
        Mild
      </Stack>
      <Stack direction="horizontal" gap={2}>
        <Form.Check
          type="checkbox"
          checked={selectedTastePreferences.spiciness.includes(
            'http://www.wikidata.org/entity/Q17525443',
          )}
          onChange={() => {
            handleSpicinessCheckboxOnChange(
              'http://www.wikidata.org/entity/Q17525443',
            )
          }}
        />
        Medium
      </Stack>
      <Stack direction="horizontal" gap={2}>
        <Form.Check
          type={'checkbox'}
          checked={selectedTastePreferences.spiciness.includes(
            'http://www.wikidata.org/entity/Q28128222',
          )}
          onChange={() => {
            handleSpicinessCheckboxOnChange(
              'http://www.wikidata.org/entity/Q28128222',
            )
          }}
        />
        Hot
      </Stack>
    </>
  )
}

export default SelectTastePreferences
