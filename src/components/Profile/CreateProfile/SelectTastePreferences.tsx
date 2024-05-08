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
import Slider from '@mui/material/Slider'

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

const marks = [
  {
    value: 0,
    label: 'Mild',
  },
  {
    value: 50,
    label: 'Medium',
  },
  {
    value: 100,
    label: 'Hot',
  },
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

  return (
    <>
      <h3>Specify your taste preferences</h3>

      <h4>Which world cuisines do you like?</h4>
      <div className="width-fit-content mx-auto text-start">
        {worldCuisines.map((cuisine) => {
          return (
            <Stack direction="horizontal" gap={3}>
              <Form.Check type="checkbox" label={cuisine} className="w-100" />
              <img
                src="images/info_icon.svg"
                alt="information icon"
                className="onHoverPointer"
              />
            </Stack>
          )
        })}
      </div>

      <Select
        className="mt-3 w-75 mx-auto"
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

      <h4 className="mt-3">Which taste of desserts do you prefer?</h4>
      <div className="width-fit-content text-start mx-auto">
        <Form.Check
          type="checkbox"
          label="Sweet"
          checked={selectedTastePreferences.desserts.includes(
            'http://dbpedia.org/resource/Sweetness',
          )}
          onChange={() => {
            handleDessertCheckboxOnChange(
              'http://dbpedia.org/resource/Sweetness',
            )
          }}
        />

        <Form.Check
          type="checkbox"
          label="Savory"
          checked={selectedTastePreferences.desserts.includes(
            'http://www.wikidata.org/entity/Q3324978',
          )}
          onChange={() => {
            handleDessertCheckboxOnChange(
              'http://www.wikidata.org/entity/Q3324978',
            )
          }}
        />

        <Form.Check type="checkbox" label="Doesn't matter" />
      </div>

      <h4 className="mt-3">Do you like spicy food?</h4>
      <Form.Switch />

      <div className="w-75 mx-auto">
        <Slider
          aria-label="Restricted values"
          defaultValue={0}
          step={null}
          valueLabelDisplay="auto"
          marks={marks}
        />
      </div>
    </>
  )
}

export default SelectTastePreferences
