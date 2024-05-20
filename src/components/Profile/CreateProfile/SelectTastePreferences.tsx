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
import { FormattedMessage } from 'react-intl'

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

  const [userLikesSpicyFood, setUserLikesSpicyFood] = useState(false)

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
      <h3>
        <FormattedMessage
          id="specifyYourTastePreferences"
          defaultMessage="Specify your taste preferences"
        />
      </h3>

      <h4>
        <FormattedMessage
          id="whichWorldCuisinesDoYouLike"
          defaultMessage="Which world cuisines do you like?"
        />
      </h4>
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
          loadingCuisines ? (
            <FormattedMessage
              id="loadingData"
              defaultMessage="Loading data..."
            />
          ) : (
            <FormattedMessage
              id="searchForMoreCuisines"
              defaultMessage="Search for more cuisines..."
            />
          )
        }
      />

      <h4 className="mt-3">
        <FormattedMessage
          id="whichTasteOfDessertsDoYouPrefer"
          defaultMessage="Which taste of desserts do you prefer?"
        />
      </h4>
      <div className="width-fit-content text-start mx-auto">
        <Form.Check
          type="radio"
          label={<FormattedMessage id="savory" defaultMessage="Savory" />}
          checked={false}
          onChange={() => {
            handleDessertCheckboxOnChange(
              'http://www.wikidata.org/entity/Q3324978',
            )
          }}
        />

        <Form.Check
          type="radio"
          label={<FormattedMessage id="sweet" defaultMessage="Sweet" />}
          checked={false}
          onChange={() => {
            handleDessertCheckboxOnChange(
              'http://dbpedia.org/resource/Sweetness',
            )
          }}
        />

        <Form.Check
          type="radio"
          label={
            <FormattedMessage
              id="doesNotMatter"
              defaultMessage="Doesn't matter"
            />
          }
        />
      </div>

      <h4 className="mt-3">
        <FormattedMessage
          id="doYouLikeSpicyFood"
          defaultMessage="Do you like spicy food?"
        />
      </h4>

      <Form.Switch
        label={
          userLikesSpicyFood ? (
            <FormattedMessage id="yes" defaultMessage="Yes" />
          ) : (
            <FormattedMessage id="no" defaultMessage="No" />
          )
        }
        className="width-fit-content mx-auto"
        onClick={() => setUserLikesSpicyFood(!userLikesSpicyFood)}
      />

      {userLikesSpicyFood && (
        <>
          <span>
            <FormattedMessage
              id="howSpicyShouldItBe"
              defaultMessage="How spicy should it be?"
            />
          </span>
          <div className="width-fit-content mx-auto text-start">
            <Form.Check
              type="radio"
              label={<FormattedMessage id="mild" defaultMessage="Mild" />}
              checked={true}
            />
            <Form.Check
              type="radio"
              label={<FormattedMessage id="medium" defaultMessage="Medium" />}
              checked={false}
            />
            <Form.Check
              type="radio"
              label={<FormattedMessage id="hot" defaultMessage="Hot" />}
              checked={false}
            />
          </div>
        </>
      )}
    </>
  )
}

export default SelectTastePreferences
