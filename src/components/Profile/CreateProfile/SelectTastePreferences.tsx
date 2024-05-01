import { useEffect, useState } from 'react'
import { TastePreferences } from './profileDataTypes'
import Select, { MultiValue } from 'react-select'
import selectMenuOptionFilter from './selectMenuOptionFilter'
import SelectMenuOption from './selectMenuOptionType'
import { fetchCuisines, transformCuisinesResponse } from './loadFromWikidata'
import CustomSelectMenu from './CustomSelectMenu'
import Form from 'react-bootstrap/Form'
import Stack from 'react-bootstrap/Stack'
import './SelectTastePreferences.css'

const worldCuisines = [
  'French',
  'Indian',
  'Japanese',
  'Mexican',
  'Italian',
  'Thai',
  'Chinese',
  'Greek',
  'Spanish',
  'Turkish',
  'American',
  'Vietnamese',
]

type Props = {
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
      <h4>Which world cuisines do you like?</h4>
      {worldCuisines.map((cuisine) => {
        return (
          <Stack
            direction="horizontal"
            gap={3}
            className="cuisine-horizontal-stack mx-auto mt-2"
          >
            <Form.Check type="checkbox" />
            <span className="w-50 text-start">{cuisine}</span>
            <img
              src="images/info_icon.svg"
              alt="information icon"
              className="onHoverPointer"
            />
          </Stack>
        )
      })}

      <Select
        className="mt-3"
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
          loadingCuisines ? 'Loading data...' : 'Search for more cuisines...'
        }
      />

      <h4 className="mt-3">Which taste of food do you like?</h4>
      <Stack
        direction="horizontal"
        gap={2}
        className="cuisine-horizontal-stack mx-auto"
      >
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

      <Stack
        direction="horizontal"
        gap={2}
        className="cuisine-horizontal-stack mx-auto mt-2"
      >
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

      <h4 className="mt-3">If you like spicy food, how spicy should it be?</h4>
      <Stack
        direction="horizontal"
        gap={2}
        className="cuisine-horizontal-stack mx-auto"
      >
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
        Mildly
      </Stack>
      <Stack
        direction="horizontal"
        gap={2}
        className="cuisine-horizontal-stack mx-auto mt-2"
      >
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
      <Stack
        direction="horizontal"
        gap={2}
        className="cuisine-horizontal-stack mx-auto mt-2"
      >
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
        Very
      </Stack>
    </>
  )
}

export default SelectTastePreferences
