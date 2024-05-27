import { useEffect, useState } from 'react'
import Select, { createFilter } from 'react-select'
import CustomSelectMenu from './CustomSelectMenu'
import selectSearchOptionType from './selectSearchOptionType'
import { loadWorldCuisineSearchOptions } from './loadProfileCreationData'
import { FormattedMessage } from 'react-intl'

const SelectComponents = {
  DropdownIndicator: () => null,
  IndicatorSeparator: () => null,
  Menu: CustomSelectMenu,
}

type Props = {
  selectedWorldCuisinesViaSearch: ReadonlyArray<selectSearchOptionType>
  setSelectedWorldCuisinesViaSearch: React.Dispatch<
    React.SetStateAction<ReadonlyArray<selectSearchOptionType>>
  >
}

const SearchForMoreWorldCuisines: React.FC<Props> = ({
  selectedWorldCuisinesViaSearch,
  setSelectedWorldCuisinesViaSearch,
}) => {
  // Array of world cuisine options to show in a Select component.
  const [searchWorldCuisineOptions, setSearchWorldCuisineOptions] = useState<
    ReadonlyArray<selectSearchOptionType>
  >([])

  const [loadingWorldCuisineOptions, setLoadingWorldCuisineOptions] =
    useState(false)

  useEffect(() => {
    setLoadingWorldCuisineOptions(true)

    loadWorldCuisineSearchOptions()
      .then((cuisineOptions) => {
        setSearchWorldCuisineOptions(cuisineOptions)

        setLoadingWorldCuisineOptions(false)
      })
      .catch((error) => {
        alert(
          'Could not load world cuisines data. For more information check the developer console.',
        )
        console.error(error)
      })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <Select
      className="mt-3 w-75 mx-auto"
      isMulti
      components={SelectComponents}
      options={searchWorldCuisineOptions}
      value={selectedWorldCuisinesViaSearch}
      filterOption={createFilter({
        matchFrom: 'start',
        stringify: (option) => `${option.label}`,
      })}
      onChange={setSelectedWorldCuisinesViaSearch}
      isDisabled={loadingWorldCuisineOptions ? true : false}
      isLoading={loadingWorldCuisineOptions ? true : false}
      placeholder={
        loadingWorldCuisineOptions ? (
          <FormattedMessage id="loadingData" defaultMessage="Loading data..." />
        ) : (
          <FormattedMessage
            id="searchForMoreWorldCuisines"
            defaultMessage="Search for more world cuisines..."
          />
        )
      }
    />
  )
}

export default SearchForMoreWorldCuisines
