import { useContext, useState } from 'react'
import selectSearchOptionType from './selectSearchOptionType'
import Form from 'react-bootstrap/Form'
import Stack from 'react-bootstrap/Stack'
import './SelectTastePreferences.css'
import { FormattedMessage } from 'react-intl'
import LanguageContext from '../../../LanguageContext'
import SearchForMoreWorldCuisines from './SearchForMoreWorldCuisines'

type WorldCuisine = {
  iri: string
  label: string
}

const popularWorldCuisinesEn: WorldCuisine[] = [
  { iri: 'iri1', label: 'French' },
  { iri: 'iri2', label: 'Indian' },
  { iri: '', label: 'Japanese' },
  { iri: '', label: 'Mexican' },
  { iri: '', label: 'Italian' },
  { iri: '', label: 'Thai' },
  { iri: '', label: 'Chinese' },
  { iri: '', label: 'Greek' },
  { iri: '', label: 'Turkish' },
  { iri: '', label: 'American' },
]

type Props = {
  selectedWorldCuisinesViaCheckboxes: string[]
  setSelectedWorldCuisinesViaCheckboxes: React.Dispatch<
    React.SetStateAction<string[]>
  >
  selectedWorldCuisinesViaSearch: ReadonlyArray<selectSearchOptionType>
  setSelectedWorldCuisinesViaSearch: React.Dispatch<
    React.SetStateAction<ReadonlyArray<selectSearchOptionType>>
  >
}

const SelectTastePreferences: React.FC<Props> = ({
  selectedWorldCuisinesViaCheckboxes,
  setSelectedWorldCuisinesViaCheckboxes,
  selectedWorldCuisinesViaSearch,
  setSelectedWorldCuisinesViaSearch,
}) => {
  const { selectedLanguage } = useContext(LanguageContext)

  const [userLikesSpicyFood, setUserLikesSpicyFood] = useState(false)

  // Adds or removes a WorldCuisine IRI from the array of selected world cuisines via checkboxes.
  function handleWorldCuisineCheckboxOnChange(cuisine: WorldCuisine) {
    let newSelectedWorldCuisines = Array.from(
      selectedWorldCuisinesViaCheckboxes,
    )

    if (newSelectedWorldCuisines.includes(cuisine.iri)) {
      newSelectedWorldCuisines = newSelectedWorldCuisines.filter(
        (iri) => iri !== cuisine.iri,
      )
    } else {
      newSelectedWorldCuisines.push(cuisine.iri)
    }

    setSelectedWorldCuisinesViaCheckboxes(newSelectedWorldCuisines)
  }

  function handleDessertCheckboxOnChange(dessertValueIRI: string) {}

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
        {popularWorldCuisinesEn.map((cuisine) => {
          return (
            <Stack direction="horizontal" gap={3}>
              <Form.Check
                type="checkbox"
                checked={selectedWorldCuisinesViaCheckboxes.includes(
                  cuisine.iri,
                )}
                onChange={() => {
                  handleWorldCuisineCheckboxOnChange(cuisine)
                }}
                label={cuisine.label}
                className="w-100"
              />
              <img
                src="images/info_icon.svg"
                alt="information icon"
                className="onHoverPointer"
              />
            </Stack>
          )
        })}
      </div>

      {selectedLanguage === 'en' && (
        <>
          <SearchForMoreWorldCuisines
            selectedWorldCuisinesViaSearch={selectedWorldCuisinesViaSearch}
            setSelectedWorldCuisinesViaSearch={
              setSelectedWorldCuisinesViaSearch
            }
          />
        </>
      )}

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
