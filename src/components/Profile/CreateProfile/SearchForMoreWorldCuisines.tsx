import { useEffect, useState } from 'react'
import Select, { createFilter } from 'react-select'
import CustomSelectMenu from './CustomSelectMenu'
import selectSearchOptionType from './selectSearchOptionType'
import { loadDietsFromDBPedia } from './loadProfileCreationData'
import { FormattedMessage } from 'react-intl'

const SelectComponents = {
  DropdownIndicator: () => null,
  IndicatorSeparator: () => null,
  Menu: CustomSelectMenu,
}

type Props = {}

const SearchForMoreWorldCuisines: React.FC<Props> = ({}) => {
  return (
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
          <FormattedMessage id="loadingData" defaultMessage="Loading data..." />
        ) : (
          <FormattedMessage
            id="searchForMoreCuisines"
            defaultMessage="Search for more cuisines..."
          />
        )
      }
    />
  )
}

export default SearchForMoreWorldCuisines
