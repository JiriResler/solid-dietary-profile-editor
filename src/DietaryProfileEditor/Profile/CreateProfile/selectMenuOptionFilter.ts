import selectSearchOptionType from './selectSearchOptionType'

const selectMenuOptionFilter = (
  option: selectSearchOptionType,
  searchText: string,
) => {
  if (option.label.toLowerCase().startsWith(searchText.toLowerCase())) {
    return true
  }

  return false
}

export default selectMenuOptionFilter
