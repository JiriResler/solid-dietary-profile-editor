import { useEffect, useState } from 'react'
import Select, { createFilter } from 'react-select'
import CustomSelectMenu from './CustomSelectMenu'
import selectSearchOptionType from './selectSearchOptionType'
import { loadDietSearchOptions } from './loadProfileCreationData'
import { FormattedMessage } from 'react-intl'

const SelectComponents = {
  DropdownIndicator: () => null,
  IndicatorSeparator: () => null,
  Menu: CustomSelectMenu,
}

type Props = {
  selectedDietOptions: ReadonlyArray<selectSearchOptionType>
  setSelectedDietOptions: React.Dispatch<
    React.SetStateAction<ReadonlyArray<selectSearchOptionType>>
  >
}

const SearchForMoreDiets: React.FC<Props> = ({
  selectedDietOptions,
  setSelectedDietOptions,
}) => {
  // List of diet options to show in a Select component.
  const [searchDietOptions, setSearchDietOptions] = useState<
    ReadonlyArray<selectSearchOptionType>
  >([])

  const [loadingDietOptions, setLoadingDietOptions] = useState(false)

  useEffect(() => {
    setLoadingDietOptions(true)

    loadDietSearchOptions()
      .then((dietOptions) => {
        setSearchDietOptions(dietOptions)

        setLoadingDietOptions(false)
      })
      .catch((error) => {
        alert(
          'Could not load diet data. For more information check the developer console.',
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
      options={searchDietOptions}
      value={selectedDietOptions}
      filterOption={createFilter({
        matchFrom: 'start',
        stringify: (option) => `${option.label}`,
      })}
      onChange={setSelectedDietOptions}
      isDisabled={loadingDietOptions ? true : false}
      isLoading={loadingDietOptions ? true : false}
      placeholder={
        loadingDietOptions ? (
          <FormattedMessage id="loadingData" defaultMessage="Loading data..." />
        ) : (
          <FormattedMessage
            id="searchForMoreDiets"
            defaultMessage="Search for more diets..."
          />
        )
      }
    />
  )
}

export default SearchForMoreDiets
